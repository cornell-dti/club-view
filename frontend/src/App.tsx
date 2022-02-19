import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ClubBoard from './components/ClubBoard/ClubBoard';
import NavBar from './components/NavBar/NavBar';
import InfoPage from './components/InfoPage/InfoPage';
import { signIn } from './util/auth';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ClubBoard />} />
          <Route path="/info-page" element={<InfoPage />} />
        </Routes>
      </Router>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}

export default App;
