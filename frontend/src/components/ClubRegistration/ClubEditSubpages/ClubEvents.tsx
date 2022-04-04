import React, { useEffect } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import Sidebar from '../Sidebar';
import '../ClubRegistration.css';

const ClubEvents = () => {
  return (
    <>
      <NavBar hasSearch={false} />
      <div className="page-container">
        <Sidebar currentPath={3} />
        <div className="container">Club Events Page</div>
      </div>
    </>
  );
};

export default ClubEvents;
