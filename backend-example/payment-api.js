// Backend API Example (Node.js/Express)
// File: backend/routes/payment.js

const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

// Initialize Razorpay with your LIVE credentials
const razorpay = new Razorpay({
  key_id: 'rzp_live_RQWfb8IcSghaeQ',
  key_secret: '8SnAQjekMFwOXusvTcWlth2z',
});

// IMPORTANT: In production, use environment variables:
// key_id: process.env.RAZORPAY_KEY_ID,
// key_secret: process.env.RAZORPAY_KEY_SECRET,

// Create Payment Link
router.post('/create-payment-link', async (req, res) => {
  try {
    const {
      amount,
      currency = 'INR',
      description,
      customer,
      notify,
      reminder_enable,
      callback_url,
      callback_method = 'get'
    } = req.body;

    const options = {
      amount: amount, // amount in paise
      currency,
      accept_partial: false,
      expire_by: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours from now
      reference_id: `trek_booking_${Date.now()}`,
      description,
      customer,
      notify,
      reminder_enable,
      notes: {
        booking_type: 'trek',
        source: 'website'
      },
      callback_url,
      callback_method
    };

    const paymentLink = await razorpay.paymentLink.create(options);
    
    res.json({
      id: paymentLink.id,
      short_url: paymentLink.short_url,
      status: paymentLink.status
    });
  } catch (error) {
    console.error('Error creating payment link:', error);
    res.status(500).json({ error: 'Failed to create payment link' });
  }
});

// Handle Payment Success Callback
router.get('/payment-success', (req, res) => {
  // only pull the fields we use to avoid unused-variable warnings
  const { razorpay_payment_id, razorpay_payment_link_status } = req.query;
  
  // Verify the payment signature here if needed
  
  // Redirect to success page with payment details
  const successUrl = `${process.env.FRONTEND_URL}/payment-success?payment_id=${razorpay_payment_id}&status=${razorpay_payment_link_status}`;
  res.redirect(successUrl);
});

module.exports = router;

// Usage in your main app file:
// const paymentRoutes = require('./routes/payment');
// app.use('/api', paymentRoutes);