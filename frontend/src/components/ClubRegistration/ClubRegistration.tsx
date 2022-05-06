import React, { useState } from 'react';
import './ClubRegistration.css';
import Dropdown from './Dropdown/Dropdown';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar, { sidebarItems } from './Sidebar/Sidebar';
import FRSbutton from '../Button/FRSbutton';

const ClubRegistration = () => {
  // Control the sidebar value to indicate which page we're on (indexed 0-3 in reference to sidebarItems)
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);

  // Controlled values for all the form elements
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [descr, setDescr] = useState('');
  const [URL, setURL] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [closeDate, setCloseDate] = useState('');

  // Function to submit the data to the backend
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    alert('Submit Action Triggered!');

    //NOT IMPLEMENTED: SUBMIT DATA STORED IN REACT HOOKS TO BACKEND
  }

  function changeDisplayedPage(newIndex: number) {
    setCurrentDisplay(newIndex);
  }

  const pages = [];

  // 0: Profile (default registration page)
  pages.push(
    <form className="registration">
      <label>
        Enter your Club Name: <br />
        <input
          name="clubName"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <Dropdown callback={setCategory} />

      <label>
        Enter your Email: <br />
        <input
          name="clubEmail"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label>
        Enter a Description of your Club: <br />
        <textarea
          name="clubDescr"
          value={descr}
          onChange={(event) => setDescr(event.target.value)}
        />
      </label>

      <label>
        Enter a link to your Club Website: <br />
        <input
          name="clubURL"
          type="text"
          value={URL}
          onChange={(event) => setURL(event.target.value)}
        />
      </label>

      <label>
        Enter the Opening Date: <br />
        <input
          name="clubOpenDate"
          type="date"
          value={openDate}
          onChange={(event) => setOpenDate(event.target.value)}
        />
      </label>

      <label>
        Enter the Closing Date: <br />
        <input
          name="clubCloseDate"
          type="date"
          value={closeDate}
          onChange={(event) => setCloseDate(event.target.value)}
        />
      </label>

      <button onClick={(e) => handleSubmit(e)}>Submit</button>
      
        
    </form>
    
  );
  // 1: Recruitment page
  pages.push(<h1>Club Recruitment Page</h1>);
  // 2: Description page
  pages.push(<h1>Club Description Page</h1>);
  // 3: Club Events page
  pages.push(<h1>Club Events Page</h1>);

  return (
    <>
      <NavBar hasSearch={false} />
      <div className="page-container">
        <Sidebar currentItem={currentDisplay} callback={changeDisplayedPage} />
        <div className="displayed-page">{pages[currentDisplay]}</div>
      </div>
      <FRSbutton buttonType={'Finish'} text={'Finish'}></FRSbutton>
      <FRSbutton buttonType={'Save'} text={'Save'}></FRSbutton>
    </>
  );
};

export default ClubRegistration;
