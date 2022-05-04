import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './InfoPage.css';
import NavBar from '../../components/NavBar/NavBar';
import SocialTag from '../Tags/SocialTags/SocialTag';
import FavoriteButton from '../Button/Favorites/FavoriteButton';
import CategoryTag from '../Tags/CategoryTags/CategoryTag';

const InfoPage = () => {
  let params = useParams();
  const [club, setClub] = useState({
    name: '',
    category: '',
    email: '',
    description: '',
    socials: [],
    events: [],
  }); // useState hook stores club object from API calll in the club state

  // This useEffect is triggered only on component mount
  useEffect(() => {
    // NOTE: this just pulls the data from localhost
    fetch('http://localhost:8000/clubs/' + params.id)
      .then((res) => res.json())
      //
      .then((res) => {
        console.log(res);
        setClub(res);
        console.log("here's the data" + res); // ok so the club object is in res
      })
      .then((data) => {
        console.log('DATAAA' + data); // data is undefined
        // setClub(data); // storing club ob in state variable
      });
  }, []);

  // .then(data => { // just added
  //   //   setClub(data);
  //   // }) // attempt
  return (
    <>
      <NavBar hasSearch={false} />
      <div className="container">
        <div className="clubOuterContainer">
          <div className="clubContainer">
            <div className="profile">
              <FavoriteButton clubCard={false} />
            </div>
            <div className="name">
              <div className="nameText">Name</div>
              <div className="superCat">The Arts</div>
            </div>

            <div className="categories">
              <CategoryTag title="Category" large={true} />
            </div>
            <div className="socials">
              <SocialTag socialName='instagram' />
              <SocialTag socialName='facebook' />
              <SocialTag socialName='listserv' />
              <SocialTag socialName='globe' />
            </div>
          </div>
        </div>
        <div className="infoContainer">
          <div className="statusContainer infoBox">
            <div className="statusContents">
              Recruitment has closed. Check back later for recruitment times
              next semester!
            </div>
          </div>
          <div className="descContainer infoBox">
            <div className="infoHeader">Description</div>
            <div className="descriptionContents">{club.description}</div>
          </div>
          <div className="eventsContainer infoBox">
            <div className="infoHeader">Events</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPage;
