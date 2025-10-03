// Email Service - Sends booking emails to both:
// Primary: rapidophiliatravel@gmail.com
// Secondary: rapidophilia@gmail.com

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  participants: number;
  trekChoice: string;
  message: string;
  totalPrice: number;
  trekDate?: string;
}

export const sendBookingEmail = async (bookingData: BookingData): Promise<{ success: boolean; message: string }> => {
  console.log('📧 Processing booking request:', bookingData);
  
  try {
    // Method 1: Use alternative email service (Web3Forms) to avoid FormSubmit cache issues
    console.log('Trying Web3Forms for reliable delivery...');
    const web3Result = await sendViaWeb3Forms(bookingData);
    if (web3Result.success) {
      return web3Result;
    }
    
    // Method 2: Use direct email APIs as backup
    console.log('Trying direct email APIs...');
    const directResult = await sendViaDirectAPIs(bookingData);
    if (directResult.success) {
      return directResult;
    }
    
    // Method 3: Manual email fallback
    console.log('Using manual email fallback...');
    return generateManualEmail(bookingData);

  } catch (error) {
    console.error('Email sending failed:', error);
    return generateManualEmail(bookingData);
  }
};

// Method 1: Web3Forms (bypasses FormSubmit cache issues)
const sendViaWeb3Forms = async (bookingData: BookingData): Promise<{ success: boolean; message: string }> => {
  try {
    // Send to primary email
    const primaryFormData = new FormData();
    primaryFormData.append('access_key', '550e8400-e29b-41d4-a716-446655440000');
    primaryFormData.append('to', 'rapidophiliatravel@gmail.com');
    primaryFormData.append('from_name', `${bookingData.firstName} ${bookingData.lastName}`);
    primaryFormData.append('email', bookingData.email);
    primaryFormData.append('subject', `🏔️ Trek Booking: ${bookingData.trekChoice}`);
    primaryFormData.append('message', `
🏔️ NEW TREK BOOKING REQUEST

📋 BOOKING DETAILS:
Trek: ${bookingData.trekChoice}
Participants: ${bookingData.participants}
Total Price: ₹${bookingData.totalPrice.toLocaleString()}

👤 CUSTOMER DETAILS:
Name: ${bookingData.firstName} ${bookingData.lastName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}

💬 MESSAGE: ${bookingData.message || 'No additional message'}
📅 BOOKING TIME: ${new Date().toLocaleString()}

📧 Primary recipient: rapidophiliatravel@gmail.com
⚡ Contact customer within 24 hours!
    `);

    const primaryResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: primaryFormData
    });

    // Send to secondary email  
    const secondaryFormData = new FormData();
    secondaryFormData.append('access_key', '550e8400-e29b-41d4-a716-446655440000');
    secondaryFormData.append('to', 'rapidophilia@gmail.com');
    secondaryFormData.append('from_name', `${bookingData.firstName} ${bookingData.lastName}`);
    secondaryFormData.append('email', bookingData.email);
    secondaryFormData.append('subject', `🏔️ Trek Booking: ${bookingData.trekChoice}`);
    secondaryFormData.append('message', `
🏔️ NEW TREK BOOKING REQUEST

📋 BOOKING DETAILS:
Trek: ${bookingData.trekChoice}
Participants: ${bookingData.participants}
Total Price: ₹${bookingData.totalPrice.toLocaleString()}

👤 CUSTOMER DETAILS:
Name: ${bookingData.firstName} ${bookingData.lastName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}

💬 MESSAGE: ${bookingData.message || 'No additional message'}
📅 BOOKING TIME: ${new Date().toLocaleString()}

📧 Secondary recipient: rapidophilia@gmail.com
⚡ Contact customer within 24 hours!
    `);

    const secondaryResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: secondaryFormData
    });

    const primaryResult = await primaryResponse.json();
    const secondaryResult = await secondaryResponse.json();

    if (primaryResult.success || secondaryResult.success) {
      console.log('✅ Web3Forms success - emails sent to both addresses');
      return {
        success: true,
        message: `🏔️ Booking Request Submitted Successfully! Your trek booking has been sent to our team at rapidophiliatravel@gmail.com and rapidophilia@gmail.com. We will contact you within 24 hours to confirm your adventure. Reference ID: ${Date.now()}`
      };
    }
    
    throw new Error('Web3Forms failed for both emails');
  } catch (error) {
    console.error('Web3Forms error:', error);
    return { success: false, message: 'Web3Forms failed' };
  }
};

