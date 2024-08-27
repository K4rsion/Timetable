import React, { useState } from 'react';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import classes from './ManageEntityPage.module.scss';

const ManageClassroomPage: React.FC = () => {
  const [classroomToAdd, setClassroomToAdd] = useState({
    number: '',
    type: 'Лекционная',
  });
  const [classroomToRemove, setClassroomToRemove] = useState('');

  const handleAddClassroom = () => {
    fetch('http://localhost:8000/api/authorized/create/classroom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(classroomToAdd),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Classroom added:', data);
        window.location.href = '/'; // Redirect to the home page after adding the classroom
      })
      .catch((error) => console.error('Error adding classroom:', error));
  };

  const handleRemoveClassroom = () => {
    fetch(
      `http://localhost:8000/api/authorized/delete/classroom/${classroomToRemove}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Classroom removed:', data);
        window.location.href = '/'; // Redirect to the home page after removing the classroom
      })
      .catch((error) => console.error('Error removing classroom:', error));
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentContainer}>
        <h2 className={classes.header}>Управление аудиториями</h2>
        <div className={classes.columns}>
          <div className={classes.column}>
            <h3>Добавить</h3>
            <div className={classes.entityItem}>
              <input
                type="text"
                placeholder="Номер или название"
                value={classroomToAdd.number}
                onChange={(e) =>
                  setClassroomToAdd({
                    ...classroomToAdd,
                    number: e.target.value,
                  })
                }
              />
              <select
                value={classroomToAdd.type}
                onChange={(e) =>
                  setClassroomToAdd({ ...classroomToAdd, type: e.target.value })
                }
              >
                <option value="Лекционная">Лекционная</option>
                <option value="Лабораторная">Лабораторная</option>
                <option value="Терминальная">Терминальная</option>
                <option value="Спортивный комплекс">Спортивный комплекс</option>
              </select>
            </div>
            <ButtonLink href="" onClick={handleAddClassroom}>
              добавить
            </ButtonLink>
          </div>
          <div className={classes.column}>
            <h3>Удалить</h3>
            <div className={classes.entityItem}>
              <input
                type="text"
                placeholder="Номер или название"
                value={classroomToRemove}
                onChange={(e) => setClassroomToRemove(e.target.value)}
              />
            </div>
            <ButtonLink onClick={handleRemoveClassroom}>удалить</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClassroomPage;
