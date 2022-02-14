import React from 'react';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className='navBar'>
            <div className='searchBar'></div>
        
            <style> 
                @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
            </style>
            <div className='clubviewHeader'>clubview.</div>
            <div className='defaultText'>search clubs...</div>
            
            <div className="registerClubsLeft"></div>
            <div className="registerClubsRight"></div>
            <div className="registerClubs">
                <div className="registerClubsText">Register Clubs</div>
            </div>

            
            <div className="profilePic"></div>


        </div>
    );
};

export default NavBar;