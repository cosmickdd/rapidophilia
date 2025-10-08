import { Trek, Adventure, Testimonial, BlogPost } from '../types';

export const featuredTreks: Trek[] = [
  {
    id: '1',
    title: 'Hike Through The Majestic Himalayas - Kheerganga',
    description: 'Experience a magical journey through dense forests, hot springs, and stunning mountain views. Kheerganga is perfect for beginners looking to explore the beauty of Himachal Pradesh.',
    shortDescription: 'A perfect beginner trek with hot springs and scenic beauty.',
    location: 'Kasol, Himachal Pradesh',
    duration: '2 days',
    price: 1299,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [],
    inclusions: ['Accommodation', 'Meals', 'Local Guide', 'Forest Permits'],
    exclusions: ['Transportation to Kasol', 'Personal expenses', 'Hot spring entry fee'],
    itinerary: [
      {
        day: 1,
        title: 'Kasol to Kheerganga Base',
        description: 'Trek through pine forests and reach the base camp',
        highlights: ['Forest trekking', 'River crossing', 'Camp setup'],
        meals: ['Lunch', 'Dinner'],
        accommodation: 'Camping'
      },
      {
        day: 2,
        title: 'Kheerganga Summit & Return',
        description: 'Reach the hot springs and return to Kasol',
        highlights: ['Summit trek', 'Hot springs visit', 'Descent'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'None'
      }
    ],
    bestTimeToVisit: 'March-June, September-November',
    maxGroupSize: 15,
    rating: 4.6,
    reviews: [],
    earlyBirdDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    limitedSeats: 15,
    seatsRemaining: 3
  },
  {
    id: '2',
    title: 'Trek To The Highest Peak Of Lower Himalayas - Nag Tibba',
    description: 'Discover the crown jewel of lower Himalayas with panoramic views of major peaks including Swargarohini, Bandarpoonch, and Kedarnath ranges.',
    shortDescription: 'Summit the highest peak in lower Himalayas with spectacular 360° views.',
    location: 'Dehradun, Uttarakhand',
    duration: '2 days',
    price: 1999,
    originalPrice: 3000,
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [],
  inclusions: ['Accommodation', 'All meals and evening snacks provided: Day 1 (Friday) Dinner → Day 3 (Sunday) Lunch', 'Certified Guide', 'Forest Permits'],
    exclusions: ['Transportation to base', 'Personal gear', 'Insurance'],
    itinerary: [
      {
        day: 1,
        title: 'Dehradun to Nag Tibba Base',
        description: 'Journey to base camp through scenic mountain roads',
        highlights: ['Drive to base', 'Acclimatization', 'Base camp setup'],
        meals: ['Lunch', 'Dinner'],
        accommodation: 'Camping'
      },
      {
        day: 2,
        title: 'Summit & Return',
        description: 'Early morning summit push with return to Dehradun',
        highlights: ['Pre-dawn start', 'Summit climb', 'Descent & return'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'None'
      }
    ],
    bestTimeToVisit: 'October-March, April-June',
    maxGroupSize: 12,
    rating: 4.8,
    reviews: [],
    earlyBirdDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    limitedSeats: 12,
    seatsRemaining: 2
  },
  {
    id: '3',
    title: 'Trek To One Of The Most Dramatic Terrains Of Himalayas - Hampta Pass With Chandratal Lake',
    description: 'Experience the dramatic contrast from lush green valleys of Kullu to the barren landscapes of Spiti, combined with the pristine beauty of Chandratal Lake.',
    shortDescription: 'A dramatic terrain change trek featuring the stunning Chandratal Lake.',
    location: 'Manali, Himachal Pradesh',
    duration: '5 days',
    price: 8999,
    difficulty: 'Challenging',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [],
  inclusions: ['All Accommodation', 'All meals and evening snacks provided: Day 1 (Friday) Dinner → Day 3 (Sunday) Lunch', 'Certified Guide', 'Permits & Fees', 'Transportation'],
    exclusions: ['Personal trekking gear', 'Travel insurance', 'Personal expenses'],
    itinerary: [
      {
        day: 1,
        title: 'Manali to Jobra Base',
        description: 'Drive to Jobra and begin trek to Chika',
        highlights: ['Drive through Prini village', 'Trek to Chika campsite', 'Acclimatization'],
        meals: ['Lunch', 'Dinner'],
        accommodation: 'Camping'
      },
      {
        day: 2,
        title: 'Chika to Balu Ka Ghera',
        description: 'Trek through alpine meadows to Balu Ka Ghera',
        highlights: ['Alpine meadows', 'River crossings', 'Mountain views'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Camping'
      },
      {
        day: 3,
        title: 'Hampta Pass to Spiti Valley',
        description: 'Cross Hampta Pass and descend to dramatic Spiti landscape',
        highlights: ['Hampta Pass crossing', 'Terrain transition', 'Spiti valley views'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Camping'
      },
      {
        day: 4,
        title: 'Chandratal Lake',
        description: 'Visit the pristine Chandratal Lake and return',
        highlights: ['Chandratal Lake', 'Photography', 'Moon lake experience'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Camping'
      },
      {
        day: 5,
        title: 'Return to Manali',
        description: 'Return journey to Manali via Rohtang Pass',
        highlights: ['Rohtang Pass', 'Return journey', 'Trip completion'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: 'None'
      }
    ],
    bestTimeToVisit: 'June-September',
    maxGroupSize: 10,
    rating: 4.9,
    reviews: []
  },
  {
    id: '4',
    title: 'Patagonia W Trek',
    description: 'Explore the dramatic landscapes of Patagonia\'s Torres del Paine. This trek offers stunning granite peaks, pristine lakes, and unique wildlife.',
    shortDescription: 'Experience the wild beauty of Patagonian landscapes.',
    location: 'Chile, Patagonia',
    duration: '5 days',
    price: 1299,
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1515734287656-b7b0e95b6b2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80',
    gallery: [],
    inclusions: ['Accommodation', 'Meals', 'Guide'],
    exclusions: ['Flights', 'Park fees', 'Personal expenses'],
    itinerary: [],
    bestTimeToVisit: 'October-April',
    maxGroupSize: 8,
    rating: 4.6,
    reviews: [],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    groupType: 'Solo',
    trekJoined: 'Everest Base Camp Trek',
    quote: 'This was the adventure of a lifetime! The guides were incredible and the views were absolutely breathtaking. I pushed my limits and discovered strength I never knew I had.',
    rating: 5,
    videoUrl: '#',
  },
  {
    id: '2',
    name: 'Mike Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    groupType: 'Group',
    trekJoined: 'Annapurna Circuit Trek',
    quote: 'Amazing organization and support throughout the trek. The team made sure everyone felt safe and had an incredible experience. Highly recommended!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emma & David',
    image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=723&q=80',
    groupType: 'Couple',
    trekJoined: 'Patagonia W Trek',
    quote: 'Perfect honeymoon adventure! The landscapes were stunning and the experience brought us even closer together. Thank you for making our dream trip a reality.',
    rating: 5,
  },
];

export const featuredAdventures: Adventure[] = [
  {
    id: '1',
    title: 'Hike The Inca Trail To Machu Picchu',
    description: 'Follow the ancient footsteps of the Incas on this legendary trail through cloud forests, mountain passes, and archaeological wonders, culminating at the breathtaking Machu Picchu.',
    shortDescription: 'Trek the legendary Inca Trail to the ancient citadel of Machu Picchu.',
    category: 'Cultural Trek',
    location: 'Peru, South America',
    duration: '8 days',
    price: 15999,
    difficulty: 'Challenging',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [],
    inclusions: ['All permits', 'Professional guide', 'Porter service', 'Meals during trek', 'Camping equipment'],
    exclusions: ['International flights', 'Travel insurance', 'Personal gear', 'Tips'],
    equipment: ['Hiking boots', 'Sleeping bag', 'Trekking poles', 'Rain gear', 'Headlamp'],
    highlights: [
      'Visit the iconic Machu Picchu at sunrise',
      'Trek through ancient Inca archaeological sites',
      'Experience diverse ecosystems from cloud forest to alpine tundra',
      'Learn about Inca history and culture from expert guides',
      'Camp under starlit Andean skies'
    ],
    itinerary: [
      {
        title: 'Day 1: Arrival in Cusco',
        description: 'Arrive in Cusco and acclimatize to the altitude. City tour and preparation for the trek.'
      },
      {
        title: 'Day 2: Sacred Valley Tour',
        description: 'Explore the Sacred Valley, visit local markets and archaeological sites.'
      },
      {
        title: 'Day 3: Wayllabamba Camp',
        description: 'Start the Inca Trail trek, hike to Wayllabamba camp through beautiful landscapes.'
      },
      {
        title: 'Day 4: Dead Woman\'s Pass',
        description: 'Cross the challenging Dead Woman\'s Pass (4,215m), the highest point of the trek.'
      },
      {
        title: 'Day 5: Wiñay Wayna',
        description: 'Visit ancient Inca ruins and camp near the spectacular Wiñay Wayna site.'
      },
      {
        title: 'Day 6: Machu Picchu Sunrise',
        description: 'Early morning hike to Machu Picchu for sunrise, guided tour of the citadel.'
      },
      {
        title: 'Day 7: Aguas Calientes',
        description: 'Explore Aguas Calientes town, optional second visit to Machu Picchu.'
      },
      {
        title: 'Day 8: Return to Cusco',
        description: 'Train journey back to Cusco and transfer to hotel.'
      }
    ],
    bestTimeToVisit: 'May-September (dry season)',
    maxGroupSize: 12,
    rating: 4.9,
    reviews: []
  },
  {
    id: '2',
    title: 'Explore The Wildlife In The Amazon Rainforest',
    description: 'Immerse yourself in the world\'s most biodiverse ecosystem. Spot exotic wildlife, learn from indigenous guides, and experience the magic of the Amazon rainforest.',
    shortDescription: 'Discover incredible wildlife and pristine nature in the Amazon.',
    category: 'Wildlife Safari',
    location: 'Amazon, Brazil',
    duration: '10 days',
    price: 18999,
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [],
  inclusions: ['Jungle lodge accommodation', 'All meals and evening snacks provided: Day 1 (Friday) Dinner → Day 3 (Sunday) Lunch', 'Expert naturalist guide', 'Boat transportation', 'Wildlife viewing equipment'],
    exclusions: ['International flights', 'Travel insurance', 'Alcoholic beverages', 'Personal expenses'],
    equipment: ['Lightweight clothing', 'Rain poncho', 'Insect repellent', 'Binoculars', 'Waterproof bags'],
    highlights: [
      'Spot jaguars, sloths, and exotic birds',
      'Navigate the Amazon River by traditional canoe',
      'Learn from indigenous communities',
      'Experience night sounds of the rainforest',
      'Discover medicinal plants and their uses'
    ],
    itinerary: [
      {
        title: 'Day 1: Arrival in Manaus',
        description: 'Fly to Manaus, transfer to jungle lodge, orientation and evening wildlife spotting.'
      },
      {
        title: 'Day 2-3: Rio Negro Exploration',
        description: 'Explore tributaries of Rio Negro, search for pink dolphins and caimans.'
      },
      {
        title: 'Day 4-5: Indigenous Community Visit',
        description: 'Visit local communities, learn traditional skills and sustainable practices.'
      },
      {
        title: 'Day 6-7: Deep Jungle Trek',
        description: 'Multi-day jungle trek to remote areas, camping in the forest.'
      },
      {
        title: 'Day 8: Canopy Walk',
        description: 'Experience the rainforest from above on suspended walkways.'
      },
      {
        title: 'Day 9: Wildlife Photography',
        description: 'Focus on wildlife photography with expert guidance.'
      },
      {
        title: 'Day 10: Departure',
        description: 'Morning birdwatching, return to Manaus for departure.'
      }
    ],
    bestTimeToVisit: 'June-November (dry season)',
    maxGroupSize: 8,
    rating: 4.8,
    reviews: []
  },
  {
    id: '3',
    title: 'Discover Ancient Cultural Sites In Japan',
    description: 'Journey through Japan\'s rich cultural heritage, visiting ancient temples, traditional villages, and experiencing authentic Japanese culture in Tokyo, Kyoto, and Osaka.',
    shortDescription: 'Explore Japan\'s ancient temples, culture, and modern cities.',
    category: 'Cultural Experience',
    location: 'Tokyo, Kyoto, Osaka',
    duration: '7 days',
    price: 12999,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [],
    inclusions: ['Accommodation (traditional & modern)', 'Cultural guide', 'Temple entrance fees', 'Transportation between cities', 'Traditional meals'],
    exclusions: ['International flights', 'Travel insurance', 'Personal shopping', 'Optional activities'],
    equipment: ['Comfortable walking shoes', 'Camera', 'Respectful clothing', 'Small backpack', 'Weather protection'],
    highlights: [
      'Visit iconic temples in Kyoto and Nara',
      'Experience traditional tea ceremony',
      'Stay in authentic ryokan (traditional inn)',
      'Explore bustling Tokyo neighborhoods',
      'Learn calligraphy and origami'
    ],
    itinerary: [
      {
        title: 'Day 1: Arrival in Tokyo',
        description: 'Arrive in Tokyo, check into hotel, explore Shibuya and Harajuku districts.'
      },
      {
        title: 'Day 2: Traditional Tokyo',
        description: 'Visit Senso-ji Temple, traditional Asakusa district, and enjoy sumo demonstration.'
      },
      {
        title: 'Day 3: Travel to Kyoto',
        description: 'Bullet train to Kyoto, visit Fushimi Inari Shrine with thousands of torii gates.'
      },
      {
        title: 'Day 4: Kyoto Temples',
        description: 'Explore Kinkaku-ji (Golden Pavilion) and Gion district, tea ceremony experience.'
      },
      {
        title: 'Day 5: Nara Day Trip',
        description: 'Visit Nara deer park and Todai-ji Temple with giant Buddha statue.'
      },
      {
        title: 'Day 6: Osaka Castle',
        description: 'Travel to Osaka, explore the historic castle and enjoy local street food.'
      },
      {
        title: 'Day 7: Departure',
        description: 'Last-minute shopping in Osaka, departure from Kansai Airport.'
      }
    ],
    bestTimeToVisit: 'March-May, September-November',
    maxGroupSize: 15,
    rating: 4.7,
    reviews: []
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Essential Gear for High-Altitude Trekking',
    slug: 'essential-gear-high-altitude-trekking',
    content: 'Complete guide to essential gear...',
    excerpt: 'Discover the must-have equipment for safe and comfortable high-altitude adventures.',
    author: 'Alex Thompson',
    date: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Gear Guide',
    tags: ['trekking', 'gear', 'high-altitude'],
    readTime: 8,
    featured: true,
  },
  {
    id: '2',
    title: 'Training for Your First Himalayan Trek',
    slug: 'training-first-himalayan-trek',
    content: 'Complete training guide...',
    excerpt: 'Prepare your body and mind for the challenge of Himalayan trekking with our comprehensive training guide.',
    author: 'Maria Rodriguez',
    date: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Training',
    tags: ['training', 'fitness', 'himalayas'],
    readTime: 12,
    featured: false,
  },
];