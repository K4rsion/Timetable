import React from 'react';
import classes from './SlotInput.module.scss';

const SlotInput = ({
  slot,
  auditoriums,
  subjects,
  teachers,
  groups,
  onChange,
  onRemove,
  onAddGroup,
  onRemoveGroup,
}) => {
  const handleGroupChange = (index, event) => {
    const newGroups = [...slot.groups];
    newGroups[index] = event.target.value;
    onChange({ target: { name: 'groups', value: newGroups } });
  };

  const roomTypeNames = {
    terminal: 'Терминальная',
    lecture: 'Лекционная',
    laboratory: 'Лабораторная',
    sports: 'Спортивный комплекс',
  };

  return (
    <div className={classes.slotInput}>
      <div className={classes.inputGroup}>
        <label htmlFor={`subject-${slot.id}`}>Предмет</label>
        <select
          id={`subject-${slot.id}`}
          name="subject"
          value={slot.subject}
          onChange={onChange}
        >
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.inputGroup}>
        <label htmlFor={`teacher-${slot.id}`}>Преподаватель</label>
        <select
          id={`teacher-${slot.id}`}
          name="teacher"
          value={slot.teacher}
          onChange={onChange}
        >
          {teachers.map((teacher, index) => (
            <option key={index} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.inputGroup}>
        <label htmlFor={`roomType-${slot.id}`}>Тип аудитории</label>
        <select
          id={`roomType-${slot.id}`}
          name="roomType"
          value={slot.roomType}
          onChange={onChange}
        >
          {Object.keys(roomTypeNames).map((type, index) => (
            <option key={index} value={type}>
              {roomTypeNames[type]}
            </option>
          ))}
        </select>
      </div>
      {slot.roomType === 'sports' ? (
        <div className={classes.inputGroup}>
          <label htmlFor={`room-${slot.id}`}>Спортивный комплекс</label>
          <select
            id={`room-${slot.id}`}
            name="room"
            value={slot.room}
            onChange={onChange}
          >
            {auditoriums['sports'].map((auditorium, index) => (
              <option key={index} value={auditorium}>
                {auditorium}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className={classes.inputGroup}>
          <label htmlFor={`room-${slot.id}`}>Аудитория</label>
          <select
            id={`room-${slot.id}`}
            name="room"
            value={slot.room}
            onChange={onChange}
          >
            {auditoriums[slot.roomType]?.map((auditorium, index) => (
              <option key={index} value={auditorium}>
                {auditorium}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className={classes.inputGroup}>
        <label>Группы</label>
        <div className={classes.groupContainer}>
          {slot.groups.map((group, index) => (
            <div key={index} className={classes.groupItem}>
              <select
                value={group}
                onChange={(e) => handleGroupChange(index, e)}
                className={classes.groupSelect}
              >
                {groups.map((group, index) => (
                  <option key={index} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => onRemoveGroup(index)}
                className={`${classes.button} ${classes.danger}`}
              >
                Удалить
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={onAddGroup}
            className={`${classes.button} ${classes.add}`}
          >
            Добавить группу
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className={`${classes.button} ${classes.danger} ${classes.removeSlotButton}`}
      >
        Удалить слот
      </button>
    </div>
  );
};

export default SlotInput;
