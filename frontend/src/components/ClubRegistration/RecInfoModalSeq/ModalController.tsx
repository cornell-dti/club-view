import React, { useState } from 'react';
import Modal from '../../Modal/Modal';

// Required props
interface RequiredProps {}

// Optional props
interface OptionalProps {
  callback: () => void;
}

// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {
  callback: () => console.log('default callback logged!'),
};

const ModalController = (props: Props) => {
  const [showUploadModal, setShowModal] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const modalSlides = [
    {
      title: 'First Slide Title',
      content: (
        <>
          <p>Content of slide</p>
          <button onClick={() => setSlideNumber(slideNumber + 1)}>
            Next Slide
          </button>
        </>
      ),
    },
    {
      title: 'Second Slide Title',
      content: (
        <>
          <p>Content of slide</p>
          <button onClick={() => setSlideNumber(slideNumber + 1)}>
            Next Slide
          </button>
        </>
      ),
    },
    {
      title: 'Third Slide Title',
      content: (
        <>
          <p>Content of slide</p>
          <button onClick={() => setSlideNumber(slideNumber + 1)}>
            Next Slide
          </button>
        </>
      ),
    },
    {
      title: 'Fourth Slide Title',
      content: (
        <>
          <p>Content of slide</p>
          <button onClick={() => setSlideNumber(slideNumber + 1)}>
            Next Slide
          </button>
        </>
      ),
    },
    {
      title: 'Fifth Slide Title',
      content: (
        <>
          <p>Content of slide</p>
          <button onClick={() => setSlideNumber(slideNumber + 1)}>
            Next Slide
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      <Modal
        show={showUploadModal}
        onClose={() => props.callback()}
        title={modalSlides[slideNumber].title}
        bodyChildren={modalSlides[slideNumber].content}
      />
    </>
  );
};

ModalController.defaultProps = defaultProps;

export default ModalController;
