import React from 'react';
import { Link } from 'wouter';
import Header from '../components/Header/Header';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import classes from './SelectEntityPage.module.scss';

const SelectEntityPage: React.FC = () => {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentContainer}>
        <h2 className={classes.header}>Выберите сущность для управления</h2>
        <div className={classes.buttonGroup}>
          <ButtonLink href="/add/group">Управление группами</ButtonLink>
          <ButtonLink href="/add/classroom">Управление аудиториями</ButtonLink>
          <ButtonLink href="/add/teacher">
            Управление преподавателями
          </ButtonLink>
          <ButtonLink href="/add/subject">Управление предметами</ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default SelectEntityPage;
