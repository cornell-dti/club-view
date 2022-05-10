import React, { useState } from 'react';
import './ClubRegistration.css';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar, { sidebarItems } from './Sidebar/Sidebar';
import TextInput from './StyledInputs/TextInput/TextInput';
import TextBox from './StyledInputs/TextBox/TextBox';
import TagSelector from './StyledInputs/TagSelector/TagSelector';
import LinkSelector from './StyledInputs/LinkSelector/LinkSelector';
import SznDropdown from './StyledInputs/SznDropdown/SznDropdown';

import { Seasons } from './Dropdown/seasons';
import { CategoryType } from './Dropdown/categories';
import DateSelector from './StyledInputs/DateSelector/DateSelector';

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
  const [tags, setTags] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [season, setSeason] = useState('');

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
        <TextInput title={'Club Name'} value={name} onChange={setName} />

        <SznDropdown
          title={'Category'}
          callback={setCategory}
          options={CategoryType}
        />

        <TextBox title={'Club Description'} value={descr} onChange={setDescr} />

        <TagSelector callback={setTags} />

        <LinkSelector callback={setLinks} />
      </div>
    </form>
  );
  // 1: Recruitment page
  pages.push(
    <form className="registration">
      <SznDropdown
        callback={setSeason}
        options={Seasons}
        title={'Recruitment Season'}
      />
      <div className="row">
        <DateSelector title={'Recruitment Start Date'} callback={setOpenDate} />
        <DateSelector title={'Recruitment End Date'} callback={setCloseDate} />
      </div>
      <TextInput
        title={'Application Link'}
        value={URL}
        onChange={setURL}
        placeholder={'Add a link so that people can easily apply!'}
      />

      <TextBox
        title={'Add a Message'}
        value={message}
        onChange={setMessage}
        placeholder={'Begin writing out a personalized message here!'}
      />
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
        <div className="displayed-page">
          {pages.map((element, index) => (
            <div
              className={currentDisplay === index ? 'page-show' : 'page-hide'}
            >
              {element}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClubRegistration;
