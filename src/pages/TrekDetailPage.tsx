import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import { CountdownTimer, PriceOfferTimer } from '../components/common';
import { featuredTreks } from '../data/sampleData';
import { 
  FiMapPin, 
  FiClock, 
  FiUsers, 
  FiCalendar,
  FiStar,
  FiCheck,
  FiX,
  FiMail,
  FiPhone
} from 'react-icons/fi';

const TrekDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const trek = featuredTreks.find(t => t.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'booking'>('overview');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    participants: 1,
    trekChoice: '',
    message: ''
  });

  if (!trek) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Trek Not Found</h1>
            <p className="text-gray-600 mb-8">The trek you're looking for doesn't exist.</p>
            <Link to="/trek">
              <Button variant="primary">Back to Treks</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          <div className="absolute inset-0 flex items-end">
            <div className="container-custom pb-16">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white max-w-4xl"
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
                    {FiStar({ className: "h-4 w-4 text-yellow-400" })}
                    <span className="text-sm font-medium">{trek.rating}/5</span>
                  </div>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  {trek.title}
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 mb-6">
                  {trek.shortDescription}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <div className="flex items-center">
                    {FiMapPin({ className: "h-5 w-5 mr-2" })}
                    <span>{trek.location}</span>
                  </div>
                  <div className="flex items-center">
                    {FiClock({ className: "h-5 w-5 mr-2" })}
                    <span>{trek.duration}</span>
                  </div>
                  <div className="flex items-center">
                    {FiUsers({ className: "h-5 w-5 mr-2" })}
                    <span>Max {trek.maxGroupSize} people</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Section className="py-0">
          <div className="container-custom">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'itinerary', label: 'Itinerary' },
                  { id: 'booking', label: 'Book Now' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </Section>

        {/* Tab Content */}
        <Section className="py-12">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Trek</h2>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                      {trek.description}
                    </p>

                    {/* Timer Components */}
                    {trek.earlyBirdDeadline && (
                      <div className="mb-8">
                        <CountdownTimer 
                          endDate={trek.earlyBirdDeadline}
                          variant="prominent"
                          size="md"
                          showLabel={true}
                          reason="Early Bird Offer Ends In"
                        />
                      </div>
                    )}

                    {trek.originalPrice && trek.originalPrice > trek.price && (
                      <div className="mb-8">
                        <PriceOfferTimer 
                          originalPrice={trek.originalPrice}
                          discountedPrice={trek.price}
                          endTime={trek.earlyBirdDeadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                        />
                      </div>
                    )}

                    {/* Limited Seats Warning */}
                    {trek.seatsRemaining && trek.seatsRemaining <= 5 && (
                      <div className="mb-8">
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-orange-700">
                                <span className="font-medium">Only {trek.seatsRemaining} seats remaining!</span>
                                {trek.limitedSeats && ` Limited to ${trek.limitedSeats} participants total.`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* What's Included */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {trek.inclusions.map((item, index) => (
                          <div key={index} className="flex items-center">
                            {FiCheck({ className: "h-5 w-5 text-green-500 mr-3 flex-shrink-0" })}
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* What's Not Included */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Not Included</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {trek.exclusions.map((item, index) => (
                          <div key={index} className="flex items-center">
                            {FiX({ className: "h-5 w-5 text-red-500 mr-3 flex-shrink-0" })}
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Best Time to Visit */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Time to Visit</h3>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <div className="flex items-center mb-2">
                          {FiCalendar({ className: "h-5 w-5 text-purple-600 mr-2" })}
                          <span className="font-semibold text-purple-900">Recommended Seasons</span>
                        </div>
                        <p className="text-purple-800">{trek.bestTimeToVisit}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'itinerary' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Daily Itinerary</h2>
                    <div className="space-y-6">
                      {trek.itinerary.map((day, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                              <span className="text-purple-600 font-bold">Day {day.day}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{day.title}</h3>
                              <p className="text-gray-700 mb-4">{day.description}</p>
                              
                              <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="font-semibold text-gray-900">Highlights:</span>
                                  <ul className="mt-1 space-y-1">
                                    {day.highlights.map((highlight, idx) => (
                                      <li key={idx} className="text-gray-600">• {highlight}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-900">Meals:</span>
                                  <p className="mt-1 text-gray-600">{day.meals.join(', ')}</p>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-900">Accommodation:</span>
                                  <p className="mt-1 text-gray-600">{day.accommodation}</p>
                                </div>
                              </div>
                            </div>
                          </div>
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
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Book Your Adventure</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Planning for which Trek? *
                          </label>
                          <select
                            name="trekChoice"
                            required
                            value={formData.trekChoice}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="">Select Trek</option>
                            <option value={trek.title}>{trek.title}</option>
                            <option value="Nag Tibba, Dehradun - 1N/2D">Nag Tibba, Dehradun - 1N/2D</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            How many people? *
                          </label>
                          <select
                            name="participants"
                            required
                            value={formData.participants}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          >
                            {Array.from({ length: trek.maxGroupSize }, (_, i) => (
                              <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'person' : 'people'}</option>
                            ))}
                          </select>
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
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Any special requirements or questions..."
                        />
                      </div>

                      <Button type="submit" variant="primary" size="lg" className="w-full">
                        Submit Booking Request
                      </Button>
                    </form>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* Price Card */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                    <div className="text-center mb-6">
                      {trek.originalPrice && trek.originalPrice > trek.price ? (
                        <div>
                          <div className="flex items-center justify-center space-x-2 mb-1">
                            <span className="text-2xl text-gray-400 line-through">
                              ₹{trek.originalPrice.toLocaleString()}
                            </span>
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                              {Math.round(((trek.originalPrice - trek.price) / trek.originalPrice) * 100)}% OFF
                            </span>
                          </div>
                          <span className="text-4xl font-bold text-purple-600">
                            ₹{trek.price.toLocaleString()}
                          </span>
                          <span className="text-gray-500 block">per person</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-4xl font-bold text-purple-600">
                            ₹{trek.price.toLocaleString()}
                          </span>
                          <span className="text-gray-500 block">per person</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-semibold">{trek.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty</span>
                        <span className="font-semibold">{trek.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Group Size</span>
                        <span className="font-semibold">Max {trek.maxGroupSize}</span>
                      </div>
                      {trek.seatsRemaining && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Seats Left</span>
                          <span className={`font-semibold ${trek.seatsRemaining <= 3 ? 'text-red-600' : trek.seatsRemaining <= 5 ? 'text-orange-600' : 'text-green-600'}`}>
                            {trek.seatsRemaining}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating</span>
                        <div className="flex items-center">
                          {FiStar({ className: "h-4 w-4 text-yellow-500 mr-1" })}
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

                  {/* Contact Card */}
                  <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-purple-900 mb-4">Need Help?</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        {FiMail({ className: "h-5 w-5 text-purple-600 mr-3" })}
                        <div>
                          <div className="text-sm text-purple-800">Email us</div>
                          <a href="mailto:support@rapidophilia.com" className="text-purple-600 text-sm font-medium">
                            support@rapidophilia.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {FiPhone({ className: "h-5 w-5 text-purple-600 mr-3" })}
                        <div>
                          <div className="text-sm text-purple-800">Call us</div>
                          <span className="text-purple-600 text-sm font-medium">+91 9999999999</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  );
};

export default TrekDetailPage;