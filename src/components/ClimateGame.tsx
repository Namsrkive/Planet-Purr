import React, { useState } from 'react';
import { ArrowLeft, Globe, Thermometer } from 'lucide-react';
import { climateQuestions, climateDestinations, ClimateDestination } from '../data/climateGameData';

interface ClimateGameProps {
  onBack: () => void;
  onComplete: (destination: ClimateDestination) => void;
}

const ClimateGame: React.FC<ClimateGameProps> = ({ onBack, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const answer = climateQuestions[currentQuestion].options[selectedAnswer];
    const newScores = { ...scores };
    newScores[answer.destinationId] = (newScores[answer.destinationId] || 0) + answer.points;
    setScores(newScores);

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < climateQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Calculate final destination
        const topDestination = Object.entries(newScores).reduce((a, b) => 
          newScores[a[0]] > newScores[b[0]] ? a : b
        );
        const destination = climateDestinations.find(d => d.id === topDestination[0]);
        if (destination) {
          onComplete(destination);
        }
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen gelato-bg p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto pt-4 mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-700 hover:text-purple-800 transition-colors duration-200 gelato-text"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="text-right gelato-text">
            <div className="text-sm text-purple-600">Question {currentQuestion + 1} of {climateQuestions.length}</div>
          </div>
        </div>

        {/* Climate Action Header */}
        <div className="entry-dialog p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg bg-gradient-to-br from-green-500 to-blue-500">
              <span className="text-3xl">✈️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-purple-900 gelato-text">🌎✨ Where Should You Travel Next?</h1>
              <p className="text-purple-700 gelato-text text-lg">(According to Your Vibes) - SDG 13: Climate Action</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-3xl mx-auto">
        <div className="entry-dialog p-10">
          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between text-sm text-purple-600 mb-3 gelato-text">
              <span>Progress</span>
              <span>{Math.round(((currentQuestion) / climateQuestions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-4 gelato-border">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestion) / climateQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎒</span>
              <h2 className="text-3xl font-bold text-purple-900 leading-relaxed gelato-text">
                {climateQuestions[currentQuestion]?.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-5">
              {climateQuestions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-200 border-4 gelato-text ${
                    selectedAnswer === index
                      ? 'bg-gradient-to-r from-green-100 to-blue-100 border-green-400 text-green-800 shadow-lg transform scale-105'
                      : 'bg-white border-purple-200 text-purple-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:border-purple-300 hover:shadow-lg hover:transform hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{option.text}</span>
                    <div className="text-2xl">
                      {option.destinationId === 'antarctica' ? '🐧' 
                       : option.destinationId === 'france' ? '🥐'
                       : option.destinationId === 'zambia' ? '🦁'
                       : option.destinationId === 'indonesia' ? '🌋'
                       : option.destinationId === 'india' ? '🕌'
                       : '✈️'
                      }
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null || showResult}
              className={`cute-button text-lg px-10 py-4 ${
                selectedAnswer === null || showResult
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {showResult 
                ? currentQuestion < climateQuestions.length - 1 
                  ? 'Next Question...' 
                  : 'Revealing Your Destination...'
                : 'Next Question'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateGame;