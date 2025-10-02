import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { 
  FiStar,
  FiArrowRight,
  FiPlay 
} from 'react-icons/fi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { Layout } from '../components/layout';
import { Section, Card, Button } from '../components/common';
import { featuredTreks, testimonials } from '../data/sampleData';

const HomePage: React.FC = () => {
  const heroImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1515734287656-b7b0e95b6b2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80',
  ];

  const features = [
    {
      icon: '🏔️',
      title: 'Adventure',
      description: 'Explore breathtaking landscapes and push your limits with our expertly guided adventures.',
    },
    {
      icon: '🥾',
      title: 'Trek',
      description: 'Journey through iconic trails and experience the world\'s most spectacular mountain ranges.',
    },
    {
      icon: '🌍',
      title: 'Explore',
      description: 'Discover hidden gems and immerse yourself in diverse cultures around the globe.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section with Image Slider */}
      <section className="relative h-screen overflow-hidden z-0"
        style={{ zIndex: 0 }}
      >
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          loop={true}
          className="h-full"
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <p className="text-purple-200 text-lg mb-4 font-medium">
                  Welcome to Rapidophilia
                </p>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6">
                  Experience the World,
                  <br />
                  <span className="gradient-text">Discover Yourself</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                  Embark on life-changing adventures with expert guides. From challenging treks 
                  to thrilling expeditions, we create unforgettable journeys.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button to="/trek" size="lg" variant="primary">
                    Explore Treks
                    {FiArrowRight({})}
                  </Button>
                  <Button to="/contact" size="lg" variant="outline">
                    Plan Your Trip
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <Section padding="xl" background="gradient">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6"
          >
            Why Choose <span className="gradient-text">Rapidophilia</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We provide world-class adventure experiences with expert guidance, 
            ensuring your safety while creating memories that last a lifetime.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="text-center group"
            >
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-purple-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Popular Treks */}
      <Section padding="xl" background="white">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6"
          >
            Popular <span className="gradient-text">Treks</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover our most sought-after trekking adventures that have transformed 
            thousands of adventurers worldwide.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredTreks.map((trek, index) => (
            <motion.div
              key={trek.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                title={trek.title}
                description={trek.shortDescription}
                image={trek.image}
                price={trek.price}
                rating={trek.rating}
                duration={trek.duration}
                difficulty={trek.difficulty}
                link={`/trek/${trek.id}`}
                buttonText="Explore Trek"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button to="/trek" size="lg" variant="primary">
            View All Treks
            {FiArrowRight({})}
          </Button>
        </motion.div>
      </Section>
      </Section>

      {/* Testimonials */}
      <Section padding="xl" background="gray">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6"
          >
            Adventure <span className="gradient-text">Stories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Hear from adventurers who have experienced the journey of a lifetime with us.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <div className="mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover mb-4"
                />
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm">
                  {testimonial.groupType} • {testimonial.trekJoined}
                </p>
              </div>
              
              <blockquote className="text-gray-700 italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {FiStar({
                      className: `${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`
                    })}
                  </span>
                ))}
              </div>

              {testimonial.videoUrl && (
                <Button variant="ghost" size="sm">
                  {FiPlay({ className: "mr-2" })}
                  Watch Video
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section padding="xl" background="dark">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6"
          >
            Ready for Your Next <span className="gradient-text">Adventure?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of adventurers who have discovered their limits and found themselves 
            in the world's most beautiful places.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button to="/trek" size="lg" variant="primary">
              Book Your Adventure Now
              {FiArrowRight({})}
            </Button>
          </motion.div>
        </div>
      </Section>
    </Layout>
  );
};

export default HomePage;