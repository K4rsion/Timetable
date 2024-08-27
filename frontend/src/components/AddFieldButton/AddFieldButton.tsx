import React from 'react';
import classes from './AddFieldButton.module.scss';

const AddFieldButton = ({ onClick }) => (
  <button type="button" className={classes.addFieldButton} onClick={onClick}>
    Добавить слот
  </button>
);

export default AddFieldButton;
