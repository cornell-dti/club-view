import React, { useEffect, useState } from 'react';
import './ClubCard.css';
import IndicatorIcon from '../../assets/indicator.svg';
import { useNavigate } from 'react-router-dom';
import { getStatus } from '../../util/clubs';
import { Club } from '../../util/types';
import Favorites from '../Button/Favorites';

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
        {/* TODO: check user's favorites list and see if this club is in that list. if so, make the favorites icon filled in already */}
        <Favorites clubCard={true} />
      </div>
      <img className="indicatorIcon" src={IndicatorIcon} alt="indicatorIcon" />
    </div>
  );
};

export default ClubCard;
