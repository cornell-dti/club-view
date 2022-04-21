import React, { useState } from 'react';
import './HelperComponentStyles.css';
import {
  back,
  next,
  lightNext,
  darkBack,
} from '../../../../icons/rec-info-seq-modal';

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
      <button
        className={'slide-button' + (props.disabled ? '-disabled' : '')}
        onClick={() => props.onClick()}
        disabled={props.disabled}
      >
        {props.procedure === -1 ? (
          <img className="slide-icon" height="15" src={back} alt="Icon" />
        ) : (
          <></>
        )}
        <span style={props.procedure === -1 ? { color: '#C7C7C7' } : {}}>
          {text}
        </span>
        {props.procedure === 1 ? (
          <img
            className="slide-icon"
            height="15"
            src={props.disabled ? lightNext : next}
            alt="Icon"
          />
        ) : (
          <></>
        )}
      </button>
    </>
  );
};

ModalController.defaultProps = defaultProps;

export default ModalController;
