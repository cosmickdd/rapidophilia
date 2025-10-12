import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLoader } from './components/common';
import {
  HomePage,
  AboutPage,
  TrekPage,
  TrekDetailPage,
  AdventurePage,
  AdventureDetailPage,
  ExplorePage,
  BlogPage,
  BlogDetailPage,
  PrivacyPolicyPage,
  RefundPolicyPage,
  TermsOfUsePage
} from './utils/lazyComponents';
import TermsPage from './pages/TermsPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import BookingVerificationPage from './pages/BookingVerificationPage';
import DevPreviewPaymentSuccess from './pages/DevPreviewPaymentSuccess';

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/trek" element={<TrekPage />} />
            <Route path="/trek/:id" element={<TrekDetailPage />} />
            <Route path="/adventure" element={<AdventurePage />} />
            <Route path="/adventure/:id" element={<AdventureDetailPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            {/* Dev-only preview route: seeds a booking and redirects to payment-success */}
            <Route path="/dev/preview-payment-success" element={<DevPreviewPaymentSuccess />} />
            <Route path="/verify-booking/:bookingId" element={<BookingVerificationPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
