import React, { useState } from 'react';
import ClubCard from '../ClubCard/ClubCard';
import { ClubType } from '../../../../backend/types/types';
import './ClubBoard.css';

const ClubBoard = () => {
  // let clubArray: ClubType[] = new Array(100).fill({
  //   name: 'Club Name',
  //   category: 'Category',
  // });

  const [clubArray, setClubArray] = useState<ClubType[]>([]);

  fetch('http://localhost:8000/clubs')
    .then((res) => res.json())
    .then((data) => setClubArray(data))
    .then(() => console.log(clubArray));

  return (
    <div className="cardsContainer">
      {clubArray.map((club) => (
        <ClubCard clubName={club.name} clubCategory={club.category} />
      ))}
    </div>
  );
};

export default ClubBoard;
