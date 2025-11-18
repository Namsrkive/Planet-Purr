import React, { useState, useEffect } from 'react';
import { ArrowLeft, Globe, Thermometer, Droplets, Wind } from 'lucide-react';

interface ClimateGameEntryProps {
  onStart: () => void;
  onBack: () => void;
}

const ClimateGameEntry: React.FC<ClimateGameEntryProps> = ({ onStart, onBack }) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  
  const climateIcons = ['🌍', '🌡️', '🌊', '🏔️', '🌴', '🏜️', '❄️', '🌪️'];
  const regions = [
    { id: 'indonesia', name: 'Indonesia', x: 78, y: 50, size: 'medium' },
    { id: 'antarctica', name: 'Antarctica', x: 50, y: 85, size: 'large' },
    { id: 'france', name: 'France', x: 45, y: 30, size: 'small' },
    { id: 'zambia', name: 'Zambia', x: 52, y: 60, size: 'medium' },
    { id: 'india', name: 'India', x: 72, y: 42, size: 'medium' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % climateIcons.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen gelato-bg flex items-center justify-center p-4">
      {/* Floating climate elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl animate-float-dreamy opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 5}s`
            }}
          >
            {climateIcons[Math.floor(Math.random() * climateIcons.length)]}
          </div>
        ))}
      </div>

      <div className="entry-dialog max-w-4xl w-full p-10 text-center relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 text-purple-700 hover:text-purple-800 transition-colors duration-200 gelato-text"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="text-6xl mb-4 cute-animal">
            {climateIcons[currentIcon]}
          </div>
          <h1 className="text-4xl font-bold text-purple-900 mb-3 gelato-text">
            🌎✨ Where Should You Travel Next?
          </h1>
          <h2 className="text-2xl text-purple-700 gelato-text mb-4">
            (According to Your Vibes) - SDG 13: Climate Action
          </h2>
          <p className="text-purple-600 text-lg leading-relaxed gelato-text mb-6">
            Take this fun travel personality quiz to discover your next destination! 
            But here's the twist - learn about real climate impacts affecting these amazing places.
          </p>
        </div>

        {/* Interactive World Map */}
        <div className="mb-8 relative">
          <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 border-4 border-purple-300 relative overflow-hidden">
            <h3 className="text-xl font-bold text-purple-800 mb-4 gelato-text">
              🗺️ Your Potential Travel Destinations
            </h3>
            
            {/* Simplified World Map Background */}
            <div className="relative w-full h-64 bg-gradient-to-b from-sky-200 to-blue-300 rounded-xl border-2 border-blue-400 overflow-hidden">
              {/* Continents as simple shapes */}
              <div className="absolute inset-0">
                {/* North America */}
                <div className="absolute w-20 h-16 bg-green-300 rounded-lg" style={{ left: '15%', top: '20%' }}></div>
                {/* South America */}
                <div className="absolute w-12 h-20 bg-green-400 rounded-lg" style={{ left: '22%', top: '45%' }}></div>
                {/* Europe */}
                <div className="absolute w-8 h-8 bg-green-300 rounded" style={{ left: '45%', top: '25%' }}></div>
                {/* Africa */}
                <div className="absolute w-12 h-18 bg-yellow-300 rounded-lg" style={{ left: '42%', top: '35%' }}></div>
                {/* Asia */}
                <div className="absolute w-24 h-16 bg-green-300 rounded-lg" style={{ left: '60%', top: '25%' }}></div>
                {/* Australia */}
                <div className="absolute w-10 h-8 bg-orange-300 rounded-lg" style={{ left: '75%', top: '65%' }}></div>
                {/* Antarctica */}
                <div className="absolute w-32 h-8 bg-white rounded-lg border-2 border-blue-200" style={{ left: '35%', top: '85%' }}></div>
              </div>

              {/* Climate Hotspot Markers */}
              {regions.map((region) => (
                <div
                  key={region.id}
                  className={`absolute cursor-pointer transition-all duration-300 ${
                    region.size === 'large' ? 'w-6 h-6' : region.size === 'medium' ? 'w-4 h-4' : 'w-3 h-3'
                  } ${
                    hoveredRegion === region.id ? 'scale-150 z-20' : 'scale-100 z-10'
                  }`}
                  style={{ 
                    left: `${region.x}%`, 
                    top: `${region.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  <div className={`w-full h-full rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold ${
                    region.id === 'antarctica'
                      ? 'bg-blue-500 text-white' 
                      : region.id === 'france'
                      ? 'bg-purple-500 text-white'
                      : region.id === 'zambia'
                      ? 'bg-green-500 text-white'
                      : region.id === 'indonesia'
                      ? 'bg-orange-500 text-white'
                      : region.id === 'india'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {region.id === 'antarctica' ? '🐧' 
                     : region.id === 'france' ? '🥐'
                     : region.id === 'zambia' ? '🦁'
                     : region.id === 'indonesia' ? '🌋'
                     : region.id === 'india' ? '🕌'
                     : '✈️'}
                  </div>
                  
                  {hoveredRegion === region.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white border-2 border-purple-400 rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
                      <div className="text-purple-800 font-bold text-sm gelato-text">{region.name}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-400"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 border-3 border-purple-200 rounded-xl p-4">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-purple-600 gelato-text font-medium">5 Fun Questions</p>
            <p className="text-purple-500 gelato-text text-sm">About your travel vibes</p>
          </div>
          <div className="bg-purple-50 border-3 border-purple-200 rounded-xl p-4">
            <div className="text-3xl mb-2">🌍</div>
            <p className="text-purple-600 gelato-text font-medium">5 Destinations</p>
            <p className="text-purple-500 gelato-text text-sm">Amazing places with climate stories</p>
          </div>
          <div className="bg-purple-50 border-3 border-purple-200 rounded-xl p-4">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-purple-600 gelato-text font-medium">Reality Check</p>
            <p className="text-purple-500 gelato-text text-sm">Climate impacts on your destination</p>
          </div>
        </div>

        {/* Climate Action Message */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-3 border-green-300 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Thermometer className="w-6 h-6 text-red-500" />
            <Globe className="w-6 h-6 text-blue-500" />
            <Wind className="w-6 h-6 text-gray-500" />
            <Droplets className="w-6 h-6 text-cyan-500" />
          </div>
          <p className="text-green-700 gelato-text font-medium">
            🌱 Discover your travel personality while learning about real climate impacts on these incredible destinations!
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="cute-button text-xl px-12 py-4 w-full max-w-md mx-auto"
        >
          <span className="flex items-center justify-center gap-3">
            <span>Start Travel Quiz</span>
            <span className="text-2xl">🚀</span>
          </span>
        </button>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 text-3xl animate-pulse">🌍</div>
        <div className="absolute -top-4 -right-4 text-3xl animate-pulse">🌡️</div>
        <div className="absolute -bottom-4 -left-4 text-3xl animate-pulse">🌊</div>
        <div className="absolute -bottom-4 -right-4 text-3xl animate-pulse">❄️</div>
      </div>
    </div>
  );
};

export default ClimateGameEntry;