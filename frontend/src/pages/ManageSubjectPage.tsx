import React, { useState } from 'react';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import classes from './ManageEntityPage.module.scss';

const ManageSubjectPage: React.FC = () => {
  const [subjectToAdd, setSubjectToAdd] = useState('');
  const [subjectToRemove, setSubjectToRemove] = useState('');

  const handleAddSubject = () => {
    fetch('http://localhost:8000/api/authorized/create/subject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectName: subjectToAdd }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Subject added:', data);
        window.location.href = '/'; // Redirect to the home page after adding the subject
      })
      .catch((error) => console.error('Error adding subject:', error));
  };

  const handleRemoveSubject = () => {
    fetch(
      `http://localhost:8000/api/authorized/delete/subject/${subjectToRemove}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Subject removed:', data);
        window.location.href = '/'; // Redirect to the home page after removing the subject
      })
      .catch((error) => console.error('Error removing subject:', error));
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentContainer}>
        <h2 className={classes.header}>Управление предметами</h2>
        <div className={classes.columns}>
          <div className={classes.column}>
            <h3>Добавить</h3>
            <div className={classes.entityItem}>
              <input
                type="text"
                value={subjectToAdd}
                onChange={(e) => setSubjectToAdd(e.target.value)}
              />
            </div>
            <ButtonLink href="" onClick={handleAddSubject}>
              добавить
            </ButtonLink>
          </div>
          <div className={classes.column}>
            <h3>Удалить</h3>
            <div className={classes.entityItem}>
              <input
                type="text"
                value={subjectToRemove}
                onChange={(e) => setSubjectToRemove(e.target.value)}
              />
            </div>
            <ButtonLink onClick={handleRemoveSubject}>удалить</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubjectPage;
