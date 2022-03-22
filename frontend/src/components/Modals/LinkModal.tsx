import React, { useState } from 'react';
import './LinkModal.css';

type LinkModalProps = {
  show: boolean;
  onClose: () => void;
};

let dummySocials: string[] = Array(11).fill('Instagram');

const LinkModal = (props: LinkModalProps) => {
  const [value, setValue] = useState('');
  const [socials, setSocials] = useState();
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modalContent">
        <div className="modalHeader">
          <div className="modalTitle">Add a Link</div>
          <a href="#" className="close" onClick={props.onClose} />
        </div>
        <div className="modalBody">
          <input
            className="linkField"
            type="text"
            placeholder="Begin typing link here..."
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="socialTitle">Select an option</div>
          <div className="socialContainer">
            {dummySocials.map((link) => {
              return <button className="socialLinkContainer">{link}</button>;
            })}
          </div>
        </div>
        <div className="modalFooter">
          <button className="saveButton" onClick={props.onClose}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
