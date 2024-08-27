import React, { useState, useEffect } from 'react';
import AuditoriumSelect from '../components/AuditoriumSelect/AuditoriumSelect';
import SlotInput from '../components/SlotInput/SlotInput';
import AddFieldButton from '../components/AddFieldButton/AddFieldButton';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import classes from './AutomaticGenerationPage.module.scss';

const AutomaticGenerationPage = () => {
  const [auditoriums, setAuditoriums] = useState({
    terminal: [''],
    lecture: [''],
    lab: [''],
    sports: [''],
  });

  const [slots, setSlots] = useState([
    {
      subject: '',
      type: '',
      teacher: '',
      groups: [],
      roomType: '',
      room: '',
      duration: '',
    },
  ]);

  const [allAuditoriums, setAllAuditoriums] = useState<string[]>([]);
  const [allSubjects, setAllSubjects] = useState<string[]>([]);
  const [allGroups, setAllGroups] = useState<string[]>([]);
  const [allTeachers, setAllTeachers] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/authorized/create/getAll',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTkyOTY4MDMsImlhdCI6MTcxOTI1MzYwMywidXNlcl9pZCI6MywidXNlcl9yb2xlIjoiYWRtaW4ifQ.deaA8PTse1PSmWBvl4Gc8nZtrHWCHcybqD1AbVpNLGA',
            },
          }
        );
        const data = await response.json();
        console.log('Fetched data:', data);

        const auditoriumsData = {
          terminal: data.classrooms
            .filter((classroom) => classroom.classroom_type === 'terminal')
            .map((classroom) => classroom.classroom_no),
          lecture: data.classrooms
            .filter((classroom) => classroom.classroom_type === 'lecture')
            .map((classroom) => classroom.classroom_no),
          lab: data.classrooms
            .filter((classroom) => classroom.classroom_type === 'lab')
            .map((classroom) => classroom.classroom_no),
          sports: data.classrooms
            .filter((classroom) => classroom.classroom_type === 'gym')
            .map((classroom) => classroom.classroom_no),
        };

        const allAuditoriums = [
          ...auditoriumsData.terminal,
          ...auditoriumsData.lecture,
          ...auditoriumsData.lab,
          ...auditoriumsData.sports,
        ];

        setAllAuditoriums(allAuditoriums);
        setAllSubjects(data.subjects.map((subject) => subject.subject_name));
        setAllGroups(data.groups.map((group) => group.group_no));
        setAllTeachers(
          data.teachers.map((teacher) => `${teacher.name} (${teacher.code})`)
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAuditoriumChange = (
    type: keyof typeof auditoriums,
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value;
    setAuditoriums((prevState) => {
      const newValues = [...prevState[type]];
      newValues[index] = newValue;
      return { ...prevState, [type]: newValues };
    });
  };

  const handleAddAuditorium = (type: keyof typeof auditoriums) => {
    setAuditoriums((prevState) => ({
      ...prevState,
      [type]: [...prevState[type], ''],
    }));
  };

  const handleRemoveAuditorium = (
    type: keyof typeof auditoriums,
    index: number
  ) => {
    setAuditoriums((prevState) => {
      const newValues = [...prevState[type]];
      newValues.splice(index, 1);
      return { ...prevState, [type]: newValues };
    });
  };

  const handleSlotChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newSlots = [...slots];
    newSlots[index][name] = value;
    setSlots(newSlots);
  };

  const addNewSlot = () => {
    setSlots([
      ...slots,
      {
        subject: '',
        type: '',
        teacher: '',
        groups: [],
        roomType: '',
        room: '',
        duration: '',
      },
    ]);
  };

  const removeSlot = (index: number) => {
    const newSlots = [...slots];
    newSlots.splice(index, 1);
    setSlots(newSlots);
  };

  const addNewGroupToSlot = (slotIndex: number) => {
    const newSlots = [...slots];
    newSlots[slotIndex].groups.push('');
    setSlots(newSlots);
  };

  const removeGroupFromSlot = (slotIndex: number, groupIndex: number) => {
    const newSlots = [...slots];
    newSlots[slotIndex].groups.splice(groupIndex, 1);
    setSlots(newSlots);
  };

  const handleGenerateSchedule = () => {
    fetch('http://localhost:8000/api/authorized/create/createAuto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auditoriums, slots }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = `/edit-schedule/${data.scheduleId}`;
      })
      .catch((error) => console.error('Error generating schedule:', error));
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentContainer}>
        <h2 className={classes.header}>Автоматическая генерация расписания</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <AuditoriumSelect
              label="Терминальные классы"
              values={auditoriums.terminal}
              onChange={(index, e) =>
                handleAuditoriumChange('terminal', index, e)
              }
              onAdd={() => handleAddAuditorium('terminal')}
              onRemove={(index) => handleRemoveAuditorium('terminal', index)}
              options={allAuditoriums}
            />
            <AuditoriumSelect
              label="Лекционные классы"
              values={auditoriums.lecture}
              onChange={(index, e) =>
                handleAuditoriumChange('lecture', index, e)
              }
              onAdd={() => handleAddAuditorium('lecture')}
              onRemove={(index) => handleRemoveAuditorium('lecture', index)}
              options={allAuditoriums}
            />
            <AuditoriumSelect
              label="Лабораторные классы"
              values={auditoriums.lab}
              onChange={(index, e) => handleAuditoriumChange('lab', index, e)}
              onAdd={() => handleAddAuditorium('lab')}
              onRemove={(index) => handleRemoveAuditorium('lab', index)}
              options={allAuditoriums}
            />
            <AuditoriumSelect
              label="Спортивный комплекс"
              values={auditoriums.sports}
              onChange={(index, e) =>
                handleAuditoriumChange('sports', index, e)
              }
              onAdd={() => handleAddAuditorium('sports')}
              onRemove={(index) => handleRemoveAuditorium('sports', index)}
              options={allAuditoriums.filter(
                (auditorium) => auditorium !== 'Выберите тип'
              )}
            />
          </div>
          <div>
            <h3 className={classes.smallHeaderSlots}>Слоты:</h3>
            {slots.map((slot, index) => (
              <div key={index}>
                <SlotInput
                  slot={slot}
                  auditoriums={auditoriums}
                  subjects={allSubjects}
                  teachers={allTeachers}
                  groups={allGroups}
                  onChange={(e) => handleSlotChange(index, e)}
                  onRemove={() => removeSlot(index)}
                  onAddGroup={() => addNewGroupToSlot(index)}
                  onRemoveGroup={(groupIndex) =>
                    removeGroupFromSlot(index, groupIndex)
                  }
                />
              </div>
            ))}
          </div>
          <div>
            <AddFieldButton onClick={addNewSlot} />
            <ButtonLink href="#" onClick={handleGenerateSchedule}>
              Сгенерировать расписание
            </ButtonLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutomaticGenerationPage;
