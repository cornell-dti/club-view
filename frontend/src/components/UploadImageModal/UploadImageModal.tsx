import React, { useState } from 'react';
import './UploadImageModal.css';

// Required props: whether to show the component or not, and a callback to notify the parent component to close the component
interface RequiredProps {
  show: boolean;
  onClose: () => void;
}

// Optional props: pass the file back to the master component in case it's needed, or trigger some other action on close
interface OptionalProps {
  sendFile: (file: File) => void;
}

// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  sendFile: (file: File) => {},
};

const UploadImageModal = (props: Props) => {
  const closeModal = (sendFile: boolean) => {
    // if we clicked on the Upload button, send the file back and do something with it
    if (sendFile && selectedFile !== undefined) {
      props.sendFile(selectedFile);

      // TODO: do something with the selected file
    }

    // if we just clicked out of the Modal, just let the parent component close it
    props.onClose();

    // also, reset the file stored within the modal
    setSelectedFile(undefined);
  };

  const [selectedFile, setSelectedFile] = useState<File>();

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  if (!props.show) {
    return <></>;
  } else {
    return (
      <div className="modal">
        <div className="modalContent">
          <div className="modalHeader">
            <div className="modalTitle">Add a Link</div>
            <a href="#" className="close" onClick={() => closeModal(false)} />
          </div>
          <div className="modalBody">
            <input type="file" name="file" onChange={changeHandler} />

            {selectedFile !== undefined ? (
              <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
              </div>
            ) : (
              <p>Select a file to show details</p>
            )}
          </div>
          <div className="modalFooter">
            <button onClick={() => closeModal(true)}>Done</button>
          </div>
        </div>
      </div>
    );
  }
};

UploadImageModal.defaultProps = defaultProps;

export default UploadImageModal;
