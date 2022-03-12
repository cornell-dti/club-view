import React from 'react';
import './InfoPage.css';
import NavBar from '../../components/NavBar/NavBar';

const InfoPage = () => {
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
