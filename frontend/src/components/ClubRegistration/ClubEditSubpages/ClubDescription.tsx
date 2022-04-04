import React, { useEffect } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import Sidebar from '../Sidebar';
import '../ClubRegistration.css';

const ClubDescription = () => {
  return (
    <>
      <NavBar hasSearch={false} />
      <div className="page-container">
        <Sidebar currentPath={2} />
        <div className="container">Club Description Page</div>
      </div>
    </>
  );
};

export default ClubDescription;
