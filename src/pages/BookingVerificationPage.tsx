import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { getBookingData } from '../utils/ticketService';

const BookingVerificationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const bookingData = bookingId ? getBookingData(bookingId) : null;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          {bookingData ? (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">✅ Booking Verified</h1>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Booking ID:</span>
                    <span className="font-mono text-sm font-bold text-purple-600">
                      {bookingData.bookingId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="text-sm font-medium">
                      {bookingData.firstName} {bookingData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Trek:</span>
                    <span className="text-sm font-medium">
                      {bookingData.trekTitle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Participants:</span>
                    <span className="text-sm font-medium">
                      {bookingData.participants}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payment ID:</span>
                    <span className="font-mono text-xs text-gray-700">
                      {bookingData.paymentId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Booking Date:</span>
                    <span className="text-sm text-gray-700">
                      {bookingData.bookingDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  This booking is valid and confirmed. Welcome to the trek!
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">❌ Booking Not Found</h1>
              <p className="text-gray-600 mb-6">
                Sorry, we couldn't find a booking with ID: <strong>{bookingId}</strong>
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  Please check your booking ID or contact support for assistance.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingVerificationPage;