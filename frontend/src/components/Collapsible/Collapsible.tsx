import React, { useState } from 'react';
import './Collapsible.css';

interface IProps {
  open?: boolean;
  title: string;
  closedIcon: string;
  openIcon: string;
}

const Collapsible: React.FC<IProps> = ({
  open,
  children,
  title,
  closedIcon,
  openIcon,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <>
      <div className="">
        <div className="collapsibleHeader">
          <div className="name">{title}</div>
          <button
            type="button"
            className="expandButton"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {!isOpen ? <img src={closedIcon} /> : <img src={openIcon} />}
          </button>
        </div>
        <div>{isOpen && <>{children}</>}</div>
      </div>
    </>
  );
};

export default Collapsible;
