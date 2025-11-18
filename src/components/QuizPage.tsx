import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';
import { sdgData } from '../data/sdgData';
import { quizQuestions } from '../data/quizData';
import QuizEntryDialog from './QuizEntryDialog';
import ClimateGameEntry from './ClimateGameEntry';
import ClimateGame from './ClimateGame';
import ClimateResult from './ClimateResult';
import { ClimateDestination } from '../data/climateGameData';

const QuizPage: React.FC = () => {
  const { sdgId } = useParams<{ sdgId: string }>();
  const navigate = useNavigate();
  const [showEntryDialog, setShowEntryDialog] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Climate Game States
  const [gameMode, setGameMode] = useState<'entry' | 'game' | 'result' | 'quiz'>('entry');
  const [climateDestination, setClimateDestination] = useState<ClimateDestination | null>(null);

  const sdg = sdgData.find(s => s.id === parseInt(sdgId || '1'));
  const questions = quizQuestions[parseInt(sdgId || '1')] || [];
  const isClimateSDG = parseInt(sdgId || '1') === 13;

  if (!sdg) {
    return <div className="min-h-screen gelato-bg flex items-center justify-center">
      <p className="text-purple-800 gelato-text">SDG not found</p>
    </div>;
  }

  // Climate Game Handlers
  const handleStartClimateGame = () => {
    setGameMode('game');
  };

  const handleClimateGameComplete = (destination: ClimateDestination) => {
    setClimateDestination(destination);
    setGameMode('result');
  };

  const handleRestartClimateGame = () => {
    setClimateDestination(null);
    setGameMode('entry');
  };

  const handleTakeQuiz = () => {
    setGameMode('quiz');
    setShowEntryDialog(true);
  };

  // Regular Quiz Handlers
  const handleStartQuiz = () => {
    // This is called by QuizEntryDialog when SDG ID is NOT 2, 4, or 13.
    setShowEntryDialog(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    if (isClimateSDG) {
      setGameMode('entry');
    } else {
      setShowEntryDialog(true);
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You're an SDG champion! 🌟✨";
    if (percentage >= 60) return "Great job! You have good knowledge about this SDG! 👏💜";
    if (percentage >= 40) return "Good effort! Keep learning about the SDGs! 📚🦄";
    return "Keep exploring! Every step towards understanding SDGs matters! 💪🌈";
  };

  // Climate Game Flow
  if (isClimateSDG) {
    if (gameMode === 'entry') {
      return <ClimateGameEntry onStart={handleStartClimateGame} onBack={() => navigate('/')} />;
    }
    
    if (gameMode === 'game') {
      return <ClimateGame onBack={() => setGameMode('entry')} onComplete={handleClimateGameComplete} />;
    }
    
    if (gameMode === 'result' && climateDestination) {
      return (
        <ClimateResult 
          destination={climateDestination}
          onRestart={handleRestartClimateGame}
          onBackToDesktop={() => navigate('/')}
          onTakeQuiz={handleTakeQuiz}
        />
      );
    }
    
    // Fall through to regular quiz if gameMode is 'quiz'
  }

  // Regular Quiz Flow (including SDG 2 and 4, which will redirect internally)
  if (showEntryDialog) {
    return <QuizEntryDialog sdg={sdg} onStart={handleStartQuiz} onBack={() => navigate('/')} />;
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen gelato-bg p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="entry-dialog p-10 text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4 cute-animal">🎉</div>
              <div 
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-white shadow-lg"
                style={{ backgroundColor: sdg.color }}
              >
                {sdg.icon}
              </div>
              <h1 className="text-4xl font-bold text-purple-900 mb-3 gelato-text">Quiz Completed!</h1>
              <h2 className="text-2xl text-purple-700 gelato-text">{sdg.title}</h2>
            </div>

            <div className="mb-10">
              <div className="text-7xl font-bold text-purple-800 mb-3 gelato-text">
                {score}/{questions.length}
              </div>
              <div className="text-2xl text-purple-600 mb-6 gelato-text">
                {Math.round((score / questions.length) * 100)}% Correct
              </div>
              <p className="text-purple-700 text-xl font-medium gelato-text">
                {getScoreMessage()}
              </p>
            </div>

            <div className="flex gap-6 justify-center">
              <button
                onClick={restartQuiz}
                className="cute-button flex items-center gap-3"
              >
                <RotateCcw className="w-6 h-6" />
                Try Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="cute-button flex items-center gap-3"
              >
                <Home className="w-6 h-6" />
                Back to Desktop
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gelato-bg p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto pt-4 mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-purple-700 hover:text-purple-800 transition-colors duration-200 gelato-text"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Desktop</span>
          </button>
          
          <div className="text-right gelato-text">
            <div className="text-sm text-purple-600">Question {currentQuestion + 1} of {questions.length}</div>
            <div className="text-sm text-purple-600">Score: {score}/{questions.length}</div>
          </div>
        </div>

        {/* SDG Header */}
        <div className="entry-dialog p-8 mb-8">
          <div className="flex items-center gap-6">
            <div 
              className="w-20 h-20 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg"
              style={{ backgroundColor: sdg.color }}
            >
              {sdg.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-purple-900 gelato-text">SDG {sdg.id}: {sdg.title}</h1>
              <p className="text-purple-700 gelato-text text-lg">{sdg.description}</p>
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
              <span>{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-4 gelato-border">
              <div 
                className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 leading-relaxed gelato-text">
              {questions[currentQuestion]?.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-5">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-200 border-4 gelato-text ${
                    showResult
                      ? index === questions[currentQuestion].correctAnswer
                        ? 'bg-green-100 border-green-400 text-green-800'
                        : selectedAnswer === index
                        ? 'bg-red-100 border-red-400 text-red-800'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                      : selectedAnswer === index
                      ? 'bg-purple-100 border-purple-400 text-purple-800 shadow-lg transform scale-105'
                      : 'bg-white border-purple-200 text-purple-800 hover:bg-purple-50 hover:border-purple-300 hover:shadow-lg hover:transform hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{option}</span>
                    {showResult && (
                      <div>
                        {index === questions[currentQuestion].correctAnswer ? (
                          <CheckCircle className="w-7 h-7 text-green-600" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="w-7 h-7 text-red-600" />
                        ) : null}
                      </div>
                    )}
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
                ? currentQuestion < questions.length - 1 
                  ? 'Next Question...' 
                  : 'Completing Quiz...'
                : 'Submit Answer'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;