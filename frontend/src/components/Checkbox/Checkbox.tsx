import React from 'react';
import classes from './Checkbox.module.scss';

const Checkbox = ({ label, checked, onChange }) => (
  <div className={classes.toggleSwitch}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`${classes.toggle} ${checked ? classes.active : ''}`}
    />
    <span>{label}</span>
  </div>
);

export default Checkbox;
