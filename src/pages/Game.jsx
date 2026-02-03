import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../services/api';
import { getAvatarUrl } from '../services/dicebear';
import clsx from 'clsx';

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // { correct: boolean }
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }

    const loadGame = async () => {
      try {
        const count = import.meta.env.VITE_QUESTION_COUNT || 5;
        const data = await fetchQuestions(count);
        setQuestions(data);
      } catch (error) {
        console.error('Failed to load game', error);
        alert('ERROR LOADING GAME SYSTEM');
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [userId, navigate]);

  const handleAnswer = (optionIndex) => {
    const currentQuestion = questions[currentIndex];
    // Map index 0->A, 1->B, 2->C, 3->D
    const selectedOption = ['A', 'B', 'C', 'D'][optionIndex];

    // Frontend grading logic
    const isCorrect = String(selectedOption).trim().toUpperCase() === String(currentQuestion.answer).trim().toUpperCase();

    const newAnswers = [...answers, {
      id: currentQuestion.id,
      selection: selectedOption,
      correct: isCorrect
    }];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Game Over
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      const score = newAnswers.filter(a => a.correct).length;

      navigate('/result', {
        state: {
          userId,
          score,
          total: questions.length,
          duration,
          passed: score >= (import.meta.env.VITE_PASS_THRESHOLD || 3)
        }
      });
    }
  };

  if (loading) return <div className="loading">LOADING...</div>;

  if (questions.length === 0) return <div className="error">NO DATA FOUND</div>;

  const currentQ = questions[currentIndex];
  const avatarSeed = `${userId}-${currentIndex}`; // Unique avatar per question/user combo

  return (
    <div className="game-container">
      <div className="header-info">
        <span>PLAYER: {userId}</span>
        <span>LEVEL: {currentIndex + 1}/{questions.length}</span>
      </div>

      <div className="game-layout">
        <div className="avatar-section">
          <img
            src={getAvatarUrl(avatarSeed)}
            alt="Quiz Master"
            className="avatar-img"
          />
          <div className="speech-bubble">
            {currentQ.question}
          </div>
        </div>

        <div className="options-grid">
          {currentQ.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleAnswer(idx)} className="option-btn">
              <span className="opt-label">{['A', 'B', 'C', 'D'][idx]}</span>
              <span className="opt-text">{opt}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .loading { text-align: center; font-size: 2rem; animation: blink 1s infinite; }
        
        .header-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          font-size: 0.8rem;
          color: var(--pixel-secondary);
        }
        
        .game-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .avatar-section {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .avatar-img {
          width: 80px;
          height: 80px;
          border: 4px solid var(--pixel-text);
          background: var(--pixel-light);
          image-rendering: pixelated;
        }
        
        .speech-bubble {
          flex: 1;
          background: var(--pixel-text);
          color: var(--pixel-dark);
          padding: 1rem;
          border-radius: 4px;
          position: relative;
          min-height: 80px;
          display: flex;
          align-items: center;
          border: 4px solid var(--pixel-light);
        }
        
        .speech-bubble::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 20px;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-right: 12px solid var(--pixel-light);
        }
        
        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .option-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-align: left;
          font-size: 0.9rem;
          padding: 1rem;
        }
        
        .opt-label {
          color: var(--pixel-accent);
          font-weight: bold;
        }
        
        @media (max-width: 600px) {
          .options-grid { grid-template-columns: 1fr; }
          .avatar-section { flex-direction: column; align-items: center; }
          .speech-bubble { width: 100%; border-right: 4px solid var(--pixel-light); }
          .speech-bubble::before {
             left: 50%; top: -12px; transform: translateX(-50%) rotate(90deg);
             border-right: 12px solid var(--pixel-light);
          }
        }
      `}</style>
    </div>
  );
};

export default Game;
