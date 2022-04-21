import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import ChangeSlideButton from './HelperComponents/ChangeSlideButton';
import HorizButton from './HelperComponents/HorizontalButton';
import VertButton from './HelperComponents/VerticalButton';

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

function updateArray(origArray: any[], index: number, newVal: any) {
  let miniArr = [];
  miniArr.push(newVal);

  let newArr = origArray
    .slice(0, index)
    .concat(miniArr)
    .concat(origArray.slice(index + 1, origArray.length));
  return newArr;
}

const ModalController = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const closeModal = (shouldSubmit: boolean) => {
    setShowModal(false); // close modal

    // clear data
    setSlideData([-1, -1]);
    setSlideNumber(0);

    if (shouldSubmit) {
      // TODO: IMPLEMENT SAVE FUNCTION; send the data in slideData
    }
  };

  // TEMP: each slide's decision stored as binary, either 0 or 1, after user interaction
  const [slideData, setSlideData] = useState([-1, -1]);

  const modalSlides = [
    {
      title: 'Is your Club a...',
      content: (
        <>
          <HorizButton
            callback={() => setSlideData(updateArray(slideData, 0, 0))}
            text="Recruitment Based Club"
            depressed={slideData[0] === 0 ? true : false}
          />
          <HorizButton
            callback={() => setSlideData(updateArray(slideData, 0, 1))}
            text="Non Recruitment Club"
            depressed={slideData[0] === 1 ? true : false}
          />
        </>
      ),
    },
    {
      title: 'How frequently does your club recruit?',
      content: (
        <>
          <VertButton
            callback={() => setSlideData(updateArray(slideData, 1, 0))}
            text="Once a year!"
            depressed={slideData[1] === 0 ? true : false}
          />
          <VertButton
            callback={() => setSlideData(updateArray(slideData, 1, 1))}
            text="Once a semester!"
            depressed={slideData[1] === 1 ? true : false}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      <Modal
        show={showModal}
        onClose={() => closeModal(false)}
        title={modalSlides[slideNumber].title}
        bodyChildren={
          <>
            {modalSlides[slideNumber].content}
            {slideNumber === 0 ? ( // if first slide, display Next only
              <div>
                <ChangeSlideButton
                  procedure={1}
                  onClick={() => setSlideNumber(slideNumber + 1)}
                  disabled={slideData[0] === -1}
                />
              </div>
            ) : slideNumber === modalSlides.length - 1 ? ( // if last slide, display Save and Back
              <div>
                <ChangeSlideButton
                  procedure={-1}
                  onClick={() => setSlideNumber(slideNumber - 1)}
                />
                <ChangeSlideButton
                  procedure={0}
                  onClick={() => closeModal(true)}
                  disabled={slideData[slideData.length - 1] === -1}
                />
              </div>
            ) : (
              // else is a normal middle slide, display Next and Back
              <div>
                <ChangeSlideButton
                  procedure={-1}
                  onClick={() => setSlideNumber(slideNumber - 1)}
                />
                <ChangeSlideButton
                  procedure={1}
                  onClick={() => setSlideNumber(slideNumber + 1)}
                  disabled={slideData[slideNumber] === -1}
                />
              </div>
            )}
          </>
        }
      />
    </>
  );
};

ModalController.defaultProps = defaultProps;

export default ModalController;
