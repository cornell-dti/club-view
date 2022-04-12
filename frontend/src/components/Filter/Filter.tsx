import { validateArgCount } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from '../../icons/filter';
import { CategoryType, StatusType } from '../../types/index';
import Collapsible from '../Collapsible/Collapsible';
import './Filter.css';

type FilterProps = {
  callback: (filter1: any, filter2: any) => void;
}

const Filter = ({callback}: FilterProps) => {
  //These states contain the categories and statuses selected.
  const categories = new Set<string>();
  const statuses = new Set<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let {name, checked, id} = event.target;
    const updated = statuses
    if (id == "status"){
      checked ? statuses.add(name) : statuses.delete(name)
    } else {
      checked ? categories.add(name) : categories.delete(name)
    }

  };

  const handleApply = () => {
    callback(categories, statuses);
  }

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
                  <input type="checkbox"
                    name={val} 
                    id="category" 
                    onChange={handleChange}/>
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
                  <input type="checkbox" 
                  name={val} 
                  id="status"
                  onChange={handleChange}/>
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
