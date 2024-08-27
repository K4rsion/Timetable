import React from 'react';
import classes from './ButtonLink.module.scss';

const ButtonLink = ({ href, children }) => (
  <a href={href} className={classes.button}>
    {children}
  </a>
);

export default ButtonLink;
