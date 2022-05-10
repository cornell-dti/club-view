import React, { useState } from 'react';
import './SznDropdown.css';

// Required props
interface RequiredProps {
  options: any;
  callback: any;
  title: string;
}

// Optional props
interface OptionalProps {
  disabled: boolean;
}

// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  disabled: false,
};

const Dropdown = (props: Props) => {
  // Helper function to convert the strings in the imported enum to human-readable Title Case so no hard-coding is necessary
  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // When a Category selection is made, we call the callback that was passed in to notify the parent component
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
    props.callback(event.target.value);
  }

  const [value, setValue] = useState('');

  return (
    <fieldset className="styled-select-input" disabled={props.disabled}>
      <legend className="styled-select-input">
        &nbsp;{props.title}&nbsp;
        <br />
      </legend>

      <select
        className="styled-select-input"
        value={value}
        onChange={handleChange}
      >
        {(Object.values(props.options) as Array<string>).map((value) => (
          <option value={value}> {toTitleCase(value)} </option>
        ))}
      </select>
    </fieldset>
  );
};

Dropdown.defaultProps = defaultProps;

export default Dropdown;
