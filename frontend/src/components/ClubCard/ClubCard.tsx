import React from 'react';
import './ClubCard.css';
import FavouriteIcon from '../../assets/favourite.svg';
import IndicatorIcon from '../../assets/indicator.svg';
import { useNavigate } from 'react-router-dom';

type Prop = {
  clubName: string;
  clubCategory: string;
  clubID: string;
};

const ClubCard = (props: Prop) => {
  const navigateTo = useNavigate();

  return (
    <div
      className="cardContainer"
      onClick={() => {
        navigateTo('/clubs/' + props.clubID);
      }}
    >
      <div className="clubIcon" />
      <div className="infoContainer">
        <div className="clubName">{props.clubName}</div>
        <div className="clubCategory">{props.clubCategory}</div>
      </div>
      <img
        className="favouriteIcon"
        src={FavouriteIcon}
        alt="favouriteIcon"
        onClick={(e) => {
          // TODO: ADD CLUB TO THIS USER'S FAVORITES
          e.stopPropagation(); //prevent event bubbling-up triggering a reroute to the club info page
        }}
      />
      <img className="indicatorIcon" src={IndicatorIcon} alt="indicatorIcon" />
    </div>
  );
};

export default ClubCard;
