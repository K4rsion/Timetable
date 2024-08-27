import React, { useState } from 'react';
import ScheduleEditorTable from '../components/ScheduleEditorTable/ScheduleEditorTable';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { Redirect } from 'wouter';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import SearchPanelForEditor from '../components/SearchPanelForEditor/SearchPanelForEditor';

const ManualScheduleEditorPage = () => {
  const [schedule, setSchedule] = useState({});
  const authData = useSelector((state: IRootState) => state.auth.authData);
  const [conflictMessage, setConflictMessage] = useState('');

  // Проверка авторизации пользователя (примерная логика)
  // if (!authData || !authData.accessToken) {
  //   return <Redirect to="/signIn" />;
  // }

  const options = {
    subjects: ['Math', 'Physics', 'History'],
    types: ['Lecture', 'Lab', 'Seminar'],
    teachers: ['John Doe', 'Jane Smith'],
    rooms: ['Room 101', 'Room 102'],
  };

  const checkSchedule = async () => {
    try {
      const response = await fetch('/api/authorized/create/checkSchedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.accessToken}`,
        },
        body: JSON.stringify(schedule),
      });

      if (!response.ok) {
        throw new Error('Failed to check schedule');
      }

      const data = await response.json();
      if (data.conflicts) {
        setConflictMessage(
          'Конфликты в расписании: ' + data.conflicts.join(', ')
        );
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Error checking schedule:', error);
      return false;
    }
  };

  const saveSchedule = async () => {
    try {
      const isValid = await checkSchedule();
      if (!isValid) return;

      const response = await fetch('/api/authorized/create/saveSchedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.accessToken}`,
        },
        body: JSON.stringify(schedule),
      });

      if (!response.ok) {
        throw new Error('Failed to save schedule');
      }

      console.log('Schedule saved successfully');
      // Опционально: показать уведомление об успешном сохранении
    } catch (error) {
      console.error('Error saving schedule:', error);
      // Опционально: показать уведомление об ошибке
    }
  };

  const deleteSchedule = async (groupNo) => {
    try {
      const response = await fetch(
        `/api/authorized/delete/schedule/${groupNo}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authData.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete schedule');
      }

      console.log(`Schedule ${groupNo} deleted successfully`);
      // Опционально: показать уведомление об успешном удалении
    } catch (error) {
      console.error('Error deleting schedule:', error);
      // Опционально: показать уведомление об ошибке
    }
  };

  const updateScheduleFromSearch = (searchResults) => {
    setSchedule(searchResults);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div style={{ width: '80%' }}>
        <h2
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            padding: '1rem',
          }}
        >
          Manual Schedule Editor
        </h2>
        <SearchPanelForEditor updateSchedule={updateScheduleFromSearch} />
        <ScheduleEditorTable
          schedule={schedule}
          setSchedule={setSchedule}
          options={options}
        />
        <ButtonLink onClick={saveSchedule}>Save Schedule</ButtonLink>
        <ButtonLink
          className="button"
          onClick={() => deleteSchedule('groupNo')}
        >
          Delete Schedule
        </ButtonLink>
        {conflictMessage && (
          <div className="conflict-message">{conflictMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ManualScheduleEditorPage;
