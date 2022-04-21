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
        <div className="button-wrapper">
          <div className="horiz-button-spacer">
            <VertButton
              callback={() => setSlideData(updateArray(slideData, 0, 0))}
              child={
                <p>
                  Recruitment
                  <br />
                  Based
                  <br />
                  Club
                </p>
              }
              depressed={slideData[0] === 0 ? true : false}
            />
            <VertButton
              callback={() => setSlideData(updateArray(slideData, 0, 1))}
              child={
                <p>
                  Non
                  <br />
                  Recruitment
                  <br />
                  Club
                </p>
              }
              depressed={slideData[0] === 1 ? true : false}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'How frequently does your club recruit?',
      content: (
        <div className="button-wrapper">
          <div className="vert-button-spacer">
            <HorizButton
              callback={() => setSlideData(updateArray(slideData, 1, 0))}
              child={<p>Once a year!</p>}
              depressed={slideData[1] === 0 ? true : false}
            />
            <HorizButton
              callback={() => setSlideData(updateArray(slideData, 1, 1))}
              child={<p>Once a semester!</p>}
              depressed={slideData[1] === 1 ? true : false}
            />
          </div>
        </div>
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
        placeTitleOnLeft={true}
        smallModalSize={true}
        bodyChildren={
          <>
            {modalSlides[slideNumber].content}
            <div className="bottom-bar">
              {slideNumber === 0 ? ( // if first slide, display Next only
                <ChangeSlideButton
                  procedure={1}
                  onClick={() => setSlideNumber(slideNumber + 1)}
                  disabled={slideData[0] === -1}
                />
              ) : slideNumber === modalSlides.length - 1 ? ( // if last slide, display Save and Back
                <>
                  <ChangeSlideButton
                    procedure={0}
                    onClick={() => closeModal(true)}
                    disabled={slideData[slideData.length - 1] === -1}
                  />
                  <ChangeSlideButton
                    procedure={-1}
                    onClick={() => setSlideNumber(slideNumber - 1)}
                  />
                </>
              ) : (
                // else is a normal middle slide, display Next and Back
                <>
                  <ChangeSlideButton
                    procedure={1}
                    onClick={() => setSlideNumber(slideNumber + 1)}
                    disabled={slideData[slideNumber] === -1}
                  />
                  <ChangeSlideButton
                    procedure={-1}
                    onClick={() => setSlideNumber(slideNumber - 1)}
                  />
                </>
              )}
            </div>
          </>
        }
      />
    </>
  );
};

ModalController.defaultProps = defaultProps;

export default ModalController;
