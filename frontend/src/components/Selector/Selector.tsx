import React from 'react';

const Selector = ({ value, onChange, options, placeholder }) => (
  <select value={value} onChange={onChange}>
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Selector;
