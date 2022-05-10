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
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  function addTag(tag: string) {
    // TODO
    // if the current props.value doesn't alr have the tag we want to add,
    // and the props.value array isn't already 5 elements long
    // we append the tag to the end of the array
    // and pass it to props.onChange to handle

    console.log('adding tag: ' + tag);
    if (!currentTags.includes(tag) && currentTags.length < 5) {
      let newArr = currentTags.slice(0);
      newArr.push(tag);

      setCurrentTags(newArr);
      props.callback(newArr);
    }
  }

  function removeTag(tag: string) {
    // TODO
    // remove the element in props.value matching tag from props.value
    // and pass it to props.onChange to handle
    console.log('removing tag: ' + tag);

    let newArr = currentTags.filter((element) => element !== tag);

    setCurrentTags(newArr);
    props.callback(newArr);
  }

  return (
    <fieldset className="styled-tag-input">
      <legend className="styled-tag-input">
        &nbsp;Links&nbsp;
        <br />
      </legend>

      <input
        placeholder="Paste a Link and Hit Enter"
        type="text"
        className="tag-search-bar"
        value={searchPhrase}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          console.log('testing change!');
          setSearchPhrase(event.target.value);
          // TODO: this entire input should be replaced by...whatever the designers are thinking (apparently just a button, which will probably open a modal or something ?)
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            console.log('entered test mode');
            addTag(searchPhrase);
          }
        }}
      />

      <div className="tag-zone">
        {currentTags.map(
          (
            tagStr,
            index // TODO: based on what the link is, we should also conditionally render an appropriate icon (insta, fb, etc)
          ) => (
            <div
              className={
                index !== currentTags.length - 1 ? 'link-row' : 'last-link-row'
              }
            >
              <div className="link-space">{tagStr}</div>
              <button
                className="close-space"
                onClick={(e) => {
                  e.preventDefault();
                  removeTag(tagStr);
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

      <p className="tag-notice">Up to 6 Tags</p>
    </fieldset>
  );
};

LinkSelector.defaultProps = defaultProps;

export default LinkSelector;
