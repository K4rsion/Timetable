import React, { useState } from 'react';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import classes from './ManageEntityPage.module.scss';

const ManageGroupPage: React.FC = () => {
  const [groupToAdd, setGroupToAdd] = useState('');
  const [groupToRemove, setGroupToRemove] = useState('');

  const handleAddGroup = () => {
    fetch('http://localhost:8000/api/authorized/create/group', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupNo: groupToAdd }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Group added:', data);
        window.location.href = '/'; // Redirect to the home page after adding the group
      })
      .catch((error) => console.error('Error adding group:', error));
  };

  const handleRemoveGroup = () => {
    fetch(
      `http://localhost:8000/api/authorized/delete/schedule/${groupToRemove}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Group removed:', data);
        window.location.href = '/'; // Redirect to the home page after removing the group
      })
      .catch((error) => console.error('Error removing group:', error));
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentContainer}>
        <h2 className={classes.header}>Управление группами</h2>
        <div className={classes.columns}>
          <div className={classes.column}>
            <h3>Добавить</h3>
            <div className={classes.entityItem}>
              <input
                type="text"
                value={groupToAdd}
                onChange={(e) => setGroupToAdd(e.target.value)}
              />
            </div>
            <ButtonLink href="" onClick={handleAddGroup}>
              добавить
            </ButtonLink>
          </div>
          <div className={classes.column}>
            <h3>Удалить</h3>
            <div className={classes.entityItem}>
              <input
                type="text"
                value={groupToRemove}
                onChange={(e) => setGroupToRemove(e.target.value)}
              />
            </div>
            <ButtonLink onClick={handleRemoveGroup}>удалить</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageGroupPage;
