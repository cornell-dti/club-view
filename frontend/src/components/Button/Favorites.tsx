import './Favorites.css';

const Favorites = (clubCard: boolean) => {
  const className = clubCard ? 'clubCard' : 'clubInfo';
  return (
    <button className={className} onClick={() => {}} type="button"></button>
  );
};

export default Favorites;
