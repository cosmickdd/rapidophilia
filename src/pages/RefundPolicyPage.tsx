import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Section from '../components/common/Section';
import CONTACT from '../config/contact';

const RefundPolicyPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <Section background="gradient" className="py-20 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl font-extrabold text-white mb-4"
          >
            Cancellation/Refund Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-purple-100"
          >
            Last updated: April 18th, 2025
          </motion.p>
        </div>
      </Section>

      {/* Policy Content */}
      <Section className="py-20 bg-gray-50 relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 space-y-10">
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">Cancellation by User</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  If You fail to complete required payments by the stated due dates (after reminders), the booking is canceled, and the amount paid will be non-refundable.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">Cancellation by Rapidophilia or Supplier/Vendor</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  In circumstances like insufficient group size, force majeure events, or the Supplier's inability to provide the service, Rapidophilia will endeavor to inform You at least 7 days before departure (where feasible). You may opt for a full refund or accept an alternative arrangement.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  If the tour is canceled mid-trip for force majeure or safety reasons, refunds (if any) depend on the portion of the trip unused and the Supplier's discretion.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">Refund Process</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  Rapidophilia will only process refunds after receiving the refunded amount from Suppliers. Refunds typically return to the original payment source (bank/card) unless otherwise agreed in writing.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Convenience fees, Taxes, or certain non-refundable amounts may be deducted from the total refund.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">Modification Policy</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  In case of a reduction in the number of participants or changing dates of your trip, the refund amount will be calculated on a case-by-case basis, considering the impact on group size, operational feasibility (e.g., car seating capacity, room type, local operator's agreement), and other factors.
                </p>
                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
                    <li>Pax addition or reduction may lead to recalculated costs, subject to availability and operational constraints.</li>
                    <li>Any changes may incur additional charges depending on the new requirements.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">No-Show & Partial Usage</h2>
                <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                  <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
                    <li>Failure to show up at scheduled departure or check-in times may result in the booking being treated as a no-show with no refund due.</li>
                    <li>No refunds for partial usage of the package (e.g., leaving mid-tour or skipping certain included activities).</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-8 rounded-2xl text-white">
                <h2 className="text-3xl font-bold mb-6">Complaints & Refund Requests Deadline</h2>
                <p className="leading-relaxed text-lg">
                  Any refund request (e.g., service denial, incomplete services) must be submitted with valid evidence (emails, logs, media, vendor confirmations) within 5 days of trip completion (write to <a href={`mailto:${CONTACT.email}`} className="text-purple-200 hover:text-white font-medium underline">{CONTACT.email}</a>). Beyond this timeframe, no requests will be entertained.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </Section>
    </Layout>
  );
};

export default RefundPolicyPage;