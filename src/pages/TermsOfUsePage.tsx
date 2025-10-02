import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Section from '../components/common/Section';

const TermsOfUsePage: React.FC = () => {
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
            Terms and Conditions
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

      {/* Terms Content */}
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">The Website</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  This website and its owners take a proactive approach to user privacy and ensure the necessary steps are taken to protect the privacy of its users throughout their visiting experience. This website complies to all India's national laws and requirements for user privacy.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-8 rounded-2xl text-white">
                <h2 className="text-3xl font-bold mb-6">Service Provider Relationship</h2>
                <div className="space-y-4 text-lg">
                  <p className="leading-relaxed">
                    Rapidophilia generally acts as an aggregator or facilitator; actual Services are provided by independent Suppliers/vendors (hotels, airlines, local tour operators, etc.). Hence, Rapidophilia is not responsible for any misconduct/misbehave done by any supplier/vendor or service provider, however, you can still report the issue to us and we will try to resolve the issue to the possible extent.
                  </p>
                  <p className="leading-relaxed">
                    Rapidophilia is also not responsible if any mishappen occurs with you during trek or any other adventurous activity.
                  </p>
                  <p className="leading-relaxed">
                    Your contract for the underlying Service is directly with the Supplier, though these T&C also govern how you interact with Rapidophilia and use its Platform.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">Terms Modification</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  We may revise these Terms of Use, Privacy or Refund policy for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Use.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Please read these terms and conditions as well as Privacy and Cancellation/Refund Policies carefully given in this website.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">Links</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  We have not reviewed all of the sites linked to its website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Rapidophilia. Use of any such linked website is at the user's own risk.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-8 rounded-2xl text-white">
                <h2 className="text-3xl font-bold mb-6">Governing Law</h2>
                <p className="leading-relaxed text-lg">
                  These Terms, the rights and remedies provided hereunder, and any and all claims and disputes related hereto and/or to the services, shall be governed by, construed under, and enforced in all respects solely and exclusively in accordance with the internal substantive laws of the Republic of India, without respect to its conflict of laws principles. Any and all such claims and disputes shall be brought in, and you hereby consent to them being decided exclusively by a court of competent jurisdiction located in Gurugram (Haryana).
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </Section>
    </Layout>
  );
};

export default TermsOfUsePage;