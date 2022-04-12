import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from '../../icons/filter';
import { CategoryType, StatusType } from '../../types/index';
import Collapsible from '../Collapsible/Collapsible';
import './Filter.css';

const Filter = () => {
  //These states contain the categories and statuses selected.
  const [categories, setCategories] = useState([]);
  const [statuses, setStatus] = useState([]);

  const handleApply = () => {};

  return (
    <div className="filter">
      <div className="title">Filter:</div>
      <form>
        <div id="categoryFilter" className="dropdown">
          <Collapsible
            open
            title="Category"
            openIcon={ArrowUp}
            closedIcon={ArrowDown}
          >
            {Object.values(CategoryType).map((val) => {
              return (
                <div className="checkBox">
                  <label> {val} </label>
                  <input type="checkbox" id={val} />
                </div>
              );
            })}
          </Collapsible>
        </div>

        <div id="statusFilter" className="dropdown">
          <Collapsible
            open
            title="Status"
            openIcon={ArrowUp}
            closedIcon={ArrowDown}
          >
            {Object.values(StatusType).map((val) => {
              return (
                <div className="checkBox">
                  <label> {val} </label>
                  <input type="checkbox" id={val} />
                </div>
              );
            })}
          </Collapsible>
        </div>
        <div id="keywordFilter" className="dropdown"></div>
      </form>
      <button onClick={handleApply} className="apply">
        Apply
      </button>
    </div>
  );
};

export default Filter;
