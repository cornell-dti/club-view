import React from 'react';
import './ClubCard.css';
import FavouriteIcon from '../../assets/favourite.svg';
import IndicatorIcon from '../../assets/indicator.svg';

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
      <img className="favouriteIcon" src={FavouriteIcon} alt="favouriteIcon" />
      <img className="indicatorIcon" src={IndicatorIcon} alt="indicatorIcon" />
    </div>
  );
};

export default ClubCard;
