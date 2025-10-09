import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import CONTACT from '../config/contact';

const destinations = [
  {
    title: 'DISCOVER THE MOST BEAUTIFUL BEACH',
    location: 'Greece',
    days: 10,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    description: 'Crystal-clear waters, white sand beaches, and vibrant island life await you in Greece. Experience the ultimate beach escape.'
  },
  {
    title: 'IMMERSIVE CULTURAL JOURNEY',
    location: 'Machu Picchu, Peru',
    days: 12,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80',
    description: 'Walk the ancient paths of the Incas and immerse yourself in the rich culture and breathtaking landscapes of Peru.'
  },
  {
    title: 'EGYPTIAN EXPEDITION',
    location: 'Cairo, Egypt',
    days: 14,
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80',
    description: 'Explore the mysteries of the pyramids, the Sphinx, and the vibrant city of Cairo on this unforgettable Egyptian adventure.'
  }
];

const ExplorePage: React.FC = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    trek: '',
    people: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ firstName: '', lastName: '', email: '', phone: '', trek: '', people: '' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Section background="gradient" className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-6xl font-extrabold text-white mb-6"
          >
            EXPLORE YOURSELF
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto"
          >
            Rapidophilia Travel Solution Provider offers you the opportunity to "Embrace new adventures and explore uncharted territories, for it is in these moments that you truly discover yourself."<br />
            <span className="block mt-4 font-bold text-white text-2xl">Wanderlust is Calling</span>
          </motion.p>
        </div>
      </Section>

      {/* Destinations Section */}
      <Section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12">
            {destinations.map((dest, idx) => (
              <motion.div
                key={dest.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
              >
                <div className="h-64 w-full overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-purple-600 font-bold">📍</span>
                    <span className="text-sm text-gray-500 font-medium">{dest.location}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{dest.title}</h2>
                  <p className="text-gray-600 mb-4 flex-grow">{dest.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-purple-700 font-bold text-lg">{dest.days} days</span>
                    <Button variant="primary" size="sm">
                      Explore →
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact/Inquiry Section */}
      <Section background="gray" className="py-20">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              {CONTACT.address.split(',').map((line, i) => (
                <span key={i} className={i < 2 ? 'block' : ''}>{line.trim()}{i < 2 && <br />}</span>
              ))}
              <span className="block mt-2"><span className="text-purple-600 mr-2">✉️</span> {CONTACT.email}</span>
            </p>
            <div className="flex items-center space-x-4 text-gray-700">
              <span className="text-purple-600">📞</span>
              <span>{CONTACT.phone}</span>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First name*</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={form.firstName} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={form.lastName} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Planning for which Trek?*</label>
                <select 
                  name="trek" 
                  value={form.trek} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select Trek</option>
                  <option value="Nag Tibba, Dehradun - 1N/2D">Nag Tibba, Dehradun - 1N/2D</option>
                  <option value="Kheerganga, Himachal - 2N/3D">Kheerganga, Himachal - 2N/3D</option>
                  <option value="Hampta Pass, Himachal - 4N/5D">Hampta Pass, Himachal - 4N/5D</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">How many people?*</label>
                <input 
                  type="number" 
                  name="people" 
                  value={form.people} 
                  onChange={handleChange} 
                  required 
                  min={1} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" 
                />
              </div>
              <Button type="submit" variant="primary" className="w-full py-3 text-lg">
                Submit
              </Button>
              {submitted && (
                <div className="text-green-600 font-medium mt-2">
                  Thank you! Your inquiry has been submitted.
                </div>
              )}
            </form>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default ExplorePage;
