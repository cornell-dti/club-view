import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './InfoPage.css';
import NavBar from '../../components/NavBar/NavBar';
import { facebookIcon } from '../../icons/tags';
import { instragramIcon } from '../../icons/tags';
import SocialTag from '../Tags/SocialTags/SocialTag';
import {
  FaExternalLinkAlt,
  FaFacebook,
  FaInstagram,
  FaGlobe,
  FaEnvelope,
} from 'react-icons/fa';
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
              <CategoryTag title='Category' large={true}/>
            </div>
            <div className="socials">
              <a href={club.socials[0]} target="_blank" rel="noreferrer">
                <button className="socialsButton">
                  <FaInstagram /> INSTAGRAM
                </button>
              </a>

              <button className="socialsButton">
                <FaGlobe /> WEBSITE
              </button>

              <button className="socialsButton">
                <FaFacebook /> FACEBOOK
              </button>

              <button className="socialsButton">
                <FaEnvelope /> LISTSERV
              </button>
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
