import React, { useEffect, useReducer, useState } from 'react';
import './TagSelector.css';

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

const TagSelector = (props: Props) => {
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  function addTag(tag: string) {
    // TODO
    // if the current props.value doesn't alr have the tag we want to add,
    // and the props.value array isn't already 5 elements long
    // we append the tag to the end of the array
    // and pass it to props.onChange to handle

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

    let newArr = currentTags.filter((element) => element !== tag);

    setCurrentTags(newArr);
    props.callback(newArr);
  }

  return (
    <fieldset className="styled-tag-input">
      <legend className="styled-tag-input">
        &nbsp;Tags&nbsp;
        <br />
      </legend>
      <div className="tag-zone">
        {currentTags.map((tagStr) => (
          <button
            className="tag-bubble"
            onClick={(e) => {
              e.preventDefault();
              removeTag(tagStr);
            }}
          >
            {tagStr}
          </button>
        ))}
      </div>
      <p className="tag-notice">Up to 5 Tags</p>
      <input
        placeholder="Search Clubs"
        type="text"
        className="tag-search-bar"
        value={searchPhrase}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchPhrase(event.target.value);
          // TODO: display other tags they could select from a dropdown; arrow keys should indicate which one is selected; on click or on "enter key" the current top (or other) selected option should be entered; if no such options, the current custom string should be entered as a tag
          // ideally, once this is implemented we can get rid of the current implementation of onKeyPress below, which will (for testing purposes) simply enter whatever the user typed and presses enter as the new tag
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addTag(searchPhrase);
          }
        }}
      />
    </fieldset>
  );
};

TagSelector.defaultProps = defaultProps;

export default TagSelector;
