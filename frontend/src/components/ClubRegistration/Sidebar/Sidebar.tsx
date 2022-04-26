import React, { useEffect, useState } from 'react';
import './Sidebar.css';

const sidebarItems = ['Profile', 'Recruitment Banner', 'Description', 'Events'];

// Required props
interface RequiredProps {
  currentItem: any;
  callback: (clickedItem: number) => void;
}

// Optional props
interface OptionalProps {}

// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {};

const Sidebar: React.FC<Props> = (props: Props) => {
  return (
    <div className="sidebar">
      {sidebarItems.map((name, index) => {
        return (
          <button
            className={
              index === props.currentItem
                ? 'sidebar-item-highlighted'
                : 'sidebar-item'
            }
            onClick={() => props.callback(index)}
          >
            {sidebarItems[index]}
          </button>
        );
      })}
    </div>
  );
};

Sidebar.defaultProps = defaultProps;

export { sidebarItems };
export default Sidebar;
