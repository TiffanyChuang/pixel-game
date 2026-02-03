import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      setError('PLEASE ENTER ID');
      return;
    }
    navigate('/game', { state: { userId } });
  };

  return (
    <div className="home-container">
      <div className="card">
        <h2>LOGIN</h2>
        <form onSubmit={handleStart} className="login-form">
          <label htmlFor="userId">PLAYER ID</label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setError('');
            }}
            placeholder="INSERT COIN..."
            autoComplete="off"
            autoFocus
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="start-btn">START GAME</button>
        </form>
      </div>

      <style>{`
        .home-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          width: 100%;
        }
        
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1rem;
        }
        
        .error-msg {
          color: var(--pixel-primary);
          font-size: 0.8rem;
          margin: 0;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          50% { opacity: 0; }
        }
        
        .start-btn {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Home;
