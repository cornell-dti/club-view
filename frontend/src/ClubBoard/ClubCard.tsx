import React from 'react';
import './ClubCard.css';

type Prop = {
  clubName: string;
  clubCategory: string;
};

const ClubCard = (props: Prop) => {
  return (
    <div className="cardContainer">
      <div className="clubIcon" />
      <div className="infoContainer">
        <div className="clubName">{props.clubName}</div>
        <div className="clubCategory">{props.clubCategory}</div>
      </div>
    </div>
  );
};

export default ClubCard;