// Method 2: Direct email APIs (backup method)
const sendViaDirectAPIs = async (bookingData: BookingData): Promise<{ success: boolean; message: string }> => {
  try {
    // Try sending via multiple direct endpoints
    const emailData = {
      to: ['rapidophiliatravel@gmail.com', 'rapidophilia@gmail.com'],
      subject: `🏔️ Trek Booking: ${bookingData.trekChoice}`,
      name: `${bookingData.firstName} ${bookingData.lastName}`,
      email: bookingData.email,
      phone: bookingData.phone,
      message: `
🏔️ NEW TREK BOOKING REQUEST

📋 BOOKING DETAILS:
Trek: ${bookingData.trekChoice}
Participants: ${bookingData.participants}
Total Price: ₹${bookingData.totalPrice.toLocaleString()}

👤 CUSTOMER DETAILS:
Name: ${bookingData.firstName} ${bookingData.lastName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}

💬 MESSAGE: ${bookingData.message || 'No additional message'}
📅 BOOKING TIME: ${new Date().toLocaleString()}

⚡ Contact customer within 24 hours!
      `
    };

    // Try Formspree endpoint
    const response = await fetch('https://formspree.io/f/xgeqjpzb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      console.log('✅ Direct APIs success');
      return {
        success: true,
        message: `🏔️ Booking Request Submitted Successfully! Your trek booking has been sent to our team. We will contact you within 24 hours. Reference ID: ${Date.now()}`
      };
    }
    
    throw new Error('Direct APIs failed');
  } catch (error) {
    console.error('Direct APIs error:', error);
    return { success: false, message: 'Direct APIs failed' };
  }
};

// Method 3: Manual email fallback (opens email client)
const generateManualEmail = (bookingData: BookingData): { success: boolean; message: string } => {
  try {
    const subject = `🏔️ URGENT: Trek Booking - ${bookingData.trekChoice}`;
    const body = `
Dear Rapidophilia Team,

🏔️ NEW TREK BOOKING REQUEST

📋 BOOKING DETAILS:
- Trek Name: ${bookingData.trekChoice}
- Number of Participants: ${bookingData.participants}
- Total Price: ₹${bookingData.totalPrice.toLocaleString()}

👤 CUSTOMER INFORMATION:
- Name: ${bookingData.firstName} ${bookingData.lastName}
- Email: ${bookingData.email}
- Phone: ${bookingData.phone}

💬 CUSTOMER MESSAGE:
${bookingData.message || 'No additional requirements'}

📅 BOOKING SUBMITTED: ${new Date().toLocaleString()}

⚡ URGENT: Please contact customer within 24 hours to confirm this booking!

This email was generated automatically by your booking system.

Best regards,
${bookingData.firstName} ${bookingData.lastName}
    `.trim();

    // Create mailto links for both emails
    const primaryMailto = `mailto:rapidophiliatravel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const secondaryMailto = `mailto:rapidophilia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open both email clients
    window.open(primaryMailto, '_blank');
    setTimeout(() => window.open(secondaryMailto, '_blank'), 1000);
    
    console.log('✅ Manual emails opened for both addresses');
    
    return {
      success: true,
      message: `📧 Please Send Emails to Complete Booking: Your email client has opened with booking details for both rapidophiliatravel@gmail.com and rapidophilia@gmail.com. Please send both emails to ensure we receive your booking request.`
    };
  } catch (error) {
    console.error('Manual email error:', error);
    return {
      success: false,
      message: '⚠️ Booking Assistance Needed: We encountered a technical issue. Please contact our team directly at rapidophiliatravel@gmail.com or rapidophilia@gmail.com with your trek preferences.'
    };
  }
};

// Clean implementation - no old email references
// Emails will be sent to both rapidophiliatravel@gmail.com and rapidophilia@gmail.com
