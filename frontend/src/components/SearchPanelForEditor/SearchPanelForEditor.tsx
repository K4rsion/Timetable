import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import classes from './SearchPanelForEditor.module.scss';
import axios from 'axios';

const SearchPanelForEditor = ({ updateSchedule }) => {
  const [searchItem, setSearchItem] = useState('');
  const [isGroupActive, setIsGroupActive] = useState(true);
  const [isTeacherActive, setIsTeacherActive] = useState(false);

  const handleSearch = async () => {
    try {
      let url;
      if (isGroupActive) {
        url = `/api/search/byGroup/${encodeURIComponent(searchItem)}`;
      } else {
        url = `/api/search/byTeacher/${encodeURIComponent(searchItem)}`;
      }
      const response = await axios.get(url);

      // Обновляем расписание в родительском компоненте с помощью переданной функции
      updateSchedule(response.data);
    } catch (error) {
      console.error('Error searching schedule:', error);
      alert('Error searching schedule. Please try again later.');
    }
  };

  const toggleGroupActive = () => {
    setIsGroupActive(true);
    setIsTeacherActive(false);
  };

  const toggleTeacherActive = () => {
    setIsGroupActive(false);
    setIsTeacherActive(true);
  };

  return (
    <div className={classes.searchPanel}>
      <div className={classes.searchPanel__inputContainer}>
        <input
          className={classes.searchPanel__input}
          value={searchItem}
          autoFocus
          autoComplete="off"
          placeholder="type here..."
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <div
          className={classes.searchPanel__searchButton}
          onClick={handleSearch}
        >
          <div className={classes.searchPanel__searchButton__icon}>
            <FaSearch />
          </div>
        </div>
      </div>
      <div className={classes.searchPanel__toggles}>
        <ToggleSwitch
          label="Group"
          isActive={isGroupActive}
          onToggle={toggleGroupActive}
        />
        <ToggleSwitch
          label="Teacher"
          isActive={isTeacherActive}
          onToggle={toggleTeacherActive}
        />
      </div>
    </div>
  );
};

export default SearchPanelForEditor;
