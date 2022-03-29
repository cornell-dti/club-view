import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './InfoPage.css';
import NavBar from '../../components/NavBar/NavBar';
import { facebookIcon } from '../../icons/tags';
import { instragramIcon } from '../../icons/tags';
import SocialTag from '../Tags/SocialTags/SocialTag';
import { FaInstagram } from "react-icons/fa"; 

const InfoPage = () => {
  let params = useParams();

  // This useEffect is triggered only on component mount
  useEffect(() => {
    // NOTE: this just pulls the data from localhost
    fetch('http://localhost:8000/clubs/' + params.id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <>
      <NavBar hasSearch={false} />
      <div className="container">
        <div className="clubOuterContainer">
          <div className="clubContainer">
            <div className="profile">

            </div>
            <div className="name">

            </div>
            <div className="categories">
              <div className="category">
                Performance 
              </div>
              
            </div>
            <div className="socials">
              <button className="socialsButton">
                <FaInstagram/> INSTAGRAM 
              </button>

              <button className="socialsButton">
                FACEBOOK 
              </button>

              <button className="socialsButton">
                WEBSITE 
              </button>

              <button className="socialsButton">
                LISTSERV 
              </button>
            </div>
          </div>
        </div>
        <div className="infoContainer">
          <div className="statusContainer"></div>
          <div className="descContainer"></div>
          <div className="eventsContainer"></div>
        </div>
      </div>
    </>
  );
};

export default InfoPage;
