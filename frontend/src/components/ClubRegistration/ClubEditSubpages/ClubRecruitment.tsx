import React, { useEffect } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import Sidebar from '../Sidebar';
import '../ClubRegistration.css';

const ClubRecruitment = () => {
  return (
    <>
      <NavBar hasSearch={false} />
      <div className="page-container">
        <Sidebar currentPath={1} />
        <div className="container">Club Recruitment Page</div>
      </div>
    </>
  );
};

export default ClubRecruitment;
