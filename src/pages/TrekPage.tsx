import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import { featuredTreks } from '../data/sampleData';
import { Link } from 'react-router-dom';
import { 
  FiSearch, 
  FiFilter, 
  FiMapPin, 
  FiClock, 
  FiTrendingUp,
  FiStar
} from 'react-icons/fi';

const TrekPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [durationFilter, setDurationFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'rating'>('rating');

  // Filter and sort treks
  const filteredTreks = useMemo(() => {
    let filtered = featuredTreks.filter(trek => {
      const matchesSearch = trek.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trek.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = !difficultyFilter || trek.difficulty === difficultyFilter;
      const matchesDuration = !durationFilter || trek.duration.includes(durationFilter);
      
      return matchesSearch && matchesDifficulty && matchesDuration;
    });

    // Sort treks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, difficultyFilter, durationFilter, sortBy]);

  const difficulties = ['Easy', 'Moderate', 'Challenging', 'Extreme'];
  const durations = ['2', '5', '8', '12', '14'];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero
          title="Explore Trekking Adventures"
          subtitle="Authentic Travel Experiences"
          description="Discover the most breathtaking trekking destinations with Rapidophilia Travel Solution Provider"
          backgroundImage="https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          height="medium"
        />

        {/* Filters Section */}
        <Section className="py-12">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-12"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="relative lg:col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {FiSearch({ className: "h-5 w-5 text-gray-400" })}
                  </div>
                  <input
                    type="text"
                    placeholder="Search treks or destinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* Difficulty Filter */}
                <div>
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">All Difficulties</option>
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">All Durations</option>
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration} days</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'price' | 'duration' | 'rating')}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="rating">Sort by Rating</option>
                    <option value="price">Sort by Price</option>
                    <option value="duration">Sort by Duration</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Available Treks
                </h2>
                <p className="text-gray-600">
                  {filteredTreks.length} trek{filteredTreks.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {FiFilter({ className: "h-4 w-4" })}
                  <span>Filter results</span>
                </div>
              </div>
            </motion.div>

            {/* Trek Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTreks.map((trek, index) => (
                <motion.div
                  key={trek.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    {/* Trek Image */}
                    <div className="relative h-64 overflow-hidden bg-gray-200">
                      <img
                        src={trek.image}
                        alt={trek.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                        }}
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${{
                          'Easy': 'bg-green-500',
                          'Moderate': 'bg-yellow-500',
                          'Challenging': 'bg-orange-500',
                          'Extreme': 'bg-red-500'
                        }[trek.difficulty]}`}>
                          {trek.difficulty}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                          {FiStar({ className: "h-3 w-3 text-yellow-500" })}
                          <span className="text-xs font-medium">{trek.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trek Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                          {trek.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {trek.shortDescription}
                        </p>
                      </div>

                      {/* Trek Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          {FiMapPin({ className: "h-4 w-4 mr-2" })}
                          <span>{trek.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          {FiClock({ className: "h-4 w-4 mr-2" })}
                          <span>{trek.duration}</span>
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-purple-600">
                            ₹{trek.price.toLocaleString()}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">per person</span>
                        </div>
                        <Link to={`/trek/${trek.id}`}>
                          <Button variant="primary" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredTreks.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center py-16"
              >
                <div className="text-gray-400 mb-4">
                  {FiTrendingUp({ className: "h-16 w-16 mx-auto" })}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No treks found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria to find more options
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearchTerm('');
                    setDifficultyFilter('');
                    setDurationFilter('');
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </Section>

        {/* Contact CTA */}
        <Section background="gradient" className="py-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                  {FiTrendingUp({ className: "h-12 w-12 text-white" })}
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              >
                Can't Find Your Perfect Trek?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl lg:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Let us create a customized trekking experience just for you. Contact our experts for personalized recommendations and tailored adventures.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">500+</div>
                  <div className="text-purple-200 text-sm">Custom Treks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">10K+</div>
                  <div className="text-purple-200 text-sm">Happy Trekkers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7</div>
                  <div className="text-purple-200 text-sm">Expert Support</div>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 min-w-[200px] justify-center">
                      <span>Contact Us</span>
                      {FiMapPin({ className: "h-5 w-5" })}
                    </button>
                  </motion.div>
                </Link>
                <a href="mailto:support@rapidophilia.com">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-700 transition-all duration-300 flex items-center space-x-2 min-w-[200px] justify-center backdrop-blur-sm">
                      <span>Email Us</span>
                      {FiSearch({ className: "h-5 w-5" })}
                    </button>
                  </motion.div>
                </a>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-12 pt-8 border-t border-white/20"
              >
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-purple-100">
                  <div className="flex items-center space-x-2">
                    {FiMapPin({ className: "h-5 w-5" })}
                    <span>299 Street No 5, Satguru Enclave, Gurugram</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>•</span>
                    <span>support@rapidophilia.com</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Section>
      </div>
    </Layout>
  );
};

export default TrekPage;