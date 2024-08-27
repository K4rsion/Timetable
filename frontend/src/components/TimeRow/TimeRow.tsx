import React from 'react';

interface ClassItem {
  subject: string;
  teacher: string;
  location: string;
}

interface TimeRowProps {
  time: string;
  classes: (ClassItem | null)[];
}

const TimeRow: React.FC<TimeRowProps> = ({ time, classes }) => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <tr>
      <td>{time}</td>
      {days.map((day, index) => (
        <td key={index}>
          {classes[index] ? (
            <>
              <div>{classes[index]?.subject}</div>
              <div>{classes[index]?.teacher}</div>
              <div>{classes[index]?.location}</div>
            </>
          ) : null}
        </td>
      ))}
    </tr>
  );
};

export default TimeRow;
