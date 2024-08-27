// TimeEditorCell.jsx

import React from 'react';
import Selector from '../Selector/Selector';
import styles from './TimeEditorCell.module.scss'; // Правильный импорт стилей

const TimeEditorCell = ({ day, schedule, setSchedule, time, options }) => {
  const handleChange = (field, value) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[time] = updatedSchedule[time] || {};
    updatedSchedule[time][day] = updatedSchedule[time][day] || {};
    updatedSchedule[time][day][field] = value;
    setSchedule(updatedSchedule);
  };

  return (
    <td className={styles.timeEditorCell}>
      <Selector
        value={schedule[time]?.[day]?.subject || ''}
        onChange={(e) => handleChange('subject', e.target.value)}
        options={options.subjects}
        placeholder="Предмет"
      />
      <Selector
        value={schedule[time]?.[day]?.type || ''}
        onChange={(e) => handleChange('type', e.target.value)}
        options={options.types}
        placeholder="Тип"
      />
      <Selector
        value={schedule[time]?.[day]?.teacher || ''}
        onChange={(e) => handleChange('teacher', e.target.value)}
        options={options.teachers}
        placeholder="Преподаватель"
      />
      <Selector
        value={schedule[time]?.[day]?.room || ''}
        onChange={(e) => handleChange('room', e.target.value)}
        options={options.rooms}
        placeholder="Аудитория"
      />
    </td>
  );
};

export default TimeEditorCell;
