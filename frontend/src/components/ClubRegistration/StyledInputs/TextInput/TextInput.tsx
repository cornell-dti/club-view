import React, { useState } from 'react';
import './TextInput.css';

// Required props
interface RequiredProps {
  value: string;
  onChange: any;
}

// Optional props
interface OptionalProps {}

// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {};

const TextInput = (props: Props) => {
  return (
    <fieldset className="styled-text-input">
      <legend className="styled-text-input">
        &nbsp;Club Name&nbsp;
        <br />
      </legend>
      <input
        name="clubName"
        className="styled-text-input"
        type="text"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </fieldset>
  );
};

TextInput.defaultProps = defaultProps;

export default TextInput;
