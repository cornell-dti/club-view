import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClubBoard from './components/ClubBoard/ClubBoard';
import NavBar from './components/NavBar/NavBar';
import InfoPage from './components/InfoPage/InfoPage';
import { signIn } from './util/auth';
import { TokenProvider } from './context/TokenContext';
import './App.css';

function App() {
  return (
    <TokenProvider>
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
    </TokenProvider>
  );
}

export default App;
