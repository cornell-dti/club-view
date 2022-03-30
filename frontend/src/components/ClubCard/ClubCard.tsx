import React, { useEffect, useState } from 'react';
import './ClubCard.css';
import FavouriteIcon from '../../assets/favourite.svg';
import IndicatorIcon from '../../assets/indicator.svg';
import { useNavigate } from 'react-router-dom';
import { getStatus } from '../../util/clubs';
import { Club } from '../../util/types';

type Prop = {
  clubName: string;
  clubCategory: string;
  clubID: string;
};

const ClubCard = (props: Club) => {
  const status = getStatus(props);
  const navigateTo = useNavigate();

  return (
    <div
      className="cardContainer"
      onClick={() => {
        navigateTo('/clubs/' + props.id);
      }}
    >
      <div className="clubIcon" />
      <div className="infoContainer">
        <div className="clubName">{props.name}</div>
        <div className="clubCategory">{props.category}</div>
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
