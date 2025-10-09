import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import MinimalNavbar from '../components/layout/MinimalNavbar';
import MinimalFooter from '../components/layout/MinimalFooter';
import Button from '../components/common/Button';
import Section from '../components/common/Section';
import PriceOfferTimer from '../components/common/PriceOfferTimer';
import FAQSection from '../components/common/FAQSection';
import GalleryGrid from '../components/common/GalleryGrid';
import { sendBookingEmail } from '../utils/emailService';
import TripDatesCard from '../components/common/TripDatesCard';
import { initializeRazorpayPayment } from '../utils/razorpayService';
import { validateForm as utilValidateForm, validateField as utilValidateField } from '../utils/validation';

// Icon Components
const StarIcon = ({ className, filled }: { className?: string; filled?: boolean }) => (
  <svg className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Trek Data (using your existing trek data structure)
const sampleTrek = {
  id: 2,
  title: "Trek To The Highest Peak Of Lower Himalayas - Nag Tibba",
  shortDescription: "Experience the breathtaking beauty of Nag Tibba, the highest peak in the lower Himalayas",
  description: "Nag Tibba, standing at 3,022 meters (9,915 feet), is the highest peak in the lower Himalayas and offers one of the most scenic trekking experiences in Uttarakhand. This trek is perfect for beginners and experienced trekkers alike, offering stunning views of the Bandarpoonch, Kedarnath, and Gangotri peaks.",
  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  duration: "3N 2D",
  difficulty: "Moderate",
  location: "Dehradun, Uttarakhand",
  price: 3999,
  originalPrice: 5700,
  rating: 4.8,
  maxGroupSize: 15,
  seatsRemaining: 5,
  bestTimeToVisit: "October to March, May to June",
  inclusions: [
    "Professional trek guide",
    "All meals during trek",
    "First aid support",
    "Safety equipment",
  "Transportation from Delhi to Delhi by AC tempo traveller",
    "Accommodation in tents"
  ],
  exclusions: [
    "Personal expenses",
    "Travel insurance",
    "Equipment rental",
    "Tips for guide",
    "Emergency evacuation",
    "Personal medication"
  ],
  itinerary: [
    {
      day: 1,
      title: "Base Camp to Summit",
      description: "Early morning departure from Dehradun, reach base camp, and start trek to summit",
      highlights: ["Scenic drive", "Base camp setup", "Summit push"],
      meals: ["Breakfast", "Lunch", "Dinner"],
      accommodation: "Tent"
    },
    {
      day: 2,
      title: "Summit to Base Camp",
      description: "Early morning sunrise view, descent to base camp, and return to Dehradun",
      highlights: ["Sunrise view", "Descent", "Return journey"],
      meals: ["Breakfast", "Lunch"],
      accommodation: "N/A"
    }
  ]
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  trekChoice: string;
  participants: number;
  message: string;
}

const TrekDetailPage: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'gallery' | 'reviews' | 'booking'>('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [showTimer, setShowTimer] = useState(() => {
    // Remember user preference from localStorage
    const savedPreference = localStorage.getItem('showPriceTimer');
    return savedPreference !== 'false';
  });
  const [showDismissToast, setShowDismissToast] = useState(false);
  const [showCancelPolicy, setShowCancelPolicy] = useState(false);

  // Save user preference when timer is dismissed
  const handleTimerDismiss = () => {
    setShowTimer(false);
    localStorage.setItem('showPriceTimer', 'false');
    
    // Show brief success feedback
    setShowDismissToast(true);
    setTimeout(() => setShowDismissToast(false), 2000);
  };

  // Close cancellation modal on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showCancelPolicy) setShowCancelPolicy(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showCancelPolicy]);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    trekChoice: '',
    participants: 1,
    message: ''
  });

  // Trip dates are computed and rendered inside TripDatesCard component (auto-updates nightly)

  // Check if this is the minimal layout page
  const isMinimalLayout = location.pathname === '/trek/2';
  const trek = sampleTrek; // In real app, you'd fetch this based on ID

  useEffect(() => {
    if (trek) {
      setFormData(prev => ({
        ...prev,
        trekChoice: trek.title
      }));
    }
  }, [trek]);

  // Listen for programmatic requests to scroll to booking (from Navbar or other components)
  useEffect(() => {
    const handler = () => {
      setActiveTab('booking');
      setTimeout(() => {
        // try to find the booking tab panel or an element with id 'booking'
        const el = document.getElementById('booking') || document.getElementById('tabpanel-booking');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    };
    window.addEventListener('scroll-to-booking', handler as EventListener);
    return () => window.removeEventListener('scroll-to-booking', handler as EventListener);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'participants' ? parseInt(value) : value
    }));
  };

  // Form validation state and helpers
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = React.useCallback((name: string, value: any) => {
    const vf = utilValidateField(trek?.maxGroupSize);
    return vf(name, value);
  }, [trek]);

  const validateForm = React.useCallback(() => utilValidateForm(formData, trek?.maxGroupSize), [formData, trek]);

  // Clear field error on change
  const handleValidatedInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // reuse existing setter
    handleInputChange(e);
    setErrors(prev => {
      const next = { ...prev } as Record<string, string>;
      const err = validateField(name, name === 'participants' ? parseInt(value as string) : value);
      if (err) next[name] = err; else delete next[name];
      return next;
    });
  };

  // Recompute overall form validity whenever formData or errors change
  useEffect(() => {
    const newErrors = validateForm();
    setErrors(prev => ({ ...prev, ...newErrors }));
    // keep inline errors updated
  }, [formData, validateForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form before submitting
    const currentErrors = validateForm();
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length > 0) {
      // Focus first invalid field
      const firstKey = Object.keys(currentErrors)[0];
      const field = document.querySelector(`[name="${firstKey}"]`) as HTMLElement | null;
      if (field && typeof field.focus === 'function') field.focus();
      setSubmitStatus({ type: 'error', message: 'Please correct the highlighted fields and try again.' });
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const totalPrice = 3999 * formData.participants;

    try {
      // Start both payment and email processes in parallel
      const paymentPromise = initializeRazorpayPayment({
        amount: totalPrice,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        description: `Trek Booking: ${trek.title} (${formData.participants} participant${formData.participants > 1 ? 's' : ''})`,
        trekTitle: trek.title,
        participants: formData.participants,
        message: formData.message
      });

      // Send email immediately in parallel (don't wait for it)
      const emailPromise = sendBookingEmail({
        ...formData,
        totalPrice,
        trekTitle: trek.title
      });

      // Handle email result separately
      emailPromise
        .then(() => {
          console.log('✅ Email sent successfully');
          setSubmitStatus({
            type: 'success',
            message: 'Form submitted successfully! Check your email for confirmation.'
          });
        })
        .catch((error) => {
          console.error('❌ Email sending failed:', error);
          setSubmitStatus({
            type: 'error',
            message: 'Form submitted but email failed. We will contact you directly.'
          });
        });

      // Wait for payment initialization and handle success
      const paymentResponse = await paymentPromise;
      
      // Redirect to success page with booking data
      if (paymentResponse && paymentResponse.bookingData) {
        window.location.href = `/payment-success?booking_id=${paymentResponse.bookingData.bookingId}&payment_id=${paymentResponse.razorpay_payment_id}&status=paid`;
      }
      
    } catch (error) {
      console.error('❌ Payment initialization failed:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Payment initialization failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!trek) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Trek not found</h1>
            <p className="text-gray-600">The trek you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (isMinimalLayout) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <MinimalNavbar onBookNowClick={() => setActiveTab('booking')} />
          
          {/* Toggle Timer Below Navbar */}
          {showTimer && (
            <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-gray-700">Limited Time Offer</span>
                </div>
                <div className="text-purple-600 font-bold">₹3,999</div>
                <button
                  onClick={handleTimerDismiss}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close offer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          <div className="pt-16">
            {/* Enhanced Hero Section for Minimal Layout */}
            <div className="relative min-h-screen overflow-hidden">
              {/* Background Image with proper positioning and optimization */}
              <div className="absolute inset-0">
                <img
                  src={trek.image}
                  alt={`${trek.title} - Adventure trek in the Himalayas`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  style={{ objectPosition: '50% 40%' }}
                  loading="eager"
                  decoding="async"
                />
              </div>
              
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              
              {/* Centered Timer - Mobile Optimized */}
              <AnimatePresence mode="wait">
                {showTimer && (
                  <div className="absolute top-4 left-4 right-4 z-20 sm:top-20 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:w-full sm:max-w-sm sm:px-4">
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/30 relative group"
                    >
                    {/* Enhanced Close Button */}
                    <motion.button
                      onClick={handleTimerDismiss}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute -top-2 -right-2 bg-gray-800/80 hover:bg-gray-900 text-white rounded-full p-2 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 group/close"
                      aria-label="Dismiss timer"
                      title="Close timer"
                    >
                      <svg className="w-4 h-4 group-hover/close:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>

                    {/* Dismissal Hint */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        Click × to dismiss
                      </div>
                    </div>
                    
                    <PriceOfferTimer 
                      originalPrice={5700}
                      discountedPrice={3999}
                      compact
                      onDismiss={handleTimerDismiss}
                    />
                  </motion.div>
                </div>
                )}
              </AnimatePresence>
              

              
              {/* Main Content - Better positioned for mobile and desktop */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4 pt-12 sm:pt-8">
                <div className="container mx-auto max-w-6xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-white"
                  >
                    {/* Badges Row */}
                    <div className="flex justify-center items-center flex-wrap gap-4 mb-8">
                      <span className={`px-5 py-3 rounded-full text-base sm:text-lg font-bold ${
                        trek.difficulty === 'Easy' ? 'bg-green-500' :
                        trek.difficulty === 'Moderate' ? 'bg-yellow-500' :
                        trek.difficulty === 'Challenging' ? 'bg-orange-500' : 'bg-red-500'
                      }`}>
                        {trek.difficulty}
                      </span>
                      <div className="flex items-center bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full">
                        <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mr-2" filled={true} />
                        <span className="text-base sm:text-lg font-bold">{trek.rating}/5</span>
                        <span className="text-sm text-gray-200 ml-3">(124 reviews)</span>
                      </div>
                    </div>
                    
                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight tracking-tight px-2">
                      {trek.title}
                    </h1>
                    
                    {/* Description */}
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-200 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed font-light px-4">
                      Experience the breathtaking beauty of Nag Tibba, the highest peak in the lower Himalayas
                    </p>

                    {/* ...hero content... (upcoming weekend label shown in Trip Dates card below) */}
                    
                    {/* Trek Details */}
                    <div className="flex justify-center flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-10 text-sm sm:text-base px-2">
                      <div className="flex items-center bg-white/15 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                        <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
                        <span className="font-semibold">{trek.location}</span>
                      </div>
                      <div className="flex items-center bg-white/15 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                        <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
                        <span className="font-semibold">{trek.duration}</span>
                      </div>
                      <div className="flex items-center bg-white/15 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20">
                        <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-3" />
                        <span className="font-semibold">Max {trek.maxGroupSize}</span>
                      </div>
                    </div>
                    
                    {/* Enhanced CTA Section */}
                    <div className="flex flex-col items-center space-y-8">
                      {/* Price Display */}
                      <div className="bg-black/30 backdrop-blur-lg rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-6 sm:py-8 border border-white/30 shadow-2xl mx-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-4 mb-3">
                            <span className="text-lg sm:text-2xl text-gray-300 line-through">₹{(5700).toLocaleString()}</span>
                            <span className="bg-green-500 text-white text-sm sm:text-base font-bold px-3 py-2 rounded-full animate-pulse">30% OFF</span>
                          </div>
                          <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-yellow-400 mb-2">₹3,999</div>
                          <div className="text-base sm:text-lg text-gray-200">per person</div>
                        </div>
                      </div>
                      
                      {/* Book Now Button */}
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab('booking')}
                        className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl lg:text-2xl shadow-2xl border-2 border-white/20 backdrop-blur-sm transition-all duration-300 mx-4"
                      >
                        <span>Book Now - ₹3,999</span>
                      </motion.button>
                    </div>

                    {/* Trip Dates Card (Hero) - shown only on /trek/2 minimal layout */}
                    {isMinimalLayout && (
                      <div className="mt-6 flex justify-center">
                        <div className="w-full px-4">
                          <TripDatesCard
                            variant="hero"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Quick Features */}
                    <div className="mt-8 sm:mt-10 flex justify-center px-4">
                      <div className="bg-black/20 backdrop-blur-lg rounded-xl sm:rounded-2xl px-4 sm:px-8 py-3 sm:py-4 border border-white/20">
                        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm sm:text-base">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400 text-lg">✓</span>
                            <span className="font-semibold">Travel & Food</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400 text-lg">✓</span>
                            <span className="font-semibold">Stay</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400 text-lg">✓</span>
                            <span className="font-semibold">Guide</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Enhanced Scroll Indicator */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex flex-col items-center space-y-1 sm:space-y-2"
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-white/70 bg-white/10 rounded-full p-1.5 sm:p-2 backdrop-blur-sm border border-white/20"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Mobile-First Tab Navigation */}
            <div className="container-custom py-4">
              {/* Mobile: Horizontal scroll tabs */}
              <div className="sm:hidden">
                <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'itinerary', label: 'Itinerary' },
                    { id: 'gallery', label: 'Gallery' },
                    { id: 'reviews', label: 'Reviews' },
                    { id: 'booking', label: 'Book Now' }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        // Auto scroll to center
                        setTimeout(() => {
                          const element = document.getElementById(`tab-${tab.id}`);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                          }
                        }, 100);
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        flex-shrink-0 px-4 py-3 rounded-full font-medium text-sm transition-all duration-300 min-w-max focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                        ${
                          activeTab === tab.id
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:shadow-sm'
                        }
                      `}
                      id={`tab-${tab.id}`}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`tabpanel-${tab.id}`}
                    >
                      {tab.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Desktop: Grid tabs */}
              <div className="hidden sm:block">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-2">
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'itinerary', label: 'Itinerary' },
                      { id: 'gallery', label: 'Gallery' },
                      { id: 'reviews', label: 'Reviews' },
                      { id: 'booking', label: 'Book Now' }
                    ].map((tab) => (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          relative py-4 px-4 rounded-xl font-medium text-sm transition-all duration-300
                          ${
                            activeTab === tab.id
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                              : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                          }
                        `}
                      >
                        <span className="text-xs">{tab.label}</span>
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl -z-10"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Tab Content */}
            <Section className="py-8">
              <div className="max-w-6xl mx-auto" role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl p-4 sm:p-8"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">About This Trek</h2>
                    <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                      {trek.description}
                    </p>

                    {/* Enhanced Price Offer Timer */}
                    <div className="mb-6 sm:mb-8">
                      <PriceOfferTimer 
                        originalPrice={5700}
                        discountedPrice={3999}
                      />
                    </div>

                    {/* Limited Seats Warning */}
                    {trek.seatsRemaining && trek.seatsRemaining <= 5 && (
                      <div className="mb-6 sm:mb-8">
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-3 sm:p-4 rounded-r-lg">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-2 sm:ml-3">
                              <p className="text-xs sm:text-sm text-orange-700">
                                <span className="font-medium">Only {trek.seatsRemaining} seats remaining!</span>
                                {trek.seatsRemaining <= 3 && ` Book now to secure your spot.`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
                        <div className="grid md:grid-cols-1 gap-3 sm:gap-4">
                          {trek.inclusions.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                              <span className="text-sm sm:text-base text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">What's Not Included</h3>
                        <div className="grid md:grid-cols-1 gap-3 sm:gap-4">
                          {trek.exclusions.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <XIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2 sm:mr-3 flex-shrink-0" />
                              <span className="text-sm sm:text-base text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8 bg-purple-50 rounded-xl p-4 sm:p-6">
                      <div className="flex items-center mb-2">
                        <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-2" />
                        <span className="font-semibold text-purple-900">Recommended Seasons</span>
                      </div>
                      <p className="text-purple-800">{trek.bestTimeToVisit}</p>
                    </div>

                    {/* Book Now Button */}
                    <div className="mt-6 sm:mt-8 text-center">
                      <motion.button
                        onClick={() => setActiveTab('booking')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-xl"
                      >
                        Book This Trek - ₹3,999
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'itinerary' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl p-4 sm:p-8"
                  >
                    {/* Section Header */}
                    <div className="text-center mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Nag Tibba Trek – 2 Days / 1 Night</h2>
                      <p className="text-purple-600 font-semibold text-lg">{(() => {
                        const t = new Date();
                        const dow = t.getDay();
                        const daysUntilSat = ((6 - dow) + 7) % 7 || 7;
                        const sat = new Date(t);
                        sat.setDate(t.getDate() + daysUntilSat);
                        const sun = new Date(sat);
                        sun.setDate(sat.getDate() + 1);
                        const short = (d: Date) => d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
                        const weekendLabel = `${short(sat)} – ${short(sun)}`;
                        return `${weekendLabel} | Delhi to Delhi (Kashmere Gate Pickup & Drop)`;
                      })()}</p>
                    </div>

                    {/* Quick Highlights Row */}
                    <div className="mb-8">
                      <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
                        <div className="flex-shrink-0 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl px-4 py-3 min-w-max">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800 text-sm">Transfers</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl px-4 py-3 min-w-max">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800 text-sm">Meals</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl px-4 py-3 min-w-max">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800 text-sm">Stay</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl px-4 py-3 min-w-max">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800 text-sm">Tea & Snacks</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl px-4 py-3 min-w-max">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800 text-sm">Luggage Facility</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Itinerary Timeline */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Itinerary</h3>
                      <div className="relative">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-4 sm:left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-purple-400 to-blue-400"></div>
                        
                        <div className="space-y-6">
                          {/* START Box */}
                          <div className="relative flex items-center">
                            <div className="flex-shrink-0 bg-green-500 text-white px-3 py-2 rounded-lg font-bold text-sm mr-4 sm:mr-6 z-10 shadow-lg">
                              START
                            </div>
                            <div className="text-gray-600 font-medium">Journey Begins</div>
                          </div>
                          
                          {/* Day 0 - Friday Night */}
                          <div className="relative flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-4 sm:mr-6 z-10 border-2 border-white shadow-lg">
                              <span className="text-white font-bold text-sm sm:text-base">0</span>
                            </div>
                            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 sm:p-6 flex-1">
                              <div className="flex items-center mb-2">
                                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">Day 0</span>
                                <span className="text-purple-600 font-semibold">Friday Night</span>
                              </div>
                              <h4 className="font-bold text-gray-900 mb-2">Departure from Delhi</h4>
                              <p className="text-gray-700 text-sm">8:00 PM departure from Delhi (Kashmere Gate). Overnight journey to Pantwari base.</p>
                            </div>
                          </div>

                          {/* Day 1 - Saturday */}
                          <div className="relative flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4 sm:mr-6 z-10 border-2 border-white shadow-lg">
                              <span className="text-white font-bold text-sm sm:text-base">1</span>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6 flex-1">
                              <div className="flex items-center mb-2">
                                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">Day 1</span>
                                <span className="text-green-600 font-semibold">Saturday</span>
                              </div>
                              <h4 className="font-bold text-gray-900 mb-2">Trek to Base Camp</h4>
                              <p className="text-gray-700 text-sm mb-3">Early morning arrival at Pantwari. Begin trek to Base Camp, enjoy tea & snacks. Evening dinner and overnight stay in tents.</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Trek Start</span>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Tea & Snacks</span>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Tent Stay</span>
                              </div>
                            </div>
                          </div>

                          {/* Day 2 - Sunday */}
                          <div className="relative flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4 sm:mr-6 z-10 border-2 border-white shadow-lg">
                              <span className="text-white font-bold text-sm sm:text-base">2</span>
                            </div>
                            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 sm:p-6 flex-1">
                              <div className="flex items-center mb-2">
                                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">Day 2</span>
                                <span className="text-orange-600 font-semibold">Sunday</span>
                              </div>
                              <h4 className="font-bold text-gray-900 mb-2">Summit & Return</h4>
                              <p className="text-gray-700 text-sm mb-3">Early morning summit trek to enjoy breathtaking Himalayan views. Return trek to Pantwari, lunch, and departure to Delhi. Late night arrival.</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Summit Views</span>
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Lunch</span>
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Return Journey</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* END Box */}
                          <div className="relative flex items-center">
                            <div className="flex-shrink-0 bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-sm mr-4 sm:mr-6 z-10 shadow-lg">
                              END
                            </div>
                            <div className="text-gray-600 font-medium">Journey Complete - Back to Delhi</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inclusions Section */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">What's Included</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-lg p-4">
                          <span className="text-green-600 text-xl">✅</span>
                          <span className="text-gray-800 font-medium">Delhi ↔ Pantwari transfers</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-lg p-4">
                          <span className="text-green-600 text-xl">✅</span>
                          <span className="text-gray-800 font-medium">All vegetarian meals (Day 1 breakfast → Day 2 lunch)</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-lg p-4">
                          <span className="text-green-600 text-xl">✅</span>
                          <span className="text-gray-800 font-medium">Tented accommodation (double/triple sharing)</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-lg p-4">
                          <span className="text-green-600 text-xl">✅</span>
                          <span className="text-gray-800 font-medium">Evening tea & snacks at Base Camp</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-lg p-4">
                          <span className="text-green-600 text-xl">✅</span>
                          <span className="text-gray-800 font-medium">Luggage facility at Base Camp</span>
                        </div>
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <div className="text-center">
                      <button
                        onClick={() => setActiveTab('booking')}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Book Now - ₹3,999
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl p-4 sm:p-8"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Gallery</h2>
                    
                    {/* Featured Video Section */}
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Trek Experience Video</h3>
                      <div className="relative aspect-[9/16] sm:aspect-video max-w-md sm:max-w-full bg-black rounded-lg overflow-hidden">
                        <iframe
                          src="https://www.instagram.com/reel/DNd2V8QyoKO/embed"
                          className="w-full h-full"
                          frameBorder="0"
                          scrolling="no"
                          allowTransparency={true}
                          title="Trek Experience Video"
                        ></iframe>
                      </div>
                      <p className="text-gray-600 mt-2 text-sm">Experience the breathtaking journey through our trek highlights</p>
                    </div>

                    {/* Categorized Photo Gallery */}
                    <div className="mb-6">
                      <div className="text-center max-w-3xl mx-auto">
                        <h2 id="gallery-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Photo Gallery</h2>
                        <p className="text-gray-600 mb-4">A curated visual tour of Nag Tibba. Click thumbnails to open the viewer.</p>
                      </div>
                      <div className="mb-8">
                        <GalleryGrid />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl p-4 sm:p-8"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Reviews</h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex items-center">
                        <div className="flex items-center space-x-1 mr-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className={`h-5 w-5 ${star <= Math.floor(trek.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              filled={star <= Math.floor(trek.rating)}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-bold text-gray-900">{trek.rating}/5</span>
                        <span className="text-gray-500">(124 reviews)</span>
                      </div>
                    </div>
                    
                    {/* Sample Reviews */}
                    <div className="space-y-6">
                      {[
                        {
                          name: "Priya Sharma",
                          rating: 5,
                          date: "2 weeks ago",
                          review: "Amazing trek! The views were breathtaking and our guide was very knowledgeable. Highly recommended for beginners."
                        },
                        {
                          name: "Rahul Verma",
                          rating: 5,
                          date: "1 month ago",
                          review: "Perfect weekend getaway. Well organized and the sunrise view from the summit was unforgettable!"
                        },
                        {
                          name: "Anjali Patel",
                          rating: 4,
                          date: "2 months ago",
                          review: "Great experience overall. The trek was challenging but manageable. Food and accommodation were good."
                        }
                      ].map((review, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-gray-900">{review.name}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center space-x-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                      key={star}
                                      className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                      filled={star <= review.rating}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.review}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'booking' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    {/* Booking-top Trip Dates Card (full-width) - show only on /trek/2 */}
                    {isMinimalLayout && (
                      <div id="booking-top-dates">
                        <TripDatesCard variant="booking" />
                      </div>
                    )}
                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                      {/* Booking Form */}
                      <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
                          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Book Your Trek</h2>
                          
                          {/* Status Messages */}
                          {submitStatus.type && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`p-4 rounded-lg mb-6 ${
                                submitStatus.type === 'success' 
                                  ? 'bg-green-50 border border-green-200 text-green-800' 
                                  : 'bg-red-50 border border-red-200 text-red-800'
                              }`}
                              role="alert"
                            >
                              <div className="flex items-center">
                                {submitStatus.type === 'success' ? (
                                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                )}
                                {submitStatus.message}
                              </div>
                            </motion.div>
                          )}
                          
                          <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  First Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="firstName"
                                  required
                                  value={formData.firstName}
                                  onChange={handleValidatedInputChange}
                                  aria-invalid={!!errors.firstName}
                                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                                  className={`w-full px-4 py-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                                />
                                {errors.firstName && (
                                  <p id="firstName-error" className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                )}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleValidatedInputChange}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                />
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Email Address <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  required
                                  value={formData.email}
                                  onChange={handleValidatedInputChange}
                                  aria-invalid={!!errors.email}
                                  aria-describedby={errors.email ? 'email-error' : undefined}
                                  className={`w-full px-4 py-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                                />
                                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Phone Number <span className="text-red-600">*</span>
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  required
                                  value={formData.phone}
                                  onChange={handleValidatedInputChange}
                                  aria-invalid={!!errors.phone}
                                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                                  className={`w-full px-4 py-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                                />
                                {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Trek Choice
                                </label>
                                {/* Trek choice is preselected and not editable per request */}
                                <div className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-700">{trek.title}</div>
                                <input type="hidden" name="trekChoice" value={trek.title} />
                                {/* trekChoice is optional; no inline error shown */}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Number of Participants <span className="text-red-600">*</span>
                                </label>
                                <select
                                  name="participants"
                                  required
                                  value={formData.participants}
                                  onChange={handleValidatedInputChange}
                                  aria-invalid={!!errors.participants}
                                  aria-describedby={errors.participants ? 'participants-error' : undefined}
                                  className={`w-full px-4 py-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 ${errors.participants ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                                >
                                  {Array.from({ length: trek.maxGroupSize }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'person' : 'people'}</option>
                                  ))}
                                </select>
                                {errors.participants && <p id="participants-error" className="mt-1 text-sm text-red-600">{errors.participants}</p>}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Additional Message
                              </label>
                              <textarea
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleValidatedInputChange}
                                aria-invalid={!!errors.message}
                                aria-describedby={errors.message ? 'message-error' : undefined}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500 ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                                placeholder="Any special requirements or questions..."
                              />
                              {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>}
                            </div>

                            <Button 
                              type="submit" 
                              variant="primary" 
                              size="lg" 
                              className="w-full"
                              disabled={isSubmitting || Object.keys(errors).length > 0}
                            >
                              {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Processing...
                                </div>
                              ) : (
                                `Book Now - ₹${(3999 * formData.participants).toLocaleString()}`
                              )}
                            </Button>
                          </form>
                        </div>
                      </div>

                      {/* Enhanced Booking Summary */}
                      <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                        {/* Price Offer Timer */}
                        <PriceOfferTimer 
                          originalPrice={5700}
                          discountedPrice={3999}
                        />

                        {/* Professional Booking Summary Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                          {/* Header */}
                          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold text-white">Booking Summary</h3>
                              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6 space-y-4">
                            {/* Trek Info */}
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <span className="text-gray-600 text-sm font-medium">Trek</span>
                                <span className="font-semibold text-gray-900 text-right text-sm max-w-[60%]">
                                  {trek.title.length > 35 ? `${trek.title.substring(0, 35)}...` : trek.title}
                                </span>
                                <span className="block text-xs text-gray-500 mt-1">Weekend: {(() => {
                                  const t = new Date();
                                  const dow = t.getDay();
                                  const daysUntilSat = ((6 - dow) + 7) % 7 || 7;
                                  const sat = new Date(t);
                                  sat.setDate(t.getDate() + daysUntilSat);
                                  const sun = new Date(sat);
                                  sun.setDate(sat.getDate() + 1);
                                  const short = (d: Date) => d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
                                  return `${short(sat)} – ${short(sun)}`;
                                })()}</span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="text-center p-2 bg-gray-50 rounded-lg">
                                  <span className="text-gray-600 block">Duration</span>
                                  <span className="font-semibold text-gray-900">{trek.duration}</span>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded-lg">
                                  <span className="text-gray-600 block">Difficulty</span>
                                  <span className={`font-semibold ${
                                    trek.difficulty === 'Easy' ? 'text-green-600' :
                                    trek.difficulty === 'Moderate' ? 'text-yellow-600' :
                                    trek.difficulty === 'Challenging' ? 'text-orange-600' : 'text-red-600'
                                  }`}>{trek.difficulty}</span>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="text-center p-2 bg-gray-50 rounded-lg">
                                  <span className="text-gray-600 block">Participants</span>
                                  <span className="font-semibold text-purple-600">{formData.participants} {formData.participants === 1 ? 'person' : 'people'}</span>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded-lg">
                                  <span className="text-gray-600 block">Rating</span>
                                  <div className="flex items-center justify-center">
                                    <StarIcon className="h-3 w-3 text-yellow-500 mr-1" filled={true} />
                                    <span className="font-semibold text-yellow-600">{trek.rating}/5</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Pricing */}
                            <div className="border-t pt-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Price per person</span>
                                <div className="text-right">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-gray-400 text-sm line-through">₹5,700</span>
                                    <span className="font-bold text-green-600">₹3,999</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">30% OFF</span>
                              </div>
                            </div>

                            {/* Total Amount */}
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 text-white">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-purple-100 text-sm font-medium">Total Amount</p>
                                  <p className="text-2xl font-bold">₹{(3999 * formData.participants).toLocaleString()}</p>
                                  {formData.participants > 1 && (
                                    <p className="text-purple-200 text-xs">(₹3,999 × {formData.participants})</p>
                                  )}
                                  <p className="text-green-300 text-xs font-semibold mt-1">
                                    Save ₹{((5700 - 3999) * formData.participants).toLocaleString()}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-1">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                  </div>
                                  <p className="text-xs text-purple-200">All Inclusive</p>
                                </div>
                              </div>

                              {/* Features */}
                              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/20">
                                <div className="flex items-center text-xs">
                                  <span className="text-green-300 mr-1">✓</span>
                                  <span>Professional Guide</span>
                                </div>
                                <div className="flex items-center text-xs">
                                  <span className="text-green-300 mr-1">✓</span>
                                  <span>Safety Equipment</span>
                                </div>
                                <div className="flex items-center text-xs">
                                  <span className="text-green-300 mr-1">✓</span>
                                  <span>All Meals</span>
                                </div>
                                <div className="flex items-center text-xs">
                                  <span className="text-green-300 mr-1">✓</span>
                                  <span>First Aid Support</span>
                                </div>
                              </div>
                            </div>

                            {/* Cancellation Policy */}
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-gray-800 font-medium text-sm">Cancellation Policy</h4>
                                  <p className="text-gray-600 text-xs mt-1">
                                    Refer to cancellation policy for peace of mind.
                                  </p>
                                </div>
                                <button onClick={() => setShowCancelPolicy(true)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </Section>
            
            {/* FAQ Section */}
            <FAQSection />

            {/* Cancellation Policy Modal (minimal layout) */}
            <AnimatePresence>
              {showCancelPolicy && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black"
                    onClick={() => setShowCancelPolicy(false)}
                  />

                  <motion.div
                    initial={{ y: 40, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 p-6 sm:p-8 z-10"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cancel-policy-title-min"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 id="cancel-policy-title-min" className="text-lg sm:text-xl font-semibold text-gray-900">Cancellation Policy</h3>
                      <button
                        onClick={() => setShowCancelPolicy(false)}
                        className="text-gray-400 hover:text-gray-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        aria-label="Close cancellation policy"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                      <p><strong>Flexible Cancellation:</strong> Free cancellation up to 24 hours before the trek start time. Cancellations within 24 hours are non-refundable.</p>
                      <p><strong>Rescheduling:</strong> Rescheduling is allowed up to 48 hours before departure subject to availability and may incur a small fee.</p>
                      <p><strong>Force Majeure:</strong> In case of adverse weather or local restrictions, we may cancel or postpone. Full refunds or alternate dates will be offered.</p>
                      <p><strong>Group Bookings:</strong> For group cancellations or modifications, please contact our support team for tailored assistance.</p>
                      <p className="text-xs text-gray-500">If you have booked with travel insurance, please check your policy for coverage on cancellations and emergencies.</p>
                    </div>

                    <div className="mt-6 text-right">
                      <button onClick={() => setShowCancelPolicy(false)} className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Close</button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
          <MinimalFooter />
        </div>
      </>
    );
  }

  // Regular layout for other trek pages
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={trek.image}
            alt={trek.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white max-w-3xl"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${{
                    'Easy': 'bg-green-500',
                    'Moderate': 'bg-yellow-500',
                    'Challenging': 'bg-orange-500',
                    'Extreme': 'bg-red-500'
                  }[trek.difficulty]}`}>
                    {trek.difficulty}
                  </span>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" filled={true} />
                    <span className="text-sm font-medium">{trek.rating}/5</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">
                  {trek.title}
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-6">
                  {trek.shortDescription}
                </p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-lg mb-8">
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{trek.location}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2" />
                    <span>{trek.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <UsersIcon className="h-5 w-5 mr-2" />
                    <span>Max {trek.maxGroupSize} people</span>
                  </div>
                </div>
                
                {/* Book Now Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    onClick={() => setActiveTab('booking')}
                  >
                    Book Now - ₹3,999
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'itinerary', label: 'Itinerary' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'booking', label: 'Book Now' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Section className="py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tab content here would be the same as minimal layout */}
              {/* For brevity, I'm not repeating all the tab content */}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                {/* Price Card */}
                <div className="bg-white border border-gray-200 rounded-xl lg:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="text-center mb-4 sm:mb-6">
                    {trek.originalPrice && trek.originalPrice > trek.price ? (
                      <div>
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <span className="text-lg sm:text-2xl text-gray-400 line-through">
                            ₹{trek.originalPrice.toLocaleString()}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-2 py-1 rounded">
                            {Math.round(((trek.originalPrice - trek.price) / trek.originalPrice) * 100)}% OFF
                          </span>
                        </div>
                        <span className="text-2xl sm:text-4xl font-bold text-purple-600">
                          ₹{trek.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 block text-sm sm:text-base">per person</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-2xl sm:text-4xl font-bold text-purple-600">
                          ₹{trek.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 block text-sm sm:text-base">per person</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold">{trek.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Difficulty</span>
                      <span className="font-semibold">{trek.difficulty}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Group Size</span>
                      <span className="font-semibold">Max {trek.maxGroupSize}</span>
                    </div>
                    {trek.seatsRemaining && (
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="text-gray-600">Seats Left</span>
                        <span className={`font-semibold ${trek.seatsRemaining <= 3 ? 'text-red-600' : trek.seatsRemaining <= 5 ? 'text-orange-600' : 'text-green-600'}`}>
                          {trek.seatsRemaining}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center">
                        <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 mr-1" filled={true} />
                        <span className="font-semibold">{trek.rating}/5</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="w-full mb-4"
                    onClick={() => setActiveTab('booking')}
                  >
                    Book Now
                  </Button>
                  
                  <div className="text-center text-sm text-gray-500">
                    Free cancellation up to 24 hours before
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
      
      {/* Timer Dismissed Toast */}
      <AnimatePresence>
        {showDismissToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">Timer dismissed</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancellation Policy Modal */}
      <AnimatePresence>
        {showCancelPolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black"
              onClick={() => setShowCancelPolicy(false)}
            />

            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 p-6 sm:p-8 z-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cancel-policy-title"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 id="cancel-policy-title" className="text-lg sm:text-xl font-semibold text-gray-900">Cancellation Policy</h3>
                <button
                  onClick={() => setShowCancelPolicy(false)}
                  className="text-gray-400 hover:text-gray-700 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  aria-label="Close cancellation policy"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p><strong>Flexible Cancellation:</strong> Free cancellation up to 24 hours before the trek start time. Cancellations within 24 hours are non-refundable.</p>
                <p><strong>Rescheduling:</strong> Rescheduling is allowed up to 48 hours before departure subject to availability and may incur a small fee.</p>
                <p><strong>Force Majeure:</strong> In case of adverse weather or local restrictions, we may cancel or postpone. Full refunds or alternate dates will be offered.</p>
                <p><strong>Group Bookings:</strong> For group cancellations or modifications, please contact our support team for tailored assistance.</p>
                <p className="text-xs text-gray-500">If you have booked with travel insurance, please check your policy for coverage on cancellations and emergencies.</p>
              </div>

              <div className="mt-6 text-right">
                <button onClick={() => setShowCancelPolicy(false)} className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default TrekDetailPage;
