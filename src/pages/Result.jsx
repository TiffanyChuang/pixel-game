import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitResult } from '../services/api';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;
    const [submitting, setSubmitting] = useState(true);
    const [submitError, setSubmitError] = useState(null);

    const hasSubmitted = React.useRef(false);

    useEffect(() => {
        if (!state) {
            navigate('/');
            return;
        }

        // Prevent double submission in development (Strict Mode)
        if (hasSubmitted.current) return;
        hasSubmitted.current = true;

        const submit = async () => {
            try {
                // Submit score and passed status directly to backend
                await submitResult({
                    id: state.userId,
                    score: state.score,
                    passed: state.passed,
                    totalTime: state.duration,
                    questionCount: state.total
                });
            } catch (error) {
                console.error('Submission failed', error);
                setSubmitError('FAILED TO SAVE SCORE');
                // Allow retry if it failed? (Optional: hasSubmitted.current = false)
            } finally {
                setSubmitting(false);
            }
        };

        submit();
    }, [state, navigate]);

    if (!state) return null;

    return (
        <div className="result-container">
            <div className="card">
                <h2 className={state.passed ? 'success' : 'fail'}>
                    {state.passed ? 'MISSION COMPLETE' : 'GAME OVER'}
                </h2>

                <div className="stats">
                    <p>PLAYER: {state.userId}</p>
                    <p>SCORE: {state.score} / {state.total}</p>
                    <p>TIME: {state.duration.toFixed(1)}s</p>
                </div>

                {submitting && <p className="status-msg">SAVING DATA...</p>}
                {submitError && <p className="error-msg">{submitError}</p>}
                {!submitting && !submitError && <p className="success-msg">RESULT SAVED!</p>}

                <button onClick={() => navigate('/')} className="retry-btn">
                    TRY AGAIN
                </button>
            </div>

            <style>{`
        .result-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          width: 100%;
        }
        
        h2.success { color: var(--pixel-secondary); }
        h2.fail { color: var(--pixel-primary); }
        
        .stats {
          margin-bottom: 2rem;
          font-size: 1.2rem;
          line-height: 1.6;
          text-align: left;
          display: inline-block;
        }
        
        .stats p {
            margin: 0.5rem 0;
            word-break: break-all;
        }
        
        .status-msg { color: var(--pixel-accent); }
        .error-msg { color: var(--pixel-primary); }
        .success-msg { color: var(--pixel-secondary); }
        
        .retry-btn {
          width: 100%;
        }
      `}</style>
        </div>
    );
};

export default Result;
