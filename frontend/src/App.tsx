import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ClubBoard from './components/ClubBoard/ClubBoard';
import NavBar from './components/NavBar/NavBar';
import ClubRegistration from './components/ClubRegistration/ClubRegistration';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={ClubBoard} />
          <Route path="/register" element={ClubRegistration}/>
        </Routes>
      </Router>
      <ClubBoard />
    </div>
  );
}

export default App;
