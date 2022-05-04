import './FavoriteButton.css';
import FavouriteIcon from '../../../assets/favourite.svg';
import FilledFavoriteIcon from '../../../assets/filledFavorite.svg';
import FavoriteInfoIcon from '../../../assets/favoriteInfo.svg';
import FilledFavoriteInfoIcon from '../../../assets/filledFavoriteInfo.svg';
import { useState } from 'react';
interface Props {
  clubCard: boolean;
}
const FavoriteButton = (props: Props) => {
  const [isFavorite, setFavorite] = useState(false);
  const className = props.clubCard ? 'clubCard' : 'clubInfo';

  return (
    <button
      className={className}
      onClick={(event) => {
        event.stopPropagation();
        setFavorite(!isFavorite);
      }}
      type="button"
    >
      {props.clubCard ? (
        <img
          src={isFavorite ? FilledFavoriteIcon : FavouriteIcon}
          alt="favouriteIcon"
        />
      ) : (
        <img
          className="favoriteIcon"
          src={isFavorite ? FilledFavoriteInfoIcon : FavoriteInfoIcon}
          alt="Favorite Icon"
        />
      )}
    </button>
  );
};

export default FavoriteButton;
