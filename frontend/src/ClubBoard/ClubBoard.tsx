import React from 'react';
import ClubCard from './ClubCard';
import './ClubBoard.css';

type Club = {
  name: string;
  category: string;
};

const ClubBoard = () => {
  let clubArray: Club[] = new Array(100).fill({
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
