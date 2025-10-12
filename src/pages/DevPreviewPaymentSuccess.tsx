import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateBookingId, storeBookingData } from '../utils/ticketService';

const DevPreviewPaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // seed a realistic booking example into localStorage
    const bookingId = generateBookingId();
    const booking = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@example.com',
      phone: '9999999999',
      participants: 2,
      paymentId: 'PAY_' + bookingId,
      amount: 3998,
      trekTitle: 'Nag Tibba',
      bookingId,
      bookingDate: new Date().toLocaleDateString()
    } as any;

    // store booking and redirect to payment-success with query params
    storeBookingData(booking);

    const params = new URLSearchParams({ payment_id: booking.paymentId, booking_id: booking.bookingId, status: 'paid' });
    // small delay so developer can see the seed action
    setTimeout(() => {
      navigate(`/payment-success?${params.toString()}`);
    }, 300);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Dev Preview: Payment Success</h2>
        <p className="text-sm text-gray-600">Seeding a sample booking and redirecting to the payment confirmation page…</p>
      </div>
    </div>
  );
};

export default DevPreviewPaymentSuccess;
