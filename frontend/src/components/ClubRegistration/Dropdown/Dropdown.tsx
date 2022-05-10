import React, { useState } from 'react';
import './Dropdown.css';
import { CategoryType } from './categories';

const Dropdown = ({ callback }: { callback: any }) => {
  // Helper function to convert the strings in the imported enum to human-readable Title Case so no hard-coding is necessary
  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // When a Category selection is made, we call the callback that was passed in to notify the parent component
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
    callback(event.target.value);
  }

  const [value, setValue] = useState('');

  return (
    <fieldset className="styled-select-input">
      <legend className="styled-select-input">
        &nbsp;Category&nbsp;
        <br />
      </legend>

      <select
        className="styled-select-input"
        value={value}
        onChange={handleChange}
      >
        {(Object.values(CategoryType) as Array<string>).map((value) => (
          <option value={value}> {toTitleCase(value)} </option>
        ))}
      </select>
    </fieldset>
  );
};

export default Dropdown;
