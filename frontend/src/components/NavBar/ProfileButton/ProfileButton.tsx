import React, { useState } from 'react';
import './ProfileButton.css';
import { signIn, signOut } from '../../../util/auth';
import { Link } from 'react-router-dom';
import { whiteArrow, whiteArrowRotated } from '../../../icons/navbar';

const ProfileButton = () => {
  const [profDropdownExpanded, setProfDropdownExpanded] = useState(false);

  const [editDropdownExpanded, setEditDropdownExpanded] = useState(false);
  const [manageDropdownExpanded, setManageDropdownExpanded] = useState(false);
  const [faveDropdownExpanded, setFaveDropdownExpanded] = useState(false);

  // TODO: These hard coded values need to be pulled from the backend
  const username = 'Jenny Zhang';
  // TODO: these clubs need to be, well, not just strings.
  const editClubs = ['Breakfree', 'Design and Tech Initiative', 'Appdev'];
  const manageClubs = ['Breakfree', 'Design and Tech Initiative', 'Appdev'];
  const faveClubs = ['Breakfree', 'Design and Tech Initiative', 'Appdev'];

  return (
    <div className="profileDropdown">
      {profDropdownExpanded ? (
        <div
          className="expandArea"
          onClick={() => {
            setProfDropdownExpanded(false);
            setEditDropdownExpanded(false);
            setManageDropdownExpanded(false);
            setFaveDropdownExpanded(false);
          }}
        >
          <img
            className="collapseArrow"
            src={whiteArrow}
            alt="Click here to collapse the category"
          />
          <div className="linkWrapper">
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to="/profile"
            >
              {username}
            </Link>
          </div>
          <div className="bufferSpace" />
        </div>
      ) : (
        <div
          className="expandArea"
          onClick={() => setProfDropdownExpanded(true)}
        >
          <img
            className="expandArrow"
            src={whiteArrowRotated}
            alt="Click here to expand the category"
          />
          {username}
          <div className="bufferSpace" />
        </div>
      )}

      {profDropdownExpanded ? (
        <div className="dropdownContent">
          <div className="clubDropdown">
            <div
              className={
                'clubDropdownButton' + (editDropdownExpanded ? 'Expanded' : '')
              }
              onClick={() => setEditDropdownExpanded(!editDropdownExpanded)}
            >
              Edit Clubs
            </div>
            {editDropdownExpanded ? (
              editClubs.map((club) => <div className="clubItem">{club}</div>)
            ) : (
              <></>
            )}
          </div>
          <div className="clubDropdown">
            <div
              className={
                'clubDropdownButton' +
                (manageDropdownExpanded ? 'Expanded' : '')
              }
              onClick={() => setManageDropdownExpanded(!manageDropdownExpanded)}
            >
              Manage Clubs
            </div>
            {manageDropdownExpanded ? (
              manageClubs.map((club) => <div className="clubItem">{club}</div>)
            ) : (
              <></>
            )}
          </div>
          <div className="clubDropdown">
            <div
              className={
                'clubDropdownButton' + (faveDropdownExpanded ? 'Expanded' : '')
              }
              onClick={() => setFaveDropdownExpanded(!faveDropdownExpanded)}
            >
              Favorited Clubs
            </div>
            {faveDropdownExpanded ? (
              faveClubs.map((club) => <div className="clubItem">{club}</div>)
            ) : (
              <></>
            )}
          </div>
          <div className="clubDropdownButton" onClick={signOut}>
            Sign Out
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileButton;
