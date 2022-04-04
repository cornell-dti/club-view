import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClubBoard from './components/ClubBoard/ClubBoard';
import ClubRegistration from './components/ClubRegistration/ClubRegistration';
import InfoPage from './components/InfoPage/InfoPage';
import { signIn } from './util/firebase';
import SocialTag from './components/Tags/SocialTags/SocialTag';
import CategoryTag from './components/Tags/CategoryTags/CategoryTag';
import { TokenProvider } from './context/TokenContext';
import './App.css';
import ClubProfile from './components/ClubRegistration/ClubEditSubpages/ClubProfile';
import ClubRecruitment from './components/ClubRegistration/ClubEditSubpages/ClubRecruitment';
import ClubDescription from './components/ClubRegistration/ClubEditSubpages/ClubDescription';
import ClubEvents from './components/ClubRegistration/ClubEditSubpages/ClubEvents';
import { sidebarPaths } from './components/ClubRegistration/Sidebar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path={'/register/' + sidebarPaths[0]}
            element={<ClubProfile />}
          />
          <Route
            path={'/register/' + sidebarPaths[1]}
            element={<ClubRecruitment />}
          />
          <Route
            path={'/register/' + sidebarPaths[2]}
            element={<ClubDescription />}
          />
          <Route
            path={'/register/' + sidebarPaths[3]}
            element={<ClubEvents />}
          />
          <Route path="/register" element={<ClubRegistration />} />
          <Route path="/clubs/:id" element={<InfoPage />} />
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
