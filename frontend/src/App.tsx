import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ClubBoard from './components/ClubBoard/ClubBoard';
import NavBar from './components/NavBar/NavBar';
import { signIn, uploadImage } from './util/firebase';


function App() {

  const [files, setFiles] = useState([]);

  const handleChange = (event: any) =>{
    setFiles(event.target.files);
  }

  const handleSubmit = async () =>{
    console.log(files);
    const url = await uploadImage(files[0], 'Cornell DTI');
    console.log(url);
  }

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
        <input onChange={handleChange} type="file" accept="image/png, image/jpeg, image/jpg" name='file' />
        <button onClick={handleSubmit} id='upload'>upload</button>
    </div>
  );
}




export default App;

