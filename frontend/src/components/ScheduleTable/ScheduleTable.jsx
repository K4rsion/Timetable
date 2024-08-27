import React from 'react';
import TimeRow from '../TimeRow/TimeRow';
import DayColumn from '../DayColumn/DayColumn';
import classes from './ScheduleTable.module.scss';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const times = [
  '09:00 - 10:35',
  '10:50 - 12:25',
  '12:40 - 14:15',
  '14:30 - 16:05',
  '16:20 - 17:55',
  '18:10 - 19:45',
  '20:00 - 21:25'
];

const ScheduleTable = ({ schedule }) => (
  <div className={classes.tableContainer}>
    <table className={classes.table}>
      <thead>
        <tr>
          <th className={classes.timeColumn}>Time</th>
          {days.map((day) => (
            <DayColumn key={day} day={day} className={classes.dayColumn} />
          ))}
        </tr>
      </thead>
      <tbody>
        {times.map((time) => (
          <TimeRow
            key={time}
            time={time}
            classes={schedule[time] || Array(days.length).fill(null)}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default ScheduleTable;
