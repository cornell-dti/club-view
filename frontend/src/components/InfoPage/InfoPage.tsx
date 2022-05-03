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
import { isConstructorTypeNode } from 'typescript';
import Favorites from '../Button/Favorites';
import axios from 'axios';

const InfoPage = () => {
  let params = useParams();
  const [club, setClub] = useState({
    name: '',
    category: '',
    email: '',
    description: '',
    socials: '',
    events: [],
    images: [],
  }); // useState hook stores club object from API calll in the club state

  // This useEffect is triggered only on component mount
  useEffect(() => {
    // NOTE: this just pulls the data from localhost
    axios.get('http://localhost:8000/clubs/' + params.id)
      .then((res) => console.log(res.data))
      //
      .then((res) => {
        console.log(res);
        //setClub(res);
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
  //  <a href={club.socials[0]} target="_blank" rel="noreferrer"> </a> around socials button
  //<img> class="img-club" src="" alt="club logo"</img>

  /*
  const checkImageLength = () => {
    const clubImages:Array<String> = club.images; 
    const length = clubImages.length; 
    return length; 
  }

  use <img src={checkImageLength() === 0 ? "" : club.images[0]}></img>
  */
  return (
    <>
      <NavBar hasSearch={false} />
      <div className="container">
        <div className="clubOuterContainer">
          <div className="clubContainer">
            <div className="profile">
             <img src="" alt="club logo"></img>
              <Favorites clubCard={false} />
            </div>
            <div className="name">
              <div className="nameText">{club.name}</div>
            </div>
            <div className="categories">
              <button className="category">{club.category}</button>
            </div>
            <div className="socials">
              
                <button className="socialsButton">
                  <FaInstagram /> INSTAGRAM
                </button>
              

              <button className="socialsButton">
                <FaFacebook /> FACEBOOK
              </button>

              <button className="socialsButton">
                <FaGlobe /> WEBSITE
              </button>

              <button className="socialsButton">
                <FaEnvelope /> LISTSERV
              </button>
            </div>
          </div>
        </div>
        <div className="infoContainer">
          <div className="statusContainer">
            <div className="statusContents">
              Recruitment has closed. Check back later for recruitment times
              next semester!
            </div>
          </div>
          <div className="descContainer">
            <div className="infoHeader">Description</div>
            <div className="descriptionContents">{club.description}</div>
          </div>
          <div className="eventsContainer">
            <div className="infoHeader">Events</div>
            {club.events}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPage;
