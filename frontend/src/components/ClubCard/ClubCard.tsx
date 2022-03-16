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
    <div className="cardContainer" onClick={() => { 
      console.log('clicked on card');
      // TODO: ROUTE TO CLUB INFO PAGE
    }}>
      <div className="clubIcon" />
      <div className="infoContainer">
        <div className="clubName">{props.clubName}</div>
        <div className="clubCategory">{props.clubCategory}</div>
      </div>
      <img className="favouriteIcon" src={FavouriteIcon} alt="favouriteIcon" onClick={(e) => {
        console.log('clicked on favorites!');
        // TODO: ADD CLUB TO THIS USER'S FAVORITES
        e.stopPropagation(); //prevent event bubbling-up triggering a reroute to the club info page
      }}/>
      <img className="indicatorIcon" src={IndicatorIcon} alt="indicatorIcon" />
    </div>
  );
};

export default ClubCard;
