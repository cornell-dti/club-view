import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../../icons/navbar';
import Handle from '../../assets/handle.svg';
import Ellipse from '../../assets/ellipse.svg';
import './NavBar.css';
import ProfileButton from './ProfileButton/ProfileButton';

// Required props
interface RequiredProps {
  hasSearch: boolean;
}

// Optional props
interface OptionalProps {
  callback: (text: string) => void;
}

// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  callback: (text: string) => {
    // dummy function
  },
};

const NavBar = (props: Props) => {
  const [searchPhrase, setSearchPhrase] = useState('');

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo of ClubView" />
        </Link>
      </div>
      {props.hasSearch ? (
        <div className="searchContainer">
          <input
            placeholder="Search Clubs"
            type="text"
            className="searchBar"
            value={searchPhrase}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchPhrase(event.target.value);
              props.callback(event.target.value);
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <div className="profileButton">
        <ProfileButton />
        <div className="right">
          <Link to="/register">
          <button className="registerButton">
          Register Club
          </button>
        </Link>
        </div>
      </div>
    </header>
  );
};
NavBar.defaultProps = defaultProps;

export default NavBar;
