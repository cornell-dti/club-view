import React, { useEffect, useState } from 'react';
import ClubCard from '../ClubCard/ClubCard';
import { ClubType } from '../../../../backend/types/types';
import './ClubBoard.css';

const ClubBoard = () => {
  // let clubArray: ClubType[] = new Array(100).fill({
  //   name: 'Club Name',
  //   category: 'Category',
  // });

  const [clubArray, setClubArray] = useState<ClubType[]>([]);

  // This useEffect is triggered on render
  useEffect(() => {
    if (clubArray.length !== 0) {
      console.log('Club Array Loaded!');
      console.log(clubArray);
    }
  });

  // This useEffect is triggered only on component mount
  useEffect(() => {
    // Assuming the backend is already running before starting the frontend,
    // we should load clubs on mount rather than on render.
    fetch('http://localhost:8000/clubs')
      .then((res) => res.json())
      .then((data) => setClubArray(data));
  }, []);

  return (
    <div className="cardsContainer">
      {clubArray.map((club) => (
        <ClubCard clubName={club.name} clubCategory={club.category} />
      ))}
    </div>
  );
};

export default ClubBoard;
