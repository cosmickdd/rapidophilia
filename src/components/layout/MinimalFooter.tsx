import React from 'react';

import CONTACT from '../../config/contact';

const MinimalFooter: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-xl">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 4.5L18.5 20h-13L12 6.5z"/>
              </svg>
            </div>
            <span className="text-3xl font-semibold text-white tracking-tight">
              Rapidophilia
            </span>
          </div>

          {/* Professional Tagline */}
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-300 font-medium mb-4 leading-relaxed">
              Premium Adventure Experiences
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              Discover extraordinary landscapes and create unforgettable memories with our carefully curated trekking experiences.
            </p>
          </div>

          {/* Professional Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <p className="text-white font-medium">{CONTACT.email}</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm mb-1">Phone</p>
                <p className="text-white font-medium">{CONTACT.phone}</p>
              </div>
            </div>
          </div>

          {/* Professional Footer Bottom */}
          <div className="border-t border-gray-800 pt-8 mt-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-x-4">
                <button onClick={() => { window.location.href = '/terms-of-use'; window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-400 hover:text-white text-sm">Terms & Conditions</button>
                <button onClick={() => { window.location.href = '/privacy-policy'; window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-400 hover:text-white text-sm">Privacy Policy</button>
                <button onClick={() => { window.location.href = '/refund-policy'; window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-400 hover:text-white text-sm">Cancellation & Refund Policy</button>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-sm font-medium">Crafted with</span>
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">by</span>
                <span className="font-semibold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                  Cosmickdd
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                © 2025 Rapidophilia. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;