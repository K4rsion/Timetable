// ScheduleEditorTable.jsx

import React from 'react';
import TimeEditorCell from '../TimeEditorCell/TimeEditorCell';
import DayColumn from '../DayColumn/DayColumn';
import styles from './ScheduleEditorTable.module.scss'; // Правильный импорт стилей

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
  '20:00 - 21:25',
];

const ScheduleEditorTable = ({ schedule, setSchedule, options }) => (
  <div className={styles.tableContainer}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.timeColumn}>Time</th>
          {days.map((day) => (
            <DayColumn key={day} day={day} />
          ))}
        </tr>
      </thead>
      <tbody>
        {times.map((time) => (
          <tr key={time}>
            <td className={styles.timeColumn}>{time}</td>
            {days.map((day) => (
              <TimeEditorCell
                key={`${day}-${time}`}
                day={day}
                time={time}
                schedule={schedule}
                setSchedule={setSchedule}
                options={options}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ScheduleEditorTable;
