import React, { useState } from 'react';
import './UploadImageModal.css';

// Required props
interface RequiredProps {
  // Nothing here for now
}

// Optional props: pass the file back to the master component in case it's needed
interface OptionalProps {
  callback: (file: File) => void;
}

// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  callback: (file: File) => {
    // dummy function
  },
};

// To "Open" the Modal, add this component to the page
const UploadImageModal = (props: Props) => {
  const handleUpload = () => {
    if (selectedFile !== undefined) {
      props.callback(selectedFile);
    }
  };

  const [selectedFile, setSelectedFile] = useState<File>();

  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);

    setIsFilePicked(true);
  };

  return (
    <div className="uploadImageModal">
      <input type="file" name="file" onChange={changeHandler} />

      {isFilePicked && selectedFile !== undefined ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}

      <div>
        <button onClick={handleUpload}>Done</button>
      </div>
    </div>
  );
};

UploadImageModal.defaultProps = defaultProps;

export default UploadImageModal;
