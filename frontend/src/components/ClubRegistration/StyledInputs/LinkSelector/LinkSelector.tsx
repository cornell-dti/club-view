import React, { useEffect, useReducer, useState } from 'react';
import './LinkSelector.css';

// TODO: once the designers have their designs finalized, we can add the final exported icons
// for the search and "X" icons and stuff to this component as well

// Required props
interface RequiredProps {
  callback: any;
}

// Optional props
interface OptionalProps {}

// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {};

const LinkSelector = (props: Props) => {
  const [currentlinks, setCurrentlinks] = useState<string[]>([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  function addlink(link: string) {
    // TODO
    // if the current props.value doesn't alr have the link we want to add,
    // and the props.value array isn't already 5 elements long
    // we append the link to the end of the array
    // and pass it to props.onChange to handle
    if (!currentlinks.includes(link) && currentlinks.length < 5) {
      let newArr = currentlinks.slice(0);
      newArr.push(link);

      setCurrentlinks(newArr);
      props.callback(newArr);
    }
  }

  function removelink(link: string) {
    // TODO
    // remove the element in props.value matching link from props.value
    // and pass it to props.onChange to handle

    let newArr = currentlinks.filter((element) => element !== link);

    setCurrentlinks(newArr);
    props.callback(newArr);
  }

  return (
    <fieldset className="styled-link-input">
      <legend className="styled-link-input">
        &nbsp;Links&nbsp;
        <br />
      </legend>

      <input
        placeholder="Paste a Link and Hit Enter"
        type="text"
        className="link-search-bar"
        value={searchPhrase}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchPhrase(event.target.value);
          // TODO: this entire input should be replaced by...whatever the designers are thinking (apparently just a button, which will probably open a modal or something ?)
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addlink(searchPhrase);
          }
        }}
      />

      <div className="link-zone">
        {currentlinks.map(
          (
            linkStr,
            index // TODO: based on what the link is, we should also conditionally render an appropriate icon (insta, fb, etc)
          ) => (
            <div
              className={
                index !== currentlinks.length - 1 ? 'link-row' : 'last-link-row'
              }
            >
              <div className="link-space">{linkStr}</div>
              <button
                className="close-space"
                onClick={(e) => {
                  e.preventDefault();
                  removelink(linkStr);
                }}
              >
                X
              </button>
            </div>
          )
        )}
      </div>

      <div className="center">
        <button className="add-link-btn">Add Link</button>
      </div>

      <p className="link-notice">Up to 6 links</p>
    </fieldset>
  );
};

LinkSelector.defaultProps = defaultProps;

export default LinkSelector;
