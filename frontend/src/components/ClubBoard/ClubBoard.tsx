import React, { useEffect, useState } from 'react';
import ClubCard from '../ClubCard/ClubCard';
import Filter from '../Filter/Filter';
import { ClubType } from '../../../../backend/types/types';
import './ClubBoard.css';
import NavBar from '../NavBar/NavBar';
import Modal from '../Modal/Modal';

// FOR UPLOAD IMAGE MODAL
import { xButton, imgIcon, cloud } from '../../icons/image-modal';

const ClubBoard = () => {
  const [origClubs, setOrigClubs] = useState<ClubType[]>([]); // an array of all clubs

  // This useEffect is triggered only on component mount
  useEffect(() => {
    // Assuming the backend is already running before starting the frontend,
    // we should load clubs on mount rather than on render.

    // NOTE: this just pulls the data from localhost
    fetch('http://localhost:8000/clubs')
      .then((res) => res.json())
      .then((data) => {
        setOrigClubs(data);
      });
  }, []);

  // keeps the list of clubs to be rendered, depending on search
  const [clubArray, setClubArray] = useState(origClubs);

  useEffect(() => {
    setClubArray(origClubs);
  }, [origClubs]);

  function updateSearchText(text: string) {
    setClubArray(
      // remove all clubs that don't begin with search string
      origClubs.filter(function (item: ClubType) {
        return item.name
          .trim()
          .toLowerCase()
          .includes(text.trim().toLowerCase()); // The search currently only matches exact name searches
      })
    );
  }

  // BEGIN: HELPER CODE FOR UPLOAD IMAGE MODAL
  const [showUploadModal, setShowModal] = useState(false);

  function getFileExt(fname: string) {
    return fname.slice(((fname.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }

  function isAnImage(file: string) {
    return 'jpg png jpeg gif'.includes(getFileExt(file));
  }

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

  const handleDrop = (ev: any) => {
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
    setHoveringDrop(true);

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  };

  const uploadImageFile = (file: File) => {
    // TODO: UPLOAD THE FILE TO THE BACKEND
    console.log(file.name);
  };

  const closeModal = (shouldSubmit: boolean) => {
    setShowModal(false); // close modal
    updateFile(undefined); // reset the file stored within the modal
    if (shouldSubmit) {
      if (selectedFile !== undefined) {
        // if a file is selected
        uploadImageFile(selectedFile); // send the file to backend to be uploaded
      }
    }
  };
  // END: HELPER CODE FOR UPLOAD IMAGE MODAL

  return (
    <>
      <NavBar hasSearch={true} callback={updateSearchText} />

      {/* TODO: temporary components to test the UPLOAD IMAGE MODAL; needs to be removed later */}
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      <Modal
        show={showUploadModal}
        onClose={() => closeModal(false)}
        title={'Upload Image'}
        bodyChildren={
          <>
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
                  accept="image/png, image/jpeg"
                  onChange={(e: any) => updateFile(e.target.files[0])}
                />
              </div>
            </div>
            <button className="doneButton" onClick={() => closeModal(true)}>
              Done
            </button>
          </>
        }
      />
      <div className="dashboardContainer">
        <div className="cardsContainer">
          {clubArray.length === 0 ? (
            <></>
          ) : (
            clubArray.map((club) => (
              <ClubCard
                clubName={club.name}
                clubCategory={club.category}
                clubID={club.id}
              />
            ))
          )}
        </div>
        <div className="filterContainer">
          <Filter />
        </div>
      </div>
    </>
  );
};

export default ClubBoard;
