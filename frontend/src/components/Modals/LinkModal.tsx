import React from 'react';
import './LinkModal.css';

type LinkModalProps = {
  show: boolean;
  onClose: () => void;
};

const LinkModal = (props: LinkModalProps) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modalContent">
        <div className="modalHeader">
          <div className="modalTitle">Add a Link</div>
        </div>
        <div className="modalBody">Modal Content</div>
        <div className="modalFooter">
          <button className="button" onClick={props.onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
