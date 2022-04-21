import React, { useState } from 'react';
import './HelperComponentStyles.css';

// Required props
interface RequiredProps {
  procedure: number; // either 0 (no arrow == "Save"), -1 (back arrow == "Back"), or 1 (forward arrow == "Next")
  onClick: () => void;
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

const ModalController = (props: Props) => {
  let text: string = '';
  if (props.procedure === -1) text = 'Back';
  else if (props.procedure === 0) text = 'Save';
  else if (props.procedure === 1) text = 'Next';
  return (
    <>
      <button onClick={() => props.onClick()} disabled={props.disabled}>
        {text}
      </button>
    </>
  );
};

ModalController.defaultProps = defaultProps;

export default ModalController;
