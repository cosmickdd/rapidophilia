import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { featuredAdventures } from '../data/sampleData';
import { Adventure } from '../types';
import {
  FiMapPin,
  FiClock,
  FiUsers,
  FiStar,
  FiCalendar,
  FiHeart,
  FiShare2,
  FiArrowLeft,
  FiCheckCircle,
  FiXCircle,
  FiCamera,
  FiGlobe,
  FiInfo
} from 'react-icons/fi';

const AdventureDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'inclusions' | 'booking'>('overview');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: 1,
    specialRequests: '',
    emergencyContact: ''
  });

  useEffect(() => {
    if (id) {
      const foundAdventure = featuredAdventures.find(a => a.id === id);
      setAdventure(foundAdventure || null);
    }
  }, [id]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${bookingData.name}! Your booking request for ${adventure?.title} has been received. Our team will contact you within 24 hours to confirm the details.`);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      participants: 1,
      specialRequests: '',
      emergencyContact: ''
    });
  };

  if (!adventure) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Adventure Not Found</h2>
            <p className="text-gray-600 mb-6">The adventure you're looking for doesn't exist.</p>
            <Link to="/adventure">
              <Button variant="primary">Back to Adventures</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={adventure.image}
            alt={adventure.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Navigation */}
          <div className="absolute top-6 left-6 z-10">
            <Link to="/adventure">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
              >
                {FiArrowLeft({ className: "h-6 w-6" })}
              </motion.button>
            </Link>
          </div>

          {/* Share & Like */}
          <div className="absolute top-6 right-6 z-10 flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              {FiHeart({ className: "h-6 w-6" })}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              {FiShare2({ className: "h-6 w-6" })}
            </motion.button>
          </div>

          {/* Adventure Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${{
                    'Easy': 'bg-green-500',
                    'Beginner': 'bg-green-500',
                    'Moderate': 'bg-yellow-500',
                    'Intermediate': 'bg-yellow-500',
                    'Challenging': 'bg-orange-500',
                    'Advanced': 'bg-orange-500',
                    'Expert': 'bg-red-500'
                  }[adventure.difficulty] || 'bg-purple-500'}`}>
                    {adventure.difficulty}
                  </span>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {adventure.category}
                  </span>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    {FiStar({ className: "h-4 w-4 text-yellow-400 mr-1" })}
                    <span className="text-white text-sm font-medium">{adventure.rating}</span>
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {adventure.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <div className="flex items-center">
                    {FiMapPin({ className: "h-5 w-5 mr-2" })}
                    <span>{adventure.location}</span>
                  </div>
                  <div className="flex items-center">
                    {FiClock({ className: "h-5 w-5 mr-2" })}
                    <span>{adventure.duration}</span>
                  </div>
                  <div className="flex items-center">
                    {FiUsers({ className: "h-5 w-5 mr-2" })}
                    <span>Max {adventure.maxGroupSize} people</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
          <div className="container-custom">
            <div className="flex space-x-8 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'itinerary', label: 'Itinerary' },
                { id: 'inclusions', label: 'Inclusions' },
                { id: 'booking', label: 'Book Now' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="container-custom py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Adventure</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {adventure.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-purple-50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        {FiInfo({ className: "h-6 w-6 text-purple-600 mr-3" })}
                        <h3 className="text-xl font-bold text-gray-900">Adventure Highlights</h3>
                      </div>
                      <ul className="space-y-2">
                        {adventure.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            {FiCheckCircle({ className: "h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" })}
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        {FiCamera({ className: "h-6 w-6 text-gray-600 mr-3" })}
                        <h3 className="text-xl font-bold text-gray-900">What to Expect</h3>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          {FiCheckCircle({ className: "h-5 w-5 text-green-500 mr-3 mt-0.5" })}
                          <span className="text-gray-700">Professional local guides</span>
                        </li>
                        <li className="flex items-start">
                          {FiCheckCircle({ className: "h-5 w-5 text-green-500 mr-3 mt-0.5" })}
                          <span className="text-gray-700">Authentic cultural experiences</span>
                        </li>
                        <li className="flex items-start">
                          {FiCheckCircle({ className: "h-5 w-5 text-green-500 mr-3 mt-0.5" })}
                          <span className="text-gray-700">Small group adventures</span>
                        </li>
                        <li className="flex items-start">
                          {FiCheckCircle({ className: "h-5 w-5 text-green-500 mr-3 mt-0.5" })}
                          <span className="text-gray-700">Safety-first approach</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Itinerary Tab */}
              {activeTab === 'itinerary' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
                  <div className="space-y-6">
                    {adventure.itinerary.map((day, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                            <span className="text-purple-600 font-bold">{index + 1}</span>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{day.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{day.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Inclusions Tab */}
              {activeTab === 'inclusions' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        {FiCheckCircle({ className: "h-6 w-6 text-green-500 mr-3" })}
                        What's Included
                      </h3>
                      <ul className="space-y-3">
                        {adventure.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start">
                            {FiCheckCircle({ className: "h-5 w-5 text-green-500 mr-3 mt-0.5" })}
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        {FiXCircle({ className: "h-6 w-6 text-red-500 mr-3" })}
                        What's Not Included
                      </h3>
                      <ul className="space-y-3">
                        {adventure.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start">
                            {FiXCircle({ className: "h-5 w-5 text-red-500 mr-3 mt-0.5" })}
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {adventure.equipment && adventure.equipment.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Required Equipment</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {adventure.equipment.map((item, index) => (
                          <div key={index} className="flex items-center">
                            {FiCheckCircle({ className: "h-4 w-4 text-purple-500 mr-3" })}
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Booking Tab */}
              {activeTab === 'booking' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Book Your Adventure</h2>
                  
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Participants *
                        </label>
                        <select
                          value={bookingData.participants}
                          onChange={(e) => setBookingData({ ...bookingData, participants: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        >
                          {Array.from({ length: adventure.maxGroupSize }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        value={bookingData.emergencyContact}
                        onChange={(e) => setBookingData({ ...bookingData, emergencyContact: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Emergency contact name and phone"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests or Dietary Requirements
                      </label>
                      <textarea
                        rows={4}
                        value={bookingData.specialRequests}
                        onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Any special requirements, dietary restrictions, medical conditions, etc."
                      />
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Adventure:</span>
                          <span className="font-medium">{adventure.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{adventure.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Participants:</span>
                          <span className="font-medium">{bookingData.participants} {bookingData.participants === 1 ? 'person' : 'people'}</span>
                        </div>
                        <div className="flex justify-between border-t border-purple-200 pt-2 mt-4">
                          <span className="text-lg font-bold text-gray-900">Total Cost:</span>
                          <span className="text-2xl font-bold text-purple-600">
                            ₹{(adventure.price * bookingData.participants).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" variant="primary" className="w-full py-4 text-lg">
                      Request Booking
                    </Button>
                  </form>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Price Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      ₹{adventure.price.toLocaleString()}
                    </div>
                    <div className="text-gray-500">per person</div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{adventure.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Max Group Size:</span>
                      <span className="font-medium">{adventure.maxGroupSize} people</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${{
                        'Easy': 'bg-green-100 text-green-800',
                        'Beginner': 'bg-green-100 text-green-800',
                        'Moderate': 'bg-yellow-100 text-yellow-800',
                        'Intermediate': 'bg-yellow-100 text-yellow-800',
                        'Challenging': 'bg-orange-100 text-orange-800',
                        'Advanced': 'bg-orange-100 text-orange-800',
                        'Expert': 'bg-red-100 text-red-800'
                      }[adventure.difficulty] || 'bg-purple-100 text-purple-800'}`}>
                        {adventure.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    className="w-full mb-4"
                    onClick={() => setActiveTab('booking')}
                  >
                    Book Now
                  </Button>
                  
                  <div className="text-center">
                    <a href="tel:+919876543210" className="text-purple-600 hover:text-purple-700 font-medium">
                      Call +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    {FiGlobe({ className: "h-5 w-5 mr-2" })}
                    Quick Info
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      {FiCalendar({ className: "h-4 w-4 text-gray-500 mr-3 mt-0.5" })}
                      <div>
                        <div className="font-medium">Best Time to Visit</div>
                        <div className="text-gray-600">Year-round destination</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      {FiMapPin({ className: "h-4 w-4 text-gray-500 mr-3 mt-0.5" })}
                      <div>
                        <div className="font-medium">Meeting Point</div>
                        <div className="text-gray-600">Details provided after booking</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      {FiInfo({ className: "h-4 w-4 text-gray-500 mr-3 mt-0.5" })}
                      <div>
                        <div className="font-medium">Cancellation</div>
                        <div className="text-gray-600">Free cancellation up to 7 days</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Have questions about this adventure? Our team is here to help!
                  </p>
                  <a 
                    href="mailto:support@rapidophilia.com"
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    support@rapidophilia.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdventureDetailPage;