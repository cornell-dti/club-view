import React, { useState } from 'react';
import './TextInput.css';

// Required props
interface RequiredProps {
  value: string;
  onChange: any;
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

const TextInput = (props: Props) => {
  return (
    <fieldset className="styled-text-input" disabled={props.disabled}>
      <legend className="styled-text-input">
        &nbsp;{props.title}&nbsp;
        <br />
      </legend>
      <input
        name="clubName"
        className="styled-text-input"
        type="text"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        placeholder={props.placeholder}
      />
    </fieldset>
  );
};

TextInput.defaultProps = defaultProps;

export default TextInput;
