import React, { useState } from 'react';
import './DateSelector.css';

// Required props
interface RequiredProps {
  callback: any;
  title: string;
}

// Optional props
interface OptionalProps {
  placeholder: string;
  disabled: boolean;
}

// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  placeholder: '',
  disabled: false,
};

const DateSelector = (props: Props) => {
  const [value, setValue] = useState('');

  // TODO: once the designers are ready, export the proper calendar icon from figma and put it on the right in the input

  return (
    <fieldset className="styled-text-input" disabled={props.disabled}>
      <legend className="styled-text-input">
        &nbsp;{props.title}&nbsp;
        <br />
      </legend>
      <input
        name="clubName"
        className="styled-text-input"
        type="date"
        value={value}
        onChange={(event) => {
          props.callback(event.target.value);
          setValue(event.target.value);
        }}
        placeholder={props.placeholder}
      />
    </fieldset>
  );
};

DateSelector.defaultProps = defaultProps;

export default DateSelector;
