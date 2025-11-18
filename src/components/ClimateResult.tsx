import React from 'react';
import { ArrowLeft, RotateCcw, Home, Globe, Thermometer, Droplets } from 'lucide-react';
import { ClimateDestination } from '../data/climateGameData';

interface ClimateResultProps {
  destination: ClimateDestination;
  onRestart: () => void;
  onBackToDesktop: () => void;
  onTakeQuiz: () => void;
}

const ClimateResult: React.FC<ClimateResultProps> = ({ 
  destination, 
  onRestart, 
  onBackToDesktop, 
  onTakeQuiz 
}) => {
  return (
    <div className="min-h-screen gelato-bg p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="entry-dialog p-10 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="text-6xl mb-4 cute-animal">🎉</div>
            <h1 className="text-4xl font-bold text-purple-900 mb-3 gelato-text">
              Your Travel Destination Is...
            </h1>
            <h2 className="text-3xl text-purple-700 gelato-text mb-6">
              {destination.name}
            </h2>
          </div>

          {/* Destination Image and Info */}
          <div className="mb-8">
            <div className="relative mb-6">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-64 object-cover rounded-2xl border-4 border-purple-300 shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-3 border-2 border-purple-400">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-xl px-4 py-2 border-2 border-purple-400">
                <span className="text-purple-800 font-bold gelato-text">{destination.continent}</span>
              </div>
            </div>

            <p className="text-purple-700 text-xl leading-relaxed gelato-text mb-6">
              {destination.description}
            </p>
          </div>

          {/* Climate Fact */}
          <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-4 border-red-300 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-3xl">🔥</span>
              <h3 className="text-2xl font-bold text-red-700 gelato-text">Reality Check</h3>
              <span className="text-3xl">🌡️</span>
            </div>
            <p className="text-red-800 text-lg leading-relaxed gelato-text font-medium">
              {destination.climateFact}
            </p>
          </div>

          {/* Call to Action */}
          <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-4 border-green-300 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-green-700 gelato-text mb-3">
              🌱 Want to Learn More About Climate Action?
            </h3>
            <p className="text-green-600 gelato-text">
              Take the SDG 13 quiz to deepen your understanding of climate change solutions and discover actions we can take to protect these amazing destinations!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onTakeQuiz}
              className="cute-button flex items-center gap-3 text-lg px-8 py-4"
            >
              <span>Take SDG 13 Quiz</span>
              <span className="text-2xl">📚</span>
            </button>
            <button
              onClick={onRestart}
              className="cute-button flex items-center gap-3 text-lg px-8 py-4"
            >
              <RotateCcw className="w-6 h-6" />
              <span>Try Again</span>
            </button>
            <button
              onClick={onBackToDesktop}
              className="cute-button flex items-center gap-3 text-lg px-8 py-4"
            >
              <Home className="w-6 h-6" />
              <span>Back to Desktop</span>
            </button>
          </div>

          {/* Decorative Climate Elements */}
          <div className="absolute -top-4 -left-4 text-4xl animate-pulse">🌍</div>
          <div className="absolute -top-4 -right-4 text-4xl animate-pulse">🌡️</div>
          <div className="absolute -bottom-4 -left-4 text-4xl animate-pulse">🌊</div>
          <div className="absolute -bottom-4 -right-4 text-4xl animate-pulse">❄️</div>
        </div>
      </div>
    </div>
  );
};

export default ClimateResult;