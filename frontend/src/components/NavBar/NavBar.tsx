import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../../icons/navbar';
import './NavBar.css';

const NavBar = () => {
  return (
    <header className="header">
      <div className="left">
        <div>
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>
      </div>
      <div className="mid">
        <div className="searchContainer">
          <input placeholder="Search Clubs" type="text" className="searchBar" />
        </div>
      </div>
      <div className="right">
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </header>
  );
};

export default NavBar;
