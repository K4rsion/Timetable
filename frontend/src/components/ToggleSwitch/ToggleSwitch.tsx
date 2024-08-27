import React from 'react';
import classes from './ToggleSwitch.module.scss';

interface ToggleSwitchProps {
  label: string;
  isActive: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  isActive,
  onToggle,
}) => (
  <div className={classes.toggleSwitch} onClick={onToggle}>
    <div className={`${classes.toggle} ${isActive ? classes.active : ''}`} />
    <span>{label}</span>
  </div>
);

export default ToggleSwitch;
