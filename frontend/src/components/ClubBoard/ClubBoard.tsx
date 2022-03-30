import React, { useEffect, useState } from 'react';
import ClubCard from '../ClubCard/ClubCard';
import Filter from '../Filter/Filter';
import { ClubType } from '../../../../backend/types/types';
import './ClubBoard.css';
import NavBar from '../NavBar/NavBar';

const ClubBoard = () => {
  const [origClubs, setOrigClubs] = useState<ClubType[]>([]); // an array of all clubs

  // This useEffect is triggered only on component mount
  useEffect(() => {
    // Assuming the backend is already running before starting the frontend,
    // we should load clubs on mount rather than on render.

    // NOTE: this just pulls the data from localhost
    fetch('http://localhost:8000/clubs')
      .then((res) => res.json())
      .then((data) => {
        setOrigClubs(data);
      });
  }, []);

  // keeps the list of clubs to be rendered, depending on search
  const [clubArray, setClubArray] = useState(origClubs);

  useEffect(() => {
    setClubArray(origClubs);
  }, [origClubs]);

  function updateSearchText(text: string) {
    setClubArray(
      // remove all clubs that don't begin with search string
      origClubs.filter(function (item: ClubType) {
        return item.name
          .trim()
          .toLowerCase()
          .includes(text.trim().toLowerCase()); // The search currently only matches exact name searches
      })
    );
  }

  return (
    <>
      <NavBar hasSearch={true} callback={updateSearchText} />
      <div className="dashboardContainer">
        <div className="cardsContainer">
          {clubArray.length === 0 ? (
            <></>
          ) : (
            clubArray.map((club) => <ClubCard {...club} />)
          )}
        </div>
        <div className="filterContainer">
          <Filter />
        </div>
      </div>
    </>
  );
};

export default ClubBoard;
