import React from 'react';
import classes from './AuditoriumSelect.module.scss';

interface Props {
  label: string;
  values: string[];
  onChange: (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  options: string[];
}

const AuditoriumSelect: React.FC<Props> = ({
  label,
  values,
  onChange,
  onAdd,
  onRemove,
  options,
}) => {
  return (
    <div className={classes.auditoriumSelect}>
      <h3 className={classes.header}>{label}</h3>
      {values.map((value, index) => (
        <div key={index} className={classes.auditoriumItem}>
          <select
            value={value || ''} // Установим значение выбранной аудитории, если оно есть
            onChange={(e) => onChange(index, e)} // Передадим индекс и событие
          >
            <option value="">Выберите аудиторию</option>
            {options.map((auditorium, optionIndex) => (
              <option key={optionIndex} value={auditorium}>
                {auditorium}
              </option>
            ))}
          </select>
          {index === 0 && ( // Покажем кнопки только для первой аудитории
            <>
              <button
                type="button"
                onClick={onAdd}
                className={`${classes.button} ${classes.add}`}
              >
                Добавить
              </button>
              {values.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className={`${classes.button} ${classes.danger}`}
                >
                  Удалить
                </button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AuditoriumSelect;
