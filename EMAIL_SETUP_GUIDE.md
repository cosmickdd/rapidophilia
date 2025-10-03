# Email Setup Guide for Trek Booking System

## Overview
The booking form now supports three different email services (you only need to configure one):

1. **EmailJS** - Recommended (Free tier: 200 emails/month)
2. **Web3Forms** - Backup option (Free tier: 1000 emails/month) 
3. **Formspree** - Alternative backup (Free tier: 50 emails/month)

## Method 1: EmailJS Setup (Recommended)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the connection steps for your email provider
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Trek Booking Request - {{trek_name}}

Hello,

You have received a new trek booking request:

Customer Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}

Booking Details:
- Trek: {{trek_name}}
- Participants: {{participants}} people
- Total Price: ₹{{total_price}}
- Booking Date: {{booking_date}} at {{booking_time}}

Additional Message:
{{message}}

Please contact the customer to confirm their booking.

Best regards,
Rapidophilia Booking System
```

4. Note down your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update Configuration
Edit `src/utils/emailService.ts` and replace:

```typescript
const EMAILJS_SERVICE_ID = 'service_46hrck5'; // ✅ Already set!
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';  // Replace with your template ID
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';    // Replace with your public key
```

And update the business email:
```typescript
to_email: 'rapidophiliatravel@gmail.com', // Your business email
```

## Method 2: Web3Forms Setup (Backup)

### Step 1: Create Web3Forms Account
1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Sign up for a free account
3. Create a new form
4. Note down your **Access Key**

### Step 2: Update Configuration
Edit `src/utils/emailService.ts` and replace:

```typescript
const WEB3FORMS_ACCESS_KEY = 'your_access_key_here';
```

## Method 3: Formspree Setup (Alternative)

### Step 1: Create Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Create a new form
4. Note down your **Form ID**

### Step 2: Update Configuration
Edit `src/utils/emailService.ts` and replace:

```typescript
const response = await fetch('https://formspree.io/f/your_form_id_here', {
```

## Testing the Setup

1. **Build and run your app**:
   ```bash
   npm run build
   npm start
   ```

2. **Navigate to any trek detail page**
3. **Click on "Book Now" tab**
4. **Fill out the booking form**
5. **Submit the form**

You should see:
- Loading spinner while sending
- Success message if email sent successfully
- Error message if something went wrong

## Troubleshooting

### EmailJS Issues:
- Check that your service is properly connected
- Verify template variables match exactly
- Ensure your email provider allows EmailJS access

### Web3Forms Issues:
- Verify your access key is correct
- Check that your account is verified

### General Issues:
- Check browser console for error messages
- Ensure internet connection is stable
- Try different email services if one fails

## Email Content
The booking emails will include:
- Customer name, email, phone
- Selected trek details
- Number of participants
- Total price calculation
- Booking timestamp
- Any additional customer message

## Security Notes
- All email services use HTTPS encryption
- No sensitive data is stored locally
- Email APIs are rate-limited to prevent abuse
- Form validates required fields before submission

## Free Tier Limits
- **EmailJS**: 200 emails/month
- **Web3Forms**: 1000 emails/month  
- **Formspree**: 50 emails/month

Choose the service that best fits your expected booking volume.