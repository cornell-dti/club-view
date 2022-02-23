import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ClubBoard from './components/ClubBoard/ClubBoard';
import NavBar from './components/NavBar/NavBar';
import { signIn, uploadImage } from './util/firebase';


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
      
    </div>
  );
}




export default App;

