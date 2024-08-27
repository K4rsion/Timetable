import React, { useState } from 'react';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import classes from './ManageEntityPage.module.scss';

const ManageTeacherPage: React.FC = () => {
  const [teacherToAdd, setTeacherToAdd] = useState({ name: '', code: '' });
  const [teacherToRemove, setTeacherToRemove] = useState({
    name: '',
    code: '',
  });

  const handleAddTeacher = () => {
    fetch('http://localhost:8000/api/authorized/create/teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherToAdd),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Teacher added:', data);
        window.location.href = '/'; // Redirect to the home page after adding the teacher
      })
      .catch((error) => console.error('Error adding teacher:', error));
  };

  const handleRemoveTeacher = () => {
    fetch(
      `http://localhost:8000/api/authorized/delete/teacher/${teacherToRemove.code}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Teacher removed:', data);
        window.location.href = '/'; // Redirect to the home page after removing the teacher
      })
      .catch((error) => console.error('Error removing teacher:', error));
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentContainer}>
        <h2 className={classes.header}>Управление преподавателями</h2>
        <div className={classes.columns}>
          <div className={classes.column}>
            <h3>Добавить</h3>
            <div className={classes.entityItem}>
              <input
                type="text"
                placeholder="Имя"
                value={teacherToAdd.name}
                onChange={(e) =>
                  setTeacherToAdd({ ...teacherToAdd, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Код"
                value={teacherToAdd.code}
                onChange={(e) =>
                  setTeacherToAdd({ ...teacherToAdd, code: e.target.value })
                }
              />
            </div>
            <ButtonLink onClick={handleAddTeacher}>добавить</ButtonLink>
          </div>
          <div className={classes.column}>
            <h3>Удалить</h3>
            <div className={classes.entityItem}>
              <input
                type="text"
                placeholder="Имя"
                value={teacherToRemove.name}
                onChange={(e) =>
                  setTeacherToRemove({
                    ...teacherToRemove,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Код"
                value={teacherToRemove.code}
                onChange={(e) =>
                  setTeacherToRemove({
                    ...teacherToRemove,
                    code: e.target.value,
                  })
                }
              />
            </div>
            <ButtonLink href="" onClick={handleRemoveTeacher}>
              удалить
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTeacherPage;
