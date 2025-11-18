export interface ClimateDestination {
  id: string;
  name: string;
  continent: string;
  climateFact: string;
  description: string;
  image: string;
  coordinates: { x: number; y: number };
  color: string;
}

export const climateDestinations: ClimateDestination[] = [
  {
    id: 'indonesia',
    name: 'Indonesia',
    continent: 'Asia',
    climateFact: 'Jakarta is literally sinking at a rate of 25cm per year, and deforestation adds tons of CO₂ to the atmosphere, altering global carbon cycles.',
    description: 'You\'re an unpredictable firecracker of a traveler. Jungle hikes? Yes. City chaos? Double yes. But Indonesia\'s experiencing wild climate extremes—from flooding to dangerous heatwaves.',
    image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { x: 78, y: 50 },
    color: '#FF6B35'
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    continent: 'Antarctica',
    climateFact: '2023 hit record-low sea ice levels, and destabilizing ice shelves could trigger massive global sea level rise affecting coastlines worldwide.',
    description: 'You\'re mysterious, intense, and love chasing extremes. You want nature raw, unfiltered, and spiritual. No, you\'re not booking a flight tomorrow (unless you\'re a penguin), but it\'s the perfect metaphor.',
    image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { x: 50, y: 85 },
    color: '#E3F2FD'
  },
  {
    id: 'france',
    name: 'France',
    continent: 'Europe',
    climateFact: 'The 2022 heatwave broke records with temperatures reaching 48°C in some areas. Wine regions are scrambling to adapt, and forests are catching fire.',
    description: 'You want art, cheese, and soul. You\'re a poetic soul with a suitcase full of dreams. Seems chill, right? Think again.',
    image: 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { x: 45, y: 30 },
    color: '#FFE0B2'
  },
  {
    id: 'zambia',
    name: 'Zambia',
    continent: 'Africa',
    climateFact: 'Zambia is battling severe droughts due to shifting rainfall patterns. Agriculture (their lifeline) is struggling, and water shortages are hitting communities hard.',
    description: 'You\'re earthy, calm, and love going off-grid. You\'re the kind of traveler who seeks meaning in stillness and connection to land. It\'s gorgeous, under-hyped, and full of natural beauty.',
    image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { x: 52, y: 60 },
    color: '#C8E6C9'
  },
  {
    id: 'india',
    name: 'India',
    continent: 'Asia',
    climateFact: 'The Ganges River, lifeline to 400 million people, is shrinking. Himalayan glaciers feeding it are melting faster than ever due to rising temperatures.',
    description: 'You\'re full of life, contradictions, and cosmic energy. You love the noise and beauty of a good storm. One foot in tradition, the other chasing innovation. A spicy mix of chaos and calm.',
    image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800',
    coordinates: { x: 72, y: 42 },
    color: '#FFF3E0'
  }
];

export interface ClimateQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    destinationId: string;
    points: number;
  }[];
}

export const climateQuestions: ClimateQuestion[] = [
  {
    id: 1,
    question: "Pick a random travel item to pack for no reason:",
    options: [
      { text: "A mini fan you never use", destinationId: "zambia", points: 3 },
      { text: "A penguin plushie", destinationId: "antarctica", points: 3 },
      { text: "A raincoat even though it's \"not supposed to rain\"", destinationId: "indonesia", points: 3 },
      { text: "Flip-flops... for snow", destinationId: "france", points: 3 }
    ]
  },
  {
    id: 2,
    question: "Pick your travel soundtrack:",
    options: [
      { text: "Nature sounds + lo-fi beats", destinationId: "zambia", points: 2 },
      { text: "Something dramatic and orchestral. I am the main character.", destinationId: "antarctica", points: 2 },
      { text: "Random.. I don't like restriction", destinationId: "indonesia", points: 2 },
      { text: "Complete silence so you can absorb the ✨vibe✨", destinationId: "france", points: 2 }
    ]
  },
  {
    id: 3,
    question: "Your travel personality is:",
    options: [
      { text: "Chill explorer - I'm going where the wind blows", destinationId: "zambia", points: 2 },
      { text: "Influencer - I want pretty pics for my IG", destinationId: "france", points: 2 },
      { text: "Strict planner - We need to finish the food in 10min!", destinationId: "antarctica", points: 2 },
      { text: "Sloth - I'm sleeping through. Wake me when dinner's here", destinationId: "indonesia", points: 2 }
    ]
  },
  {
    id: 4,
    question: "What's your ideal vacation food?",
    options: [
      { text: "Local as it gets!", destinationId: "india", points: 3 },
      { text: "C'mon food isn't the main part!", destinationId: "antarctica", points: 2 },
      { text: "Desserts - I have a sweet tooth!", destinationId: "france", points: 2 },
      { text: "Trendy, I don't mind queuing hours!", destinationId: "indonesia", points: 2 }
    ]
  },
  {
    id: 5,
    question: "If you could wake up anywhere tomorrow, where would it be?",
    options: [
      { text: "Somewhere quiet", destinationId: "zambia", points: 2 },
      { text: "3000 years into the future", destinationId: "india", points: 2 },
      { text: "Somewhere extreme and wild—volcanoes, icebergs", destinationId: "antarctica", points: 3 },
      { text: "A surreal dream-like place", destinationId: "france", points: 2 }
    ]
  }
];