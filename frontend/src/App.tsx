import React from 'react';
import './App.css';
import ClubBoard from './components/ClubBoard/ClubBoard';
import { signIn } from './util/auth';

function App() {
  return (
    <div className="App">
      <ClubBoard />
      <button onClick={signIn}>Sign IN</button>
    </div>
  );
}

export default App;
