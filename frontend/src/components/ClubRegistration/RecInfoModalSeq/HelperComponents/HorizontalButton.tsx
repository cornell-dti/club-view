import React, { useState } from 'react';
import './HelperComponentStyles.css';

interface Props {
  callback: () => void;
  text: string;
  depressed: boolean;
}

const HorizButton = (props: Props) => {
  return (
    <button
      className={'horiz-modal-seq-btn-' + (props.depressed ? 'dep' : 'norm')}
      onClick={() => props.callback()}
    >
      {props.text}
    </button>
  );
};

export default HorizButton;
