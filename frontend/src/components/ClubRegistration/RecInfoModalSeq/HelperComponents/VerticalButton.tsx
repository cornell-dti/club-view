import React, { useState } from 'react';
import './HelperComponentStyles.css';

interface Props {
  callback: () => void;
  text: string;
  depressed: boolean;
}

const VertButton = (props: Props) => {
  return (
    <button
      className={'vert-modal-seq-btn-' + (props.depressed ? 'dep' : 'norm')}
      onClick={() => props.callback()}
    >
      {props.text}
    </button>
  );
};

export default VertButton;
