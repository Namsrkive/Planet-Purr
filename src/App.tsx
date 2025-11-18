import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Desktop from './components/Desktop';
import QuizPage from './components/QuizPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="/quiz/:sdgId" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;