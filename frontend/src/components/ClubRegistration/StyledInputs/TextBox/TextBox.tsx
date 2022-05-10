import React, { useState } from 'react';
import './TextBox.css';

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

const TextBox = (props: Props) => {
  return (
    <fieldset className="styled-text-input">
      <legend className="styled-text-input">
        &nbsp;Club Description&nbsp;
        <br />
      </legend>
      <textarea
        name="clubName"
        className="styled-text-input"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </fieldset>
  );
};

TextBox.defaultProps = defaultProps;

export default TextBox;
