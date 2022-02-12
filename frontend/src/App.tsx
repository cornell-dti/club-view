import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ClubBoard from './components/ClubBoard/ClubBoard';
import ClubRegistration from './components/ClubRegistration/ClubRegistration';

function App() {
  //TODO FOR DANIEL: REMOVE CLUBREGISTRATION FROM THIS PAGE, PLUG IT INTO A SEPARATE PAGE UNDER DOM
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>|<Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ClubBoard />} />
        <Route path="/register" element={<ClubRegistration />} />
      </Routes>
    </div>
  );
}

export default App;
