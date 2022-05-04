import './ClubCard.css';
import IndicatorIcon from '../../assets/indicator.svg';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../Button/Favorites/FavoriteButton';

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
      <div className="infoSpace">
        <div className="clubName">{props.clubName}</div>
        <div className="clubCategory">{props.clubCategory}</div>
        {/* TODO: check user's favorites list and see if this club is in that list. if so, make the favorites icon filled in already */}
        <FavoriteButton clubCard={true} />
      </div>
      <img className="indicatorIcon" src={IndicatorIcon} alt="indicatorIcon" />
    </div>
  );
};

export default ClubCard;
