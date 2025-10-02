import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Hero from '../components/common/Hero';
import Section from '../components/common/Section';
import Card from '../components/common/Card';
import { 
  FiHeart, 
  FiGlobe, 
  FiUsers, 
  FiTrendingUp
} from 'react-icons/fi';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: FiHeart,
      title: 'Passion for Adventure',
      description: 'We believe in the transformative power of travel and adventure. Every journey is designed to create unforgettable memories.'
    },
    {
      icon: FiGlobe,
      title: 'Accessible Travel',
      description: 'Making travel affordable for everyone - students, workers, dreamers. We believe everyone deserves to explore the world.'
    },
    {
      icon: FiUsers,
      title: 'Community Focused',
      description: 'Building a community of travelers who share experiences, stories, and create lasting friendships along the way.'
    },
    {
      icon: FiTrendingUp,
      title: 'Rapid Growth',
      description: 'As India\'s fastest-growing multi-day holiday package brand, we\'re constantly evolving to serve you better.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Travelers' },
    { number: '500+', label: 'Destinations' },
    { number: '50+', label: 'Countries' },
    { number: '5', label: 'Years Experience' }
  ];

  const team = [
    {
      name: 'Rahul Sharma',
      role: 'Founder & CEO',
      image: '/api/placeholder/300/300',
      description: 'Adventure enthusiast with 10+ years in travel industry.'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Operations',
      image: '/api/placeholder/300/300',
      description: 'Expert in logistics and customer experience management.'
    },
    {
      name: 'Arjun Kumar',
      role: 'Lead Travel Designer',
      image: '/api/placeholder/300/300',
      description: 'Creates unique itineraries for unforgettable experiences.'
    },
    {
      name: 'Sneha Gupta',
      role: 'Community Manager',
      image: '/api/placeholder/300/300',
      description: 'Building bridges between travelers and local communities.'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="About Rapidophilia"
        subtitle="More than a company - it's an experience that helps you explore yourself"
        backgroundImage="https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />

      {/* Main Content */}
      <Section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Rapidophilia is not a company, it's an experience indeed. It gives you a chance to explore yourself. 
                  Our vision is to make travel so inexpensive that students, workers or anyone can afford it and they can live their own dreams.
                </p>
                
                <blockquote className="border-l-4 border-purple-600 pl-6 py-4 bg-purple-50 rounded-r-lg">
                  <p className="text-xl italic text-purple-800 mb-2">
                    "The world is a book, and those who do not travel read only a page."
                  </p>
                  <cite className="text-purple-600 font-semibold">— St. Augustine</cite>
                </blockquote>

                <p>
                  Rapidophilia means "love for things moving at a high speed," combining the English word "rapid" 
                  (happening very quickly) with the ancient Greek word "philia" (love). It is also the name of an 
                  Indian travel platform that as an adventure-focused company and evolving into India's very fast 
                  growing multi-day holiday package brand.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Mountain Adventure"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Word Breakdown Section */}
      <Section background="gray" className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Breaking Down the Word
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the meaning behind our name and philosophy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card title="Rapid" className="h-full text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {FiTrendingUp({ className: "text-white text-2xl" })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rapid</h3>
                <p className="text-gray-700 leading-relaxed">
                  Refers to a series of high-speed repeated motions, adventures or excitement happening quickly through the body. 
                  The thrill of fast-paced experiences and dynamic adventures.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card title="Philia" className="h-full text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {FiHeart({ className: "text-white text-2xl" })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Philia (φιλία)</h3>
                <p className="text-gray-700 leading-relaxed">
                  An ancient Greek word meaning "love". The deep affection and passion for adventure, 
                  travel, and the connections we make along the way.
                </p>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-16"
          >
            <div className="inline-block bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-full text-xl font-bold">
              Raftaar Se Pyaar ❤️
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Mission & Values */}
      <Section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rapidophilia helps travelers discover, customize, and book tours and activities, 
              offering curated itineraries for both domestic and international travel.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card title={value.title} className="h-full text-center p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {value.icon({ className: "text-white text-xl" })}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section background="gray" className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that speak to our growing community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind your unforgettable adventures
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card title={member.name} className="h-full text-center p-6">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + index}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80`}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="dark" className="py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered their passion for adventure with Rapidophilia.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              Explore Our Adventures
            </motion.button>
          </motion.div>
        </div>
      </Section>
    </div>
    </Layout>
  );
};

export default AboutPage;