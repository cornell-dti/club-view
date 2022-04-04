import React, { useEffect } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import Sidebar from '../Sidebar';
import '../ClubRegistration.css';

const ClubProfile = () => {
  return (
    <>
      <NavBar hasSearch={false} />
      <div className="page-container">
        <Sidebar currentPath={0} />
        <div className="container">Club Profile Page</div>
      </div>
    </>
  );
};

export default ClubProfile;
