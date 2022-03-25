import React from 'react';
import { CategoryType, StatusType } from '../../types/index';
import './Filter.css';

const Filter = () => {
  const handleApply = () => {};

  return (
    <div className="filter">
      <div className="title">Filter:</div>
      <form>
        <div id="categoryFilter" className="dropdown">
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

        <div id="statusFilter" className="dropdown">
          {Object.values(StatusType).map((val) => {
            return (
              <div className="checkBox">
                <label> {val} </label>
                <input type="checkbox" />
              </div>
            );
          })}
        </div>
        <div id="keywordFilter" className="dropdown"></div>
      </form>
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default Filter;
