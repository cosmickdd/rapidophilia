import React from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import CONTACT from '../config/contact';

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-start justify-center py-16 px-4">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>

          <p className="text-sm text-gray-700 mb-4">Please read these terms and conditions carefully before booking any trek with us. By checking the Terms & Conditions checkbox and proceeding with a booking, you agree to be bound by these terms.</p>

          <section className="mb-4">
            <h2 className="font-semibold mb-2">1. Booking and Payments</h2>
            <p className="text-sm text-gray-700">All bookings require accurate traveler information. A booking confirmation will be sent after successful payment. Prices displayed are per person unless otherwise stated.</p>
          </section>

          <section className="mb-4">
            <h2 className="font-semibold mb-2">2. Cancellations & Refunds</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h3 className="font-medium">Cancellation by User</h3>
                <p>If you fail to complete required payments by the stated due dates (after reminders), the booking may be canceled and any amount paid could be non-refundable.</p>
              </div>

              <div>
                <h3 className="font-medium">Cancellation by Rapidophilia or Supplier/Vendor</h3>
                <p>In circumstances like insufficient group size, force majeure events, or the Supplier's inability to provide the service, Rapidophilia will endeavor to inform you at least 7 days before departure (where feasible). You may opt for a full refund or accept an alternative arrangement. If the tour is canceled mid-trip for force majeure or safety reasons, refunds (if any) depend on the portion of the trip unused and the Supplier's discretion.</p>
              </div>

              <div>
                <h3 className="font-medium">Refund Process</h3>
                <p>Rapidophilia will process refunds after receiving refunded amounts from Suppliers. Refunds are typically returned to the original payment source (bank/card) unless otherwise agreed. Convenience fees, taxes, or certain non-refundable amounts may be deducted from the total refund.</p>
              </div>

              <div>
                <h3 className="font-medium">Modification Policy</h3>
                <p>If you change dates or reduce participants, the refund or additional charge will be calculated case-by-case considering group size, operational feasibility, and supplier terms. Changes may incur extra charges.</p>
              </div>

              <div>
                <h3 className="font-medium">No-Show & Partial Usage</h3>
                <p>Failure to show up at scheduled departure or check-in times may result in the booking being treated as a no-show with no refund. No refunds are given for partial usage of the package (e.g., leaving mid-trip or skipping certain included activities).</p>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 rounded text-white">
                <h3 className="font-medium">Complaints & Refund Requests Deadline</h3>
                <p className="mt-2">Any refund request (e.g., service denial, incomplete services) must be submitted with valid evidence (emails, logs, media, vendor confirmations) within 5 days of trip completion. Please write to <a href={`mailto:${CONTACT.email}`} className="underline text-purple-200">{CONTACT.email}</a>. Beyond this timeframe, requests may not be entertained.</p>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="font-semibold mb-2">3. Health & Safety</h2>
            <p className="text-sm text-gray-700">Participants should be reasonably fit. Notify us of any medical conditions. Follow the instructions of guides at all times. We reserve the right to refuse participation if safety is a concern.</p>
          </section>

          <section className="mb-4">
            <h2 className="font-semibold mb-2">4. Liability</h2>
            <p className="text-sm text-gray-700">We act as organizers and will make reasonable efforts to ensure safety. We are not liable for personal injury arising from failure to follow guide instructions or from unpredictable natural events.</p>
          </section>

          <section className="mb-6">
            <h2 className="font-semibold mb-2">5. Changes to These Terms</h2>
            <p className="text-sm text-gray-700">We may update these terms from time to time; changes will be posted on the website. Continued use of services after changes constitutes acceptance.</p>
          </section>

          <div className="text-center">
            <a href="/trek/2" aria-label="Return to trek 2">
              <Button variant="primary" size="lg">Return to Booking</Button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
