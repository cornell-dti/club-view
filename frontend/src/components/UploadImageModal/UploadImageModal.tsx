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

function getFileExt(fname: string) {
  return fname.slice(((fname.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
}

const UploadImageModal = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File>();

  let defaultMessage = 'Drag files here \n or';
  let tooManyFilesMsg = 'Only one file at a time please!';
  let notAnImgMsg = "This file isn't an image!";
  let notAFileMsg = "This isn't a valid file.";
  const [message, setMessage] = useState(defaultMessage);

  function updateFile(file: File | undefined) {
    setSelectedFile(file);
    setMessage(defaultMessage);
  }

  const closeModal = (sendFile: boolean) => {
    // if we clicked on the Upload button, send the file back and do something with it
    if (sendFile && selectedFile !== undefined) {
      props.sendFile(selectedFile);

      // TODO: do something with the selected file
    }

    // if we just clicked out of the Modal, just let the parent component close it
    props.onClose();

    // also, reset the file stored within the modal
    updateFile(undefined);
  };

  const changeHandler = (event: any) => {
    updateFile(event.target.files[0]);
  };

  const handleDrop = (ev: any) => {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      if (ev.dataTransfer.items.length > 1) {
        setMessage(tooManyFilesMsg);
      } else {
        if (ev.dataTransfer.items[0].kind === 'file') {
          var file = ev.dataTransfer.items[0].getAsFile();
          if ('jpg png jpeg gif'.includes(getFileExt(file.name))) {
            updateFile(file);
          } else {
            setMessage(notAnImgMsg);
          }
        } else {
          setMessage(notAFileMsg);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      if (ev.dataTransfer.files.length > 1) {
        setMessage(tooManyFilesMsg);
      } else {
        updateFile(ev.dataTransfer.files[0]);
      }
    }
  };

  const handleDragOver = (ev: any) => {
    console.log('File(s) in drop zone');

    // TODO: animate the drop zone on hover ??

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
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
            <div
              className="dropzone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <p>{message}</p>
              <input type="file" name="file" onChange={changeHandler} />
            </div>

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
            <button className="doneButton" onClick={() => closeModal(true)}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }
};

UploadImageModal.defaultProps = defaultProps;

export default UploadImageModal;
