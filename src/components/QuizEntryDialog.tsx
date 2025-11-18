import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface SDG {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

interface QuizEntryDialogProps {
  sdg: SDG;
  onStart: () => void; // Keeps the existing contract for internal quiz flow
  onBack: () => void;
}

const QuizEntryDialog: React.FC<QuizEntryDialogProps> = ({ sdg, onStart, onBack }) => {
  const [currentAnimal, setCurrentAnimal] = useState(0);
  
  const cuteAnimals = ['🦄', '🐰', '🐱', '🐼', '🦊', '🐨', '🐸', '🦋'];
  const encouragingMessages = [
    "Ready to become an SDG expert? 🌟",
    "Let's learn together! 💜",
    "You've got this! 🎯",
    "Time to shine! ✨",
    "Adventure awaits! 🚀",
    "Knowledge is power! 📚",
    "Let's make a difference! 🌍",
    "You're amazing! 💫"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimal((prev) => (prev + 1) % cuteAnimals.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  /**
   * 💡 Game/Quiz START HANDLER: 
   * Now checks for SDGs 2, 4, 5, and 7 and redirects to their respective external games.
   */
  const handleGameStart = () => {
    if (sdg.id === 2) {
      // Redirect for SDG 2 (Zero Hunger)
      window.location.href = `/sdg2/front.html`; 
    } else if (sdg.id === 4) {
      // Redirect for SDG 4 (Quality Education)
      window.location.href = `/sdg4/front.html`; 
    } else if (sdg.id === 5) {
      // Redirect for SDG 5 (Gender Equality)
      window.location.href = `/sdg5/Front.html`; 
    } else if (sdg.id === 7) {
      // Redirect for SDG 7 (Clean Energy)
      window.location.href = `/sdg7/front.Html`; 
    } else {
      // For all other SDGs (that are not integrated games or SDG 13), start the internal quiz
      onStart();
    }
  };

  // Determine button text and icon based on whether it's a quiz or a game.
  const integratedGameSDGs = [2, 4, 5, 7]; // List of all SDGs with external games
  const isGameSDG = integratedGameSDGs.includes(sdg.id);
  const startButtonText = isGameSDG ? 'Start Game' : 'Start Quiz';
  const displayIcon = isGameSDG ? '🎮' : '📝';
  const displayActivity = isGameSDG ? 'Interactive mini-games' : 'Multiple choice questions';


  return (
    <div className="min-h-screen gelato-bg flex items-center justify-center p-4">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float-dreamy opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            {cuteAnimals[Math.floor(Math.random() * cuteAnimals.length)]}
          </div>
        ))}
      </div>

      <div className="entry-dialog max-w-lg w-full p-10 text-center relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 text-purple-700 hover:text-purple-800 transition-colors duration-200 gelato-text"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        {/* Animated Animal */}
        <div className="mb-8">
          <div className="text-8xl cute-animal mb-4">
            {cuteAnimals[currentAnimal]}
          </div>
          <div className="text-lg text-purple-600 gelato-text font-medium">
            {encouragingMessages[currentAnimal]}
          </div>
        </div>

        {/* SDG Info */}
        <div className="mb-8">
          <div 
            className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-3xl shadow-lg transform hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: sdg.color }}
          >
            {sdg.icon}
          </div>
          <h1 className="text-3xl font-bold text-purple-900 mb-3 gelato-text">
            SDG {sdg.id}: {sdg.title}
          </h1>
          <p className="text-purple-700 text-lg leading-relaxed gelato-text mb-6">
            {sdg.description}
          </p>
          <div className="bg-purple-50 border-3 border-purple-200 rounded-xl p-4 mb-6">
            <p className="text-purple-600 gelato-text">
              🎯 Test your knowledge with fun {isGameSDG ? 'games' : 'questions'} about this important global goal!
            </p>
          </div>
        </div>

        {/* Quiz Info */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-center gap-3 text-purple-600 gelato-text">
            <span className="text-2xl">{displayIcon}</span>
            <span>{displayActivity}</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-purple-600 gelato-text">
            <span className="text-2xl">⏱️</span>
            <span>Take your time to think</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-purple-600 gelato-text">
            <span className="text-2xl">🏆</span>
            <span>Learn and have fun!</span>
          </div>
        </div>

        {/* Start Button - NOW CALLS handleGameStart */}
        <button
          onClick={handleGameStart}
          className="cute-button text-xl px-12 py-4 w-full"
        >
          <span className="flex items-center justify-center gap-3">
            <span>{startButtonText}</span>
            <span className="text-2xl">🚀</span>
          </span>
        </button>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 text-3xl animate-pulse">✨</div>
        <div className="absolute -top-4 -right-4 text-3xl animate-pulse">🌟</div>
        <div className="absolute -bottom-4 -left-4 text-3xl animate-pulse">💫</div>
        <div className="absolute -bottom-4 -right-4 text-3xl animate-pulse">⭐</div>
      </div>
    </div>
  );
};

export default QuizEntryDialog;