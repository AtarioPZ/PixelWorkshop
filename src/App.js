// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/header';
import Footer from './components/common/footer';
import Body from './components/pages/body';
import PlayNow from './components/pages/playnow';
import Game from './components/pages/game';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Body />
                <Footer />
              </>
            }
          />
          <Route path="/playnow" element={
              <>
                <Header />
                <PlayNow />
                <Footer />
              </>
            } />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
