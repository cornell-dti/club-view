import React, { useState } from 'react';
import './HelperComponentStyles.css';

interface Props {
  callback: () => void;
  child: React.ReactNode;
  depressed: boolean;
}

const VertButton = (props: Props) => {
  return (
    <button
      className={'vert-modal-seq-btn-' + (props.depressed ? 'dep' : 'norm')}
      onClick={() => props.callback()}
    >
      <div className="vert-text-form">{props.child}</div>
    </button>
  );
};

export default VertButton;
