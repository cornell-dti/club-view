import React from 'react';
import './App.css';
import ClubBoard from './components/ClubBoard/ClubBoard';
import ClubRegistration from './components/ClubRegistration/ClubRegistration';

function App() {
  //TODO FOR DANIEL: REMOVE CLUBREGISTRATION FROM THIS PAGE, PLUG IT INTO A SEPARATE PAGE UNDER DOM
  return (
    <div className="App">
      <ClubRegistration /> 
      <ClubBoard />
    </div>
  );
}

export default App;
