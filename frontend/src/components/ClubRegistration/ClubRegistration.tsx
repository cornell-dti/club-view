import React, { useState } from 'react';
import './ClubRegistration.css';
import Dropdown from './Dropdown/Dropdown';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar, { sidebarItems } from './Sidebar/Sidebar';

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

  const [photoURL, setPhotoURL] = useState(
    'https://yt3.ggpht.com/bbfIGY1xoj_-qDTcA5mQKTCeSXwHHhxePgUidXFF150w9dqUoVTST58aQDEr-VwjNXsDCRaosQ=s900-c-k-c0x00ffffff-no-rj'
  ); // TODO: set this to pull the proper image from the backend

  // Function to submit the data to the backend
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    alert('Submit Action Triggered!');

    //TODO NOT IMPLEMENTED: SUBMIT DATA STORED IN REACT HOOKS TO BACKEND
  }

  function triggerPhotoUpload(event: any): void {
    event.preventDefault();
    alert('Photo upload triggered!');

    //TODO: UPLOAD/EDIT PHOTO (modify photoURL hook)
  }

  function changeDisplayedPage(newIndex: number) {
    setCurrentDisplay(newIndex);
  }

  const pages = [];

  // TODO FOR DAN: IMPLEMENT THE BELOW (IN GOOGLE MUI)
  // ADDITIONALLY, IMPLEMENT TAGS ? perhaps adding a new tag to a globally maintained list of tags

  // Profile:
  // - club name
  // - category
  // - tags (need to add)
  // - links (need to modify)

  // Recruitment Banner:
  // - Recruitment Season (need to add)
  // - Recruitment Start Date and End Date (Date Selectors)
  // - Application Link (need to add)
  // - Message (need to add)

  // 0: Profile (default registration page)
  pages.push(
    <form className="profile">
      <div className="edit-photo">
        <div className="photo-click-zone" onClick={triggerPhotoUpload}>
          <img className="club-photo" src={photoURL} alt="Club Logo" />
        </div>
        <span className="photo-caption" onClick={triggerPhotoUpload}>
          Change or Upload a Photo
        </span>
      </div>
      <div className="edit-inputs">
        <label>
          Club Name: <br />
          <input
            name="clubName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <Dropdown callback={setCategory} />

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
      </div>
    </form>
  );
  // 1: Recruitment page
  pages.push(
    <form className="registration">
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
    </form>
  );
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
    </>
  );
};

export default ClubRegistration;
