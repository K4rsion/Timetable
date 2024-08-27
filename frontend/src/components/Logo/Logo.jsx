import React from 'react';
import classes from './Logo.module.scss';

const logo = () => {
  return (
    <div className={classes.logo}>
      <svg viewBox="0 0 900 130">
        <text
          lengthAdjust="spacing"
          x="50%"
          y="50%"
          fontSize="5rem"
          fontWeight="bold"
          fill="none"
          strokeWidth="2.7px"
          stroke="rgb(133, 221, 4)"
          textAnchor="middle"
        >
          timetable
        </text>
      </svg>
    </div>
  );
};

export default logo;
