import React from 'react';
import { CategoryType } from '../../types/index';
import './Filter.css';

const Filter = () => {
  const handleApply = () => {};

  return (
    <>
      <form>
        <div id="categoryFilter">
          {Object.values(CategoryType).map((val) => {
            return (
              <div className="checkBox">
                <label> {val} </label>
                <input type="checkbox" />
              </div>
            );
          })}
          <div className="checkBox"></div>
        </div>
        <div id="statusFilter"></div>
        <div id="keywordFilter"></div>
      </form>
      <button onClick={handleApply}>Apply</button>
    </>
  );
};

export default Filter;
