'use client';

import { useState, useEffect } from 'react';

interface Puzzle {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const puzzles: Puzzle[] = [
  {
    question: "मैं हमेशा आगे बढ़ता हूं लेकिन कभी पीछे नहीं जाता। मैं क्या हूं?",
    options: ["समय", "नदी", "सड़क", "ट्रेन"],
    correctAnswer: 0,
    explanation: "समय हमेशा आगे बढ़ता है और कभी पीछे नहीं जाता!"
  },
  {
    question: "What has keys but no locks, space but no room, and you can enter but can't go inside?",
    options: ["A car", "A keyboard", "A prison", "A house"],
    correctAnswer: 1,
    explanation: "A keyboard has keys, space bar, and an enter key!"
  },
  {
    question: "If 2 + 2 = 4, and 3 + 3 = 6, then what is 4 + 4?",
    options: ["8", "10", "12", "16"],
    correctAnswer: 0,
    explanation: "Simple math: 4 + 4 = 8"
  },
  {
    question: "मेरे पास आंखें हैं लेकिन मैं देख नहीं सकता। मैं क्या हूं?",
    options: ["आलू", "सुई", "तूफान", "बटन"],
    correctAnswer: 0,
    explanation: "आलू में 'आंखें' (eyes) होती हैं!"
  },
  {
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    options: ["The letter M", "Time", "A second", "An opportunity"],
    correctAnswer: 0,
    explanation: "The letter 'M' appears once in 'minute', twice in 'moment', and zero times in 'thousand years'!"
  },
  {
    question: "अगर एक रेलगाड़ी 60 km/h की रफ्तार से चल रही है, तो 120 km जाने में कितना समय लगेगा?",
    options: ["1 घंटा", "2 घंटे", "3 घंटे", "4 घंटे"],
    correctAnswer: 1,
    explanation: "समय = दूरी / रफ्तार = 120 / 60 = 2 घंटे"
  },
  {
    question: "What has a head, a tail, but no body?",
    options: ["A snake", "A coin", "A comet", "A kite"],
    correctAnswer: 1,
    explanation: "A coin has a head (front) and tail (back) but no body!"
  },
  {
    question: "तीन डॉक्टरों का कहना है कि Bill उनका भाई है। लेकिन Bill कहता है कि उसका कोई भाई नहीं है। कैसे?",
    options: ["Bill झूठ बोल रहा है", "डॉक्टर्स महिलाएं हैं", "Bill गोद लिया गया है", "यह असंभव है"],
    correctAnswer: 1,
    explanation: "तीनों डॉक्टर महिलाएं हैं - वे Bill की बहनें हैं!"
  },
  {
    question: "What gets wetter the more it dries?",
    options: ["A sponge", "A towel", "Rain", "A mop"],
    correctAnswer: 1,
    explanation: "A towel gets wetter as it dries things!"
  },
  {
    question: "एक किसान के पास 17 भेड़ें थीं। सब मर गईं सिवाय 9 के। कितनी भेड़ें बची?",
    options: ["8", "9", "0", "17"],
    correctAnswer: 1,
    explanation: "9 भेड़ें बची क्योंकि 'सब मर गईं सिवाय 9 के' का मतलब है 9 जीवित रहीं!"
  }
];

export default function Home() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledPuzzles, setShuffledPuzzles] = useState<Puzzle[]>([]);

  useEffect(() => {
    const shuffled = [...puzzles].sort(() => Math.random() - 0.5);
    setShuffledPuzzles(shuffled);
  }, []);

  const handleAnswer = (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === shuffledPuzzles[currentPuzzle].correctAnswer;

    if (isCorrect) {
      setScore(score + 10 + streak * 5);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const nextPuzzle = () => {
    if (currentPuzzle < shuffledPuzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    const shuffled = [...puzzles].sort(() => Math.random() - 0.5);
    setShuffledPuzzles(shuffled);
    setCurrentPuzzle(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameOver(false);
  };

  if (shuffledPuzzles.length === 0) {
    return (
      <div className="container">
        <div className="game-header">
          <h1>🧩 AI Puzzle Game</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="container">
        <div className="game-header">
          <h1>🧩 AI Puzzle Game</h1>
        </div>
        <div className="game-board">
          <div className="game-over">
            <h2>🎉 Game Over!</h2>
            <div className="final-score">{score}</div>
            <p>Congratulations! You completed all puzzles.</p>
            <p>
              {score >= 100
                ? "🏆 Outstanding! You're a puzzle master!"
                : score >= 70
                ? "🌟 Great job! Keep it up!"
                : score >= 40
                ? "👍 Good effort! Practice makes perfect!"
                : "💪 Don't give up! Try again!"}
            </p>
            <button onClick={restartGame} className="btn btn-primary">
              🔄 Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const puzzle = shuffledPuzzles[currentPuzzle];
  const isCorrect = selectedAnswer === puzzle.correctAnswer;

  return (
    <div className="container">
      <div className="game-header">
        <h1>🧩 AI Puzzle Game</h1>
        <p>Test your brain with challenging puzzles!</p>
      </div>

      <div className="game-board">
        <div className="stats">
          <div className="stat-card">
            <div className="stat-label">Score</div>
            <div className="stat-value">{score}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Streak</div>
            <div className="stat-value">{streak}🔥</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Puzzle</div>
            <div className="stat-value">
              {currentPuzzle + 1}/{shuffledPuzzles.length}
            </div>
          </div>
        </div>

        <div className="puzzle-container">
          <div className="puzzle-question">{puzzle.question}</div>

          <div className="options">
            {puzzle.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`option-btn ${
                  showFeedback && index === puzzle.correctAnswer
                    ? 'correct'
                    : showFeedback && index === selectedAnswer
                    ? 'incorrect'
                    : ''
                }`}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                {isCorrect ? '✅ Correct!' : '❌ Wrong!'}
              </div>
              <div>{puzzle.explanation}</div>
              {isCorrect && streak > 1 && (
                <div style={{ marginTop: '10px' }}>
                  🔥 Streak Bonus: +{streak * 5} points!
                </div>
              )}
            </div>
          )}
        </div>

        {showFeedback && (
          <div className="controls">
            <button onClick={nextPuzzle} className="btn btn-primary">
              {currentPuzzle < shuffledPuzzles.length - 1
                ? 'Next Puzzle →'
                : 'Finish Game'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
