import React, { useState } from 'react';
import './UploadImageModal.css';
import { xButton, imgIcon, cloud } from '../../icons/image-modal';

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

function isAnImage(file: string) {
  return 'jpg png jpeg gif'.includes(getFileExt(file));
}

const UploadImageModal = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File>();

  let defaultMessage = '';
  let tooManyFilesMsg = 'Only one file at a time please!';
  let notAnImgMsg = "This file isn't a valid image!";
  let notAFileMsg = "This isn't a valid file!";
  const [message, setMessage] = useState(defaultMessage);

  const [hoveringDrop, setHoveringDrop] = useState(false);

  function updateFile(file: File | undefined) {
    setSelectedFile(file);
    setMessage(defaultMessage);
    setHoveringDrop(false);
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
    if (isAnImage(event.target.files[0].name)) {
      updateFile(event.target.files[0]);
    } else {
      setMessage(notAnImgMsg);
      setHoveringDrop(false);
    }
  };

  const handleDrop = (ev: any) => {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      if (ev.dataTransfer.items.length > 1) {
        setMessage(tooManyFilesMsg);
        setHoveringDrop(false);
      } else {
        if (ev.dataTransfer.items[0].kind === 'file') {
          var file = ev.dataTransfer.items[0].getAsFile();
          if (isAnImage(file.name)) {
            updateFile(file);
          } else {
            setMessage(notAnImgMsg);
            setHoveringDrop(false);
          }
        } else {
          setMessage(notAFileMsg);
          setHoveringDrop(false);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      if (ev.dataTransfer.files.length > 1) {
        setMessage(tooManyFilesMsg);
        setHoveringDrop(false);
      } else {
        updateFile(ev.dataTransfer.files[0]);
      }
    }
  };

  const handleDragOver = (ev: any) => {
    // TODO: animate the drop zone on hover ??
    setHoveringDrop(true);

    // setTimeout(function () {
    //   setHoveringDrop(false);
    // }, 5000); //turn it back to grey in 5 seconds

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
            <div className="fileinfozone">
              {selectedFile !== undefined ? (
                <div className="fileinfo">
                  <div className="fileNameAndIcon">
                    <div className="fileIconWrapper">
                      <img
                        className="fileIcon"
                        height="20"
                        src={imgIcon}
                        alt="Icon"
                      />
                    </div>
                    <p className="filename">{selectedFile.name}</p>
                  </div>
                  <div className="fileIconWrapper">
                    <img
                      className="closeIcon"
                      src={xButton}
                      alt="Close the dialog"
                      onClick={() => updateFile(undefined)}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="dropzonewrapper">
              <div
                className={hoveringDrop ? 'dropzoneHovering' : 'dropzone'}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {
                  // if the message is the default, that means we have no errors. display the default cloud icon:
                  message === defaultMessage ? (
                    <div className="infoCloud">
                      <img
                        className="cloudIcon"
                        height="80"
                        src={cloud}
                        alt="Icon"
                      />
                      <br />
                      Drag files here <br /> or
                    </div>
                  ) : (
                    // otherwise, display an error message only
                    <div className="errorMessage">{message}</div>
                  )
                }

                <label htmlFor="hiddenFileInput" className="browseFiles">
                  Browse Photos
                </label>
                <input
                  className="hiddenFileInput"
                  id="hiddenFileInput"
                  type="file"
                  name="file"
                  onChange={changeHandler}
                />
              </div>
            </div>
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
