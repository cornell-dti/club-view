import React, { useState } from 'react';
import './HelperComponentStyles.css';

interface Props {
  callback: () => void;
  child: React.ReactNode;
  depressed: boolean;
  orientation: number; // 0 indicates horizontal, 1 indicates vertical
}

const OrientedButton = (props: Props) => {
  return (
    <button
      className={
        (props.orientation === 1 ? 'vert' : 'horiz') +
        '-modal-seq-btn-' +
        (props.depressed ? 'dep' : 'norm')
      }
      onClick={() => props.callback()}
    >
      <div className={props.orientation === 1 ? 'vert-text-form' : ''}>
        {props.child}
      </div>
    </button>
  );
};

export default OrientedButton;
