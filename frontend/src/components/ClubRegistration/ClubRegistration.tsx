import React, { useState } from 'react';
import './ClubRegistration.css';
import Dropdown from './Dropdown/Dropdown';

const ClubRegistration = () => {
  // Controlled values for all the form elements
  // As per outlined in types.ts, should all be stored as Strings
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
    alert('submitted!');

    //TODO: SUBMIT DATA STORED IN REACT HOOKS TO BACKEND
  }

  return (
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
};

export default ClubRegistration;
