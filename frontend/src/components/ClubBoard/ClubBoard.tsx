import React from 'react';
import ClubCard from '../ClubCard/ClubCard';
import { ClubType } from '../../../../backend/types/types';
import './ClubBoard.css';

const ClubBoard = () => {
  let clubArray: ClubType[] = new Array(100).fill({
    name: 'Club Name',
    category: 'Category',
  });
  return (
    <div className="cardsContainer">
      {clubArray.map((club) => (
        <ClubCard clubName={club.name} clubCategory={club.category} />
      ))}
    </div>
  );
};

export default ClubBoard;
