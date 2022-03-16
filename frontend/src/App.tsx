import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { ClubType } from '../../backend/types/types';
import ClubBoard from './components/ClubBoard/ClubBoard';
import ClubRegistration from './components/ClubRegistration/ClubRegistration';
import InfoPage from './components/InfoPage/InfoPage';
import { signIn } from './util/auth';

function App() {
  const [clubs, setClubs] = useState<ClubType[]>([]); // an array of all clubs

  // This useEffect is triggered only on component mount
  useEffect(() => {
    // Assuming the backend is already running before starting the frontend,
    // we should load clubs on mount rather than on render.

    // NOTE: this just pulls the data from localhost
    fetch('http://localhost:8000/clubs')
      .then((res) => res.json())
      .then((data) => {
        setClubs(data);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<ClubRegistration />} />
          <Route path="/clubs/:id" element={<InfoPage />} />
          <Route path="/" element={<ClubBoard clubs={clubs}/>} />
        </Routes>
      </Router>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}

export default App;
