import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sidebarItems = ['Profile', 'Recruitment Banner', 'Description', 'Events'];
const sidebarPaths = ['profile', 'recruitment', 'description', 'events'];

// Required props
interface RequiredProps {
  currentPath: number;
}

// Optional props
interface OptionalProps {}

// Combine required and optional props to build the full prop interface
interface Props extends RequiredProps, OptionalProps {}

// Use the optional prop interface to define the default props
const defaultProps: OptionalProps = {};

const Sidebar = (props: Props) => {
  const importedNavTo = useNavigate();
  const navigateTo = (path: string) => {
    importedNavTo('/register/' + path);
  };

  return (
    <div className="sidebar">
      {sidebarPaths.map((path, index) => {
        return (
          <button
            className={
              index === props.currentPath
                ? 'sidebar-item-highlighted'
                : 'sidebar-item'
            }
            onClick={() => navigateTo(path)}
          >
            {sidebarItems[index]}
          </button>
        );
      })}
    </div>
  );
};

Sidebar.defaultProps = defaultProps;

export { sidebarPaths, sidebarItems };
export default Sidebar;
