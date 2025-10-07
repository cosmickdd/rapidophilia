# Razorpay Integration Guide

## Overview
This guide helps you integrate Razorpay payment gateway into your Trek booking system. We've implemented both Payment Links and direct API integration options.

## 🚀 Quick Setup (Recommended for MVP)

### Step 1: Create Razorpay Account
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up and complete KYC verification
3. Get your API keys from Settings > API Keys

### Step 2: Simple Payment Links (No Backend Required)
1. Go to Razorpay Dashboard > Payment Links
2. Create payment links for common amounts:
   - Single person: ₹3,499
   - Two people: ₹6,998
   - Three people: ₹10,497

3. Update the `getRazorpayLink()` function in TrekDetailPage.tsx with your actual links:

```javascript
const getRazorpayLink = () => {
  const links = {
    3499: 'https://rzp.io/l/your-single-person-link',
    6998: 'https://rzp.io/l/your-double-person-link', 
    10497: 'https://rzp.io/l/your-triple-person-link'
  };
  
  return links[totalAmount] || `https://rzp.io/l/your-default-link`;
};
```

## 🔧 Advanced Setup (Dynamic Payment Links)

### Step 1: Backend Setup
1. Install dependencies:
```bash
npm install razorpay express cors dotenv
```

2. Create environment variables (.env):
```
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
FRONTEND_URL=http://localhost:3000
```

3. Use the provided backend code in `backend-example/payment-api.js`

### Step 2: Frontend Integration
1. Update the Razorpay service with your backend URL:
```javascript
// In razorpayService.ts
const response = await fetch('YOUR_BACKEND_URL/api/create-payment-link', {
  // ... rest of the code
});
```

## 📱 Features Implemented

### 1. **Payment Modal Enhancement**
- ✅ Razorpay payment button added
- ✅ Maintains existing UPI/Bank transfer options
- ✅ Professional UI with Razorpay branding

### 2. **Payment Success Page**
- ✅ Automatic payment confirmation
- ✅ WhatsApp integration for support
- ✅ Payment ID display
- ✅ Professional success/failure handling

### 3. **Smooth User Experience**
- ✅ All Book Now buttons scroll to booking form
- ✅ One-click payment process
- ✅ Automatic WhatsApp notification after payment

## 🔄 Payment Flow

1. **User clicks "Book Now"** → Scrolls to booking form
2. **User fills form** → Clicks "Book Now - ₹X,XXX"
3. **Payment modal opens** → User can choose Razorpay or UPI
4. **Razorpay payment** → User completes payment on Razorpay
5. **Success redirect** → User lands on success page
6. **Automatic WhatsApp** → Payment proof sent to business

## 🎯 Benefits of This Implementation

### For You (Business):
- **Automatic payment confirmation**
- **Reduced manual verification**
- **Professional payment experience**
- **Better conversion rates**
- **Automatic customer data collection**

### For Customers:
- **Multiple payment options** (UPI, Cards, Net Banking)
- **Instant payment confirmation**
- **Secure payment processing**
- **Smooth booking experience**
- **Automatic receipt generation**

## 📊 Next Steps

### Immediate (No Backend):
1. Create Razorpay account
2. Generate payment links
3. Update the payment link URLs
4. Test the flow

### Future Enhancements:
1. Set up backend for dynamic links
2. Add payment analytics
3. Implement automatic email confirmations
4. Add refund processing
5. Integrate with booking management system

## 🛟 Support & Testing

### Test Mode:
- Use Razorpay test API keys for development
- Test payments don't charge real money
- Switch to live keys for production

### Contact:
- Razorpay Support: [support.razorpay.com](https://support.razorpay.com)
- Documentation: [razorpay.com/docs](https://razorpay.com/docs)

## 🔐 Security Notes

1. **Never expose** your key_secret on frontend
2. **Always validate** payments on your backend
3. **Use HTTPS** in production
4. **Verify webhook signatures** for automatic confirmations

## 💡 Recommended Approach

**Start with Payment Links** (Step 2 Quick Setup) for immediate implementation, then upgrade to dynamic API when you're ready to scale.

This gives you:
- ✅ Immediate payment processing
- ✅ Professional user experience  
- ✅ Minimal technical complexity
- ✅ Easy to upgrade later