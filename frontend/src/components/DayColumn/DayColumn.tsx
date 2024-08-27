import React from 'react';

interface DayColumnProps {
  day: string;
}

const DayColumn: React.FC<DayColumnProps> = ({ day }) => <th>{day}</th>;

export default DayColumn;
