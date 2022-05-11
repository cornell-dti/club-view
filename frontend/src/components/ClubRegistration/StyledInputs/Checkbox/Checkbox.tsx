import React, { useState } from 'react';
import './Checkbox.css';

const Checkbox = ({
  title,
  value,
  onChange,
}: {
  title: string;
  value: boolean;
  onChange: any;
}) => {
  return (
    <label className={value === true ? 'checked' : 'unchecked'}>
      <input
        className={value === true ? 'checked' : 'unchecked'}
        type="checkbox"
        checked={value}
        onChange={() => onChange(!value)}
      />
      <span className="check-title">{title}</span>
    </label>
  );
};

export default Checkbox;
