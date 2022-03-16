import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './InfoPage.css';
import NavBar from '../../components/NavBar/NavBar';

const InfoPage = () => {
  let params = useParams();

  // This useEffect is triggered only on component mount
  useEffect(() => {
    // Assuming the backend is already running before starting the frontend,
    // we should load clubs on mount rather than on render.

    // NOTE: this just pulls the data from localhost
    fetch('http://localhost:8000/clubs/' + params.id)
      .then((res) => res.json())
      .then((data) => {
      });
  }, []);

  return (
    <>
      <NavBar hasSearch={false} />
      <div className="container">
        <div className="clubOuterContainer">
          <div className="clubContainer">
            <div className="profile"></div>
            <div className="name"></div>
            <div className="categories"></div>
            <div className="socials"></div>
          </div>
        </div>
        <div className="infoContainer">
          <div className="statusContainer"></div>
          <div className="descContainer"></div>
          <div className="eventsContainer"></div>
        </div>
      </div>
    </>
  );
};

export default InfoPage;
