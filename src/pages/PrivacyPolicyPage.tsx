import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Section from '../components/common/Section';

const PrivacyPolicyPage: React.FC = () => {
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
            Privacy Policy
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  This privacy policy ("Policy") describes how Rapidophilia processes, collects, uses and shares personal data when using this website https://rapidophilia.com (the "Site"). Please read the following information carefully to understand our practices regarding your personal data and how we will process data.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Visitors and any users of the site are referred to as "user", "you" and "your" and Company is referred to as "we", "us", and "our". Accessing this Site constitutes a use of the Site and an acceptance to our Privacy Policy.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">Personal Identification Information</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  We may collect personal identification information from our users in a variety of ways, including, but not limited to, when users contact us or submit the form, subscribe to a newsletter, and in connection with other activities, services, features, or resources we make available in on this website.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Users may visit the website anonymously. We will collect personal identification information from users only if they voluntarily submit such information to us. Users can refuse to supply personal identification information but doing so may prevent them from engaging in certain booking activities.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">How We Use Collected Information</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  We may collect and use users' personal identification information for the following purposes:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <strong className="text-gray-900 text-lg">Internal record keeping or to improve customer service:</strong>
                      <p className="text-gray-700 mt-1">Information you provide helps us respond to your customer service requests and support needs more efficiently.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <strong className="text-gray-900 text-lg">To personalize user experience:</strong>
                      <p className="text-gray-700 mt-1">We may use information in the aggregate to understand how our use as a group use the services and resources provided on the website.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <strong className="text-gray-900 text-lg">To send periodic emails or any other notifications:</strong>
                      <p className="text-gray-700 mt-1">We may use users email addresses to send users information and updates pertaining to their order. User email addresses may also be used to respond to user inquiries, questions, or other requests.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-2xl text-white">
                <h2 className="text-3xl font-bold mb-6">Sharing Your Personal Information</h2>
                <p className="leading-relaxed text-lg mb-4">
                  We do not sell, trade, or rent user personal identification information to others.
                </p>
                <p className="leading-relaxed text-lg">
                  However, we share your personal identification information to vendors (hotels/flights/local operators etc.) and it solely depends on them how they use your personal identification information as per their privacy policies.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">Third Party Websites</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  User may find advertising or other content in our website that link to the websites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these websites and are not responsible for the practices employed by websites linked to or from our website. In addition, these websites or services, including their content and links, may be constantly changing. These websites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our user, is subject to that website's own terms and policies.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-purple-100 pb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  We have the discretion to update this Privacy Policy at any time. We encourage users to frequently check this page for any changes. You acknowledge and agree that it is your responsibility to review this Privacy Policy periodically and become aware of modifications.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-8 rounded-2xl text-white">
                <h2 className="text-3xl font-bold mb-6">Your Acceptance of These Terms</h2>
                <p className="leading-relaxed text-lg">
                  By submitting your personal identification information on the website, you signify your acceptance of this Privacy Policy. If you do not agree to this Privacy Policy, please do not submit on the website. Your continued use of our website following the posting of changes to this Privacy Policy will be deemed your acceptance of those changes.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </Section>
    </Layout>
  );
};

export default PrivacyPolicyPage;