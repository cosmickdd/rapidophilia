import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is included in the Nag Tibba trek package?",
    answer: "The package includes transportation from Delhi to Pantwari and back, all vegetarian meals, tented accommodation, experienced guide, safety equipment, first aid kit, and evening tea & snacks at base camp."
  },
  {
    id: 2,
    question: "What is the best time to plan the Nag Tibba trek?",
    answer: "The best time for the Nag Tibba trek is from October to March, when the weather is pleasant, skies are clear, and snow is visible during winter months."
  },
  {
    id: 3,
    question: "What type of accommodation is provided?",
    answer: "We provide high-quality camping tents with comfortable sleeping bags, mats, and pillows. Tents are shared on double/triple occupancy basis with separate arrangements for men and women."
  },
  {
    id: 4,
    question: "What meals are included in the trek?",
    answer: "Meals are provided from Day 1 (Friday dinner) through Day 3 (Sunday lunch). Expect fresh, wholesome vegetarian meals—breakfasts, packed lunches, hot dinners—and evening tea & snacks prepared by our experienced camp cooks. If you have dietary restrictions, let us know in advance and we'll do our best to accommodate them."
  },
  {
    id: 5,
    question: "Is the Nag Tibba trek suitable for beginners?",
    answer: "Yes, it's one of the best beginner-friendly treks with moderate difficulty. The trail is well-marked and our experienced guides ensure your safety throughout the journey."
  },
  {
    id: 6,
    question: "What safety measures are included?",
    answer: "We provide experienced local guides, first aid kit, safety equipment, emergency communication devices, and have tie-ups with local rescue teams. All guides are trained in basic mountaineering and first aid."
  },
  {
    id: 7,
    question: "What should I carry for the trek?",
    answer: "Essential items include warm clothes, rain jacket, trekking shoes, water bottle, torch/headlamp, personal medicines, and toiletries. We provide a detailed packing list after booking."
  },
  {
    id: 8,
    question: "How should I prepare for the trek?",
    answer: "Start with light jogging, stretching, and regular walking practice for at least 2 weeks before the trek. Focus on building stamina and leg strength. Avoid alcohol and smoking before the trek."
  },
  {
    id: 9,
    question: "What is the altitude and difficulty level?",
    answer: "The Nag Tibba summit stands at 9,915 feet (3,022 meters) above sea level. It's rated as an easy to moderate trek, perfect for beginners and experienced trekkers alike."
  },
  {
    id: 10,
    question: "What activities are included in the trek?",
    answer: "The trek includes summit climbing, campfire sessions, stargazing, photography opportunities, nature walks, and cultural interaction with local villagers."
  },
  {
    id: 11,
    question: "What is the weather like during the trek?",
    answer: "Days are usually pleasant (10–15°C), while nights can drop to 0–5°C, especially during winters. Weather can change quickly in mountains, so we recommend layered clothing."
  },
  {
    id: 12,
    question: "What transportation is provided?",
    answer: "We provide comfortable transport from Delhi (Kashmere Gate) to Pantwari base camp and back. The journey includes overnight travel with designated stops for meals and rest."
  },
  {
    id: 13,
    question: "Is there snow during the trek?",
    answer: "Yes, you can find snow between December and March, making it a spectacular winter trek. The snowy landscape offers breathtaking views and great photography opportunities."
  },
  {
    id: 14,
    question: "What gear and equipment is provided?",
    answer: "We provide tents, sleeping bags, mats, cooking equipment, first aid kit, and safety gear. You need to bring personal items like clothes, shoes, and toiletries."
  },
  {
    id: 15,
    question: "Can the trek be done in winter?",
    answer: "Absolutely! Winter treks (December-March) are popular for their snowy trails, crisp mountain air, and stunning snow-capped views. We provide additional winter gear during this season."
  },
  {
    id: 16,
    question: "What other treks does Trekking Peaks offer?",
    answer: "We offer various Himalayan treks including Kedarkantha, Dayara Bugyal, Har Ki Dun, Valley of Flowers, Brahmatal, and many more across different difficulty levels."
  }
];

const FAQAccordionItem: React.FC<{ faq: FAQItem; isOpen: boolean; onToggle: () => void }> = ({
  faq,
  isOpen,
  onToggle
}) => {
  return (
    <motion.div
      initial={false}
      className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen 
          ? 'bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-lg border border-blue-200/60' 
          : 'bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200/60 hover:border-blue-200/60 hover:shadow-md'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-200"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-base lg:text-lg pr-6 leading-relaxed transition-colors duration-200 ${
          isOpen ? 'text-gray-800' : 'text-gray-700 group-hover:text-gray-800'
        }`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-blue-100 border-2 border-blue-300' 
              : 'bg-gray-100 border-2 border-gray-200 group-hover:bg-blue-50 group-hover:border-blue-200'
          }`}>
            <svg 
              className={`w-4 h-4 transition-colors duration-300 ${
                isOpen ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-500'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="border-t border-blue-200/40 pt-5">
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg font-light">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    const newOpenItems = new Set<number>();
    if (!openItems.has(id)) {
      // Close all others and open this one
      newOpenItems.add(id);
    }
    // If clicking on already open item, close it (newOpenItems remains empty)
    setOpenItems(newOpenItems);
  };

  // Split FAQs into two columns for desktop
  const leftColumnFAQs = faqData.filter((_, index) => index % 2 === 0);
  const rightColumnFAQs = faqData.filter((_, index) => index % 2 === 1);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="space-y-6 lg:space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold shadow-sm"
            >
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ Section
            </motion.div>
            
            {/* Main Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl lg:text-6xl xl:text-7xl font-extrabold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent leading-tight tracking-tight"
            >
              Everything You Need
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                To Know
              </span>
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Get instant answers to the most common questions about your
              <span className="font-semibold text-gray-800"> Nag Tibba Trek adventure</span>
            </motion.p>
            
            {/* Enhanced Divider */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center justify-center space-x-3 mt-8"
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-sm"></div>
              <div className="w-24 h-px bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-sm"></div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </motion.div>
            
            {/* Quick stats removed as requested */}
          </div>
        </motion.div>

        {/* FAQ Content */}
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Single Column */}
          <div className="lg:hidden space-y-5">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <FAQAccordionItem
                  faq={faq}
                  isOpen={openItems.has(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* Desktop: Two Columns */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Left Column */}
            <div className="space-y-5">
              {leftColumnFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                >
                  <FAQAccordionItem
                    faq={faq}
                    isOpen={openItems.has(faq.id)}
                    onToggle={() => toggleItem(faq.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              {rightColumnFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                >
                  <FAQAccordionItem
                    faq={faq}
                    isOpen={openItems.has(faq.id)}
                    onToggle={() => toggleItem(faq.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto border border-blue-100/60 shadow-xl backdrop-blur-sm overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-transparent rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-200 to-transparent rounded-full opacity-20 translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="mb-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    // try smooth scroll then dispatch event for pages that listen
                    const el = document.getElementById('booking') || document.getElementById('tabpanel-booking');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.dispatchEvent(new CustomEvent('scroll-to-booking'));
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition"
                >
                  Book Now
                </button>
              </div>
              <h3 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-8 lg:mb-10 leading-relaxed text-lg lg:text-xl font-light max-w-2xl mx-auto">
                Our trekking experts are here to help you plan the perfect adventure. Get in touch with us for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
                <a
                  href="tel:+919911192050"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
                >
                  <svg className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us Now
                </a>
                <a
                  href="https://wa.me/919911192050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
                >
                  <svg className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;