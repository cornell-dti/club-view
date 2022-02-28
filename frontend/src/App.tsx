import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ClubBoard from './components/ClubBoard/ClubBoard';
import NavBar from './components/NavBar/NavBar';
import { signIn } from './util/auth';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={ClubBoard} />
        </Routes>
      </Router>
      <ClubBoard />
      <button onClick={signIn}>Sign IN</button>
    </div>
  );
}

export default App;
