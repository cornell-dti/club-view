import React, { useState } from 'react';
import './Modal.css';

// Required props
interface RequiredProps {
  show: boolean;
  onClose: () => void;

  title: string;
  bodyChildren: React.ReactNode;
  showSubmitButton: boolean;
}

// Optional props
interface OptionalProps {
  onSubmit: () => void;
}

// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  onSubmit: () => console.log('Submitted Modal'),
};

const Modal = (props: Props) => {
  if (!props.show) {
    return <></>;
  } else {
    return (
      <div className="modal">
        <div className="modalContent">
          <div className="modalHeader">
            <div className="modalTitle">{props.title}</div>
            <a href="#" className="close" onClick={() => props.onClose()} />
          </div>
          <div className="modalBody">{props.bodyChildren}</div>
          <div className="modalFooter">
            {props.showSubmitButton ? (
              <button
                className="doneButton"
                onClick={() => {
                  props.onClose();
                  props.onSubmit();
                }}
              >
                Done
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
};

Modal.defaultProps = defaultProps;

export default Modal;
