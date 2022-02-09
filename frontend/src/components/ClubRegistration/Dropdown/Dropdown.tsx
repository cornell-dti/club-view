import React, { useState } from 'react';
import './Dropdown.css';
// import { ClubType, CategoryType } from '../../../../../backend/types/types'; // ISSUE: This throws an error, but ClubBoard.tsx's import does not. Why?
import { CategoryType } from './categories'; // This is a suboptimal work-around to the above import problem.

const Dropdown = ({callback}: {callback: any}) => {

  // Helper function to convert the strings in types.ts to human-readable Title Case so
  // no hard-coding is necessary
  function toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
    callback(event.target.value);
  }

  const [value, setValue] = useState("");

  return (
    <label>
      Select a Club Category <br/>
      <select value={value} onChange={handleChange}>
        {(Object.values(CategoryType) as Array<string>).map((value) => (
          <option value={value}> {toTitleCase(value)} </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
