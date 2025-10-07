// Razorpay Payment Service
import { generateBookingId, storeBookingData } from './ticketService';

export interface PaymentData {
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
  orderId?: string;
  trekTitle?: string;
  participants?: number;
  message?: string;
}

export interface RazorpayResponse {
  id: string;
  short_url: string;
  status: string;
}

// Razorpay Configuration
const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_live_RQWfb8IcSghaeQ';

// Initialize Razorpay for direct checkout (if using Razorpay Checkout)
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Direct Razorpay Checkout Integration
export const initializeRazorpayPayment = (paymentData: PaymentData): Promise<any> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: paymentData.amount * 100, // Convert to paise
        currency: 'INR',
        name: 'Rapidophilia Travel Solutions',
        description: paymentData.description,
        order_id: paymentData.orderId, // Optional
        prefill: {
          name: paymentData.customerName,
          email: paymentData.customerEmail,
          contact: paymentData.customerPhone,
        },
        theme: {
          color: '#7C3AED', // Purple theme to match your brand
        },
        handler: function (response: any) {
          // Payment successful - generate booking ID and store data
          const bookingId = generateBookingId();
          const bookingData = {
            firstName: paymentData.customerName.split(' ')[0] || '',
            lastName: paymentData.customerName.split(' ').slice(1).join(' ') || '',
            email: paymentData.customerEmail,
            phone: paymentData.customerPhone,
            participants: paymentData.participants || 1,
            message: paymentData.message || '',
            paymentId: response.razorpay_payment_id,
            amount: paymentData.amount,
            trekTitle: paymentData.trekTitle || 'Nag Tibba Trek',
            bookingId: bookingId,
            bookingDate: new Date().toLocaleDateString('en-IN')
          };
          
          // Store booking data locally
          storeBookingData(bookingData);
          
          // Add booking data to response
          response.bookingData = bookingData;
          resolve(response);
        },
        modal: {
          ondismiss: function () {
            reject(new Error('Payment cancelled by user'));
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };
    script.onerror = () => {
      reject(new Error('Failed to load Razorpay'));
    };
    document.head.appendChild(script);
  });
};

// Alternative: Pre-generated payment links for fixed amounts (Recommended for quick setup)
export const getPaymentLink = (participants: number, customerData?: Partial<PaymentData>): string => {
  const amount = 3999 * participants;
  
  // Using Razorpay Payment Links - You need to create these in your Razorpay Dashboard
  const baseUrl = 'https://rzp.io/l/rapidophilia-trek';
  
  // Add customer data as URL parameters
  const params = new URLSearchParams({
    amount: amount.toString(),
    ...(customerData?.customerName && { name: customerData.customerName }),
    ...(customerData?.customerEmail && { email: customerData.customerEmail }),
    ...(customerData?.customerPhone && { contact: customerData.customerPhone }),
  });
  
  return `${baseUrl}?${params.toString()}`;
};

// For backend integration (requires your own server)
export const createPaymentLink = async (paymentData: PaymentData): Promise<string> => {
  try {
    // This should call your backend API endpoint
    const response = await fetch('/api/create-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentData.amount * 100, // Convert to paise
        currency: 'INR',
        description: paymentData.description,
        customer: {
          name: paymentData.customerName,
          email: paymentData.customerEmail,
          contact: paymentData.customerPhone,
        },
        notify: {
          sms: true,
          email: true,
        },
        reminder_enable: true,
        callback_url: `${window.location.origin}/payment-success`,
        callback_method: 'get',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment link');
    }

    const data: RazorpayResponse = await response.json();
    return data.short_url;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
};