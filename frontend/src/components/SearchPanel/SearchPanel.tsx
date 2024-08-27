import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import classes from './SearchPanel.module.scss';
import axios from 'axios';
import { useRoute } from 'wouter'; // Используем useRoute из wouter для навигации

const SearchPanel = () => {
  const [searchItem, setSearchItem] = useState('');
  const [isGroupActive, setIsGroupActive] = useState(true);
  const [isTeacherActive, setIsTeacherActive] = useState(false);
  const [, navigate] = useRoute(); // Получаем функцию navigate для навигации

  const handleSearch = async () => {
    try {
      let url;
      if (isGroupActive) {
        url = `/api/search/byGroup/${encodeURIComponent(searchItem)}`;
      } else {
        url = `/api/search/byTeacher/${encodeURIComponent(searchItem)}`;
      }
      const response = await axios.get(url);

      // Делаем что-то с ответом, например, обновляем состояние компонента или выводим данные на экран
      console.log(response.data); // Пример вывода данных в консоль

      // Перенаправляем пользователя на другую страницу или обновляем компонент с данными
      navigate('/schedule'); // Используем navigate для перенаправления пользователя
    } catch (error) {
      console.error('Error searching schedule:', error);
      // Обрабатываем ошибку, например, показываем сообщение пользователю
      alert('Error searching schedule. Please try again later.'); // Пример вывода сообщения об ошибке
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

export default SearchPanel;
