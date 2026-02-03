import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>PIXEL QUIZ</h1>
      </header>
      <main className="main-content pixel-container">
        {children}
      </main>
      <footer className="footer">
        <p>© 2026 PIXEL GAME CORP</p>
      </footer>

      <style>{`
        .layout {
          max-width: 900px;
          margin: 0 auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
        }

        .header {
          text-align: center;
        }

        .header h1 {
          font-size: clamp(2rem, 8vw, 3.5rem);
          text-shadow: 4px 4px 0 var(--pixel-primary);
          margin: 0.5rem 0;
          line-height: 1.2;
        }

        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .footer {
          text-align: center;
          margin-top: 2rem;
          padding: 1rem 0;
          font-size: 0.8rem;
          color: var(--pixel-light);
          border-top: 2px solid rgba(255,255,255,0.1);
        }

        @media (max-width: 600px) {
          .layout {
            padding: 1rem;
          }
          
          .header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
