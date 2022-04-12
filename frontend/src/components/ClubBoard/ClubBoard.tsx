import React, { useEffect, useState } from 'react';
import ClubCard from '../ClubCard/ClubCard';
import Filter from '../Filter/Filter';
import { ClubType } from '../../../../backend/types/types';
import './ClubBoard.css';
import NavBar from '../NavBar/NavBar';
import { stat } from 'fs';

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

  function updatetoFilter(categorySet: Set<string>, statusSet: Set<string>) {
    console.log('category set', categorySet);
    console.log('original:', origClubs);
    setClubArray(
      origClubs.filter((item: ClubType) => {
        console.log(item.category);
        console.log(
          `does statusSet have ${item.status}:`,
          statusSet.has(item.status)
        );
        return categorySet.has(item.category) || statusSet.has(item.status);
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
            clubArray.map((club) => (
              <>
                <ClubCard
                  clubName={club.name}
                  clubCategory={club.category}
                  clubID={club.id}
                />
              </>
            ))
          )}
        </div>
        <div className="filterContainer">
          <Filter callback={updatetoFilter} />
        </div>
      </div>
    </>
  );
};

export default ClubBoard;
