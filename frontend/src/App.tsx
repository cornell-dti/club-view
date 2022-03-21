import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClubBoard from './components/ClubBoard/ClubBoard';
import ClubRegistration from './components/ClubRegistration/ClubRegistration';
import NavBar from './components/NavBar/NavBar';
import InfoPage from './components/InfoPage/InfoPage';
import { signIn } from './util/auth';
import { TokenProvider } from './context/TokenContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<ClubRegistration />} />
          <Route path="/info-page" element={<InfoPage />} />
          <Route path="/" element={<ClubBoard />} />
        </Routes>
      </Router>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}

export default App;
