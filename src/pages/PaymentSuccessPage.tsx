import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { getBookingData, generateQRCode, downloadTicket, type BookingData, type TicketData } from '../utils/ticketService';

const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState({
    paymentId: '',
    bookingId: '',
    status: '',
    isLoading: true
  });
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const bookingId = searchParams.get('booking_id');
    const status = searchParams.get('status');
    
    setPaymentDetails({
      paymentId: paymentId || '',
      bookingId: bookingId || '',
      status: status || '',
      isLoading: false
    });

    // Get booking data and generate ticket
    if (bookingId && status === 'paid') {
      const booking = getBookingData(bookingId);
      if (booking) {
        setBookingData(booking);
        
        // Generate QR code
        generateQRCode(booking).then(qrCode => {
          setQrCodeDataURL(qrCode);
          
          // Prepare ticket data
          const ticket: TicketData = {
            ...booking,
            qrCodeDataURL: qrCode,
            trekDate: '15-16 December 2024', // You can make this dynamic
            reportingTime: '06:00 AM',
            reportingLocation: 'Dehradun Railway Station'
          };
          setTicketData(ticket);
        }).catch(error => {
          console.error('Error generating QR code:', error);
        });
      }
    }

    // Send confirmation to WhatsApp automatically
    if (paymentId && bookingId && status === 'paid') {
      setTimeout(() => {
        const message = `🎉 Payment Successful!
        
Booking ID: ${bookingId}
Payment ID: ${paymentId}
Trek: Nag Tibba Trek
Amount: Paid successfully via Razorpay

Thank you for booking with Rapidophilia! Your ticket is ready for download.`;
        
        const whatsappUrl = `https://wa.me/919911192050?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }, 3000);
    }
  }, [searchParams]);

  const handleDownloadTicket = () => {
    if (ticketData) {
      downloadTicket(ticketData);
    }
  };

  if (paymentDetails.isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing payment...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const isSuccess = paymentDetails.status === 'paid';

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          {isSuccess ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">🎉 Booking Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Your trek booking is confirmed! Your ticket is ready for download.
              </p>
              
              {/* Booking Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Booking ID:</span>
                    <span className="font-mono text-sm font-bold text-purple-600">
                      {paymentDetails.bookingId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payment ID:</span>
                    <span className="font-mono text-sm text-gray-900">
                      {paymentDetails.paymentId}
                    </span>
                  </div>
                  {bookingData && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Trek:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {bookingData.trekTitle}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Participants:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {bookingData.participants}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Amount Paid:</span>
                        <span className="text-sm font-bold text-green-600">
                          ₹{bookingData.amount.toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* QR Code Display */}
              {qrCodeDataURL && (
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-3 text-center">Your Ticket QR Code</p>
                  <img 
                    src={qrCodeDataURL} 
                    alt="Ticket QR Code" 
                    className="w-32 h-32 mx-auto rounded-lg"
                  />
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Show this QR code at the reporting location
                  </p>
                </div>
              )}
              
              <div className="space-y-3">
                {/* Download Ticket Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadTicket}
                  disabled={!ticketData}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Your Ticket</span>
                </motion.button>

                {/* WhatsApp Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const message = `🎉 Booking Confirmed!
                    
Booking ID: ${paymentDetails.bookingId}
Payment ID: ${paymentDetails.paymentId}
Trek: ${bookingData?.trekTitle || 'Nag Tibba Trek'}
Amount: ₹${bookingData?.amount.toLocaleString() || 'Paid'}

Thank you for booking with Rapidophilia! Ticket downloaded successfully.`;
                    
                    const whatsappUrl = `https://wa.me/919911192050?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Share on WhatsApp</span>
                </motion.button>
                
                <Link
                  to="/"
                  className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors text-center"
                >
                  Back to Home
                </Link>
              </div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Failed</h1>
              <p className="text-gray-600 mb-6">
                Something went wrong with your payment. Please try again or contact support.
              </p>
              
              <div className="space-y-3">
                <Link
                  to="/trek/2"
                  className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors text-center"
                >
                  Try Again
                </Link>
                
                <button
                  onClick={() => {
                    const whatsappUrl = `https://wa.me/919911192050?text=${encodeURIComponent('Hi, I had an issue with my payment. Please help me complete my booking.')}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default PaymentSuccessPage;