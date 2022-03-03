import React, { useEffect, useState } from 'react';
import ClubCard from '../ClubCard/ClubCard';
import { ClubType } from '../../../../backend/types/types';
import './ClubBoard.css';
import NavBar from '../NavBar/NavBar';

const ClubBoard = () => {
  // keeps an updated list of ALL clubs in the database since the component mounted
  const [origClubArray, setOrigClubArray] = useState<ClubType[]>([]);

  // keeps the list of clubs to be rendered, depending on search
  const [clubArray, setClubArray] = useState<ClubType[]>([]);

  function updateSearchText(text: string) {
    console.log('new search text: ' + text);
    setClubArray(
      // remove all clubs that don't begin with search string
      origClubArray.filter(function (item: ClubType) {
        console.log(item.name);
        return item.name
          .trim()
          .toLowerCase()
          .startsWith(text.trim().toLowerCase());
      })
    );
  }

  // This useEffect is triggered on render
  useEffect(() => {
    console.log('==========================');
    console.log('Club Array Loaded!');
    console.log(clubArray);
    console.log('Original Club Array is: ');
    console.log(origClubArray);
  });

  // This useEffect is triggered only on component mount
  useEffect(() => {
    // Assuming the backend is already running before starting the frontend,
    // we should load clubs on mount rather than on render.
    fetch('http://localhost:8000/clubs')
      .then((res) => res.json())
      .then((data) => {
        setClubArray(data);
        setOrigClubArray(data);
      });
  }, []);

  return (
    <>
      <NavBar hasSearch={true} callback={updateSearchText} />
      <div className="cardsContainer">
        {clubArray.map((club) => (
          <ClubCard clubName={club.name} clubCategory={club.category} />
        ))}
      </div>
    </>
  );
};

export default ClubBoard;
