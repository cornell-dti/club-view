import React, { useEffect, useState } from 'react';
import ClubCard from '../ClubCard/ClubCard';
import { ClubType } from '../../../../backend/types/types';
import './ClubBoard.css';
import NavBar from '../NavBar/NavBar';

type Prop = {
  clubs: ClubType[];
};

const ClubBoard = (props: Prop) => {

  // keeps the list of clubs to be rendered, depending on search
  const [clubArray, setClubArray] = useState(props.clubs);

  useEffect(() => {
    setClubArray(props.clubs);
  }, [props.clubs]);

  function updateSearchText(text: string) {
    setClubArray(
      // remove all clubs that don't begin with search string
      props.clubs.filter(function (item: ClubType) {
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
      <div className="cardsContainer">
        {clubArray.length===0
        ? 
        <></>
        : 
        clubArray.map((club) => (
          <ClubCard clubName={club.name} clubCategory={club.category} clubID={club.id} />
        ))}
      </div>
    </>
  );
};

export default ClubBoard;
