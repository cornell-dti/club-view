import React, { useState } from 'react';
import './HelperComponentStyles.css';

interface Props {
  callback: () => void;
  child: React.ReactNode;
  depressed: boolean;
}

const HorizButton = (props: Props) => {
  return (
    <button
      className={'horiz-modal-seq-btn-' + (props.depressed ? 'dep' : 'norm')}
      onClick={() => props.callback()}
    >
      {props.child}
    </button>
  );
};

export default HorizButton;
