import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './styles/global.css';

import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
