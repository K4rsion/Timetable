import React, { useState, useEffect } from 'react';
import ScheduleTable from '../components/ScheduleTable/ScheduleTable';
import Header from '../components/Header/Header';

const ScheduleEditorPage = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    // Fetch available groups
    fetch('/api/authorized/getGroups')
      .then((response) => response.json())
      .then((data) => {
        setGroups(data.groups);
        setSelectedGroup(data.groups[0]);
      })
      .catch((error) => console.error('Error fetching groups:', error));
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      // Fetch schedule for the selected group
      fetch(`/api/authorized/getSchedule?group=${selectedGroup}`)
        .then((response) => response.json())
        .then((data) => {
          setSchedule(data.schedule);
        })
        .catch((error) => console.error('Error fetching schedule:', error));
    }
  }, [selectedGroup]);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleSave = () => {
    // Save the updated schedule
    fetch('/api/authorized/saveSchedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ group: selectedGroup, schedule }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Schedule saved successfully:', data);
      })
      .catch((error) => console.error('Error saving schedule:', error));
  };

  return (
    <div>
      <div>
        <label htmlFor="groupSelect">Выберите группу:</label>
        <select
          id="groupSelect"
          value={selectedGroup}
          onChange={handleGroupChange}
        >
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <ScheduleTable schedule={schedule} setSchedule={setSchedule} />
      <button onClick={handleSave}>Сохранить расписание</button>
    </div>
  );
};

export default ScheduleEditorPage;
