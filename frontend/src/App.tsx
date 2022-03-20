import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ClubBoard from './components/ClubBoard/ClubBoard';
import ClubRegistration from './components/ClubRegistration/ClubRegistration';
import NavBar from './components/NavBar/NavBar';
import InfoPage from './components/InfoPage/InfoPage';
import { signIn } from './util/auth';
import SocialTag from './components/Tags/SocialTags/SocialTag';
import CategoryTag from './components/Tags/CategoryTags/CategoryTag';

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
      <CategoryTag large={false} title="Dance" />
      <CategoryTag large={false} title="Academic" />
      <CategoryTag large={true} title="Dance" />
      <CategoryTag large={true} title="Academic" />
    </div>
  );
}

export default App;
