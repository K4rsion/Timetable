import React from 'react';
import ScheduleTable from '../components/ScheduleTable/ScheduleTable';
import Header from '../components/Header/Header';
import SearchPanel from '../components/SearchPanel/SearchPanel';

// Пример JSON данных
const jsonData = [
  {
    teacher: 'Дмитрий Иртегов',
    teacher_code: '000001',
    subject: 'Python',
    groups: ['21216'],
    type: 'Семинар',
    duration_hours: '',
    classroom: '4214',
    day: 'Пн',
    timeslots: [15],
  },
  {
    teacher: 'Дмитрий Иртегов',
    teacher_code: '000001',
    subject: 'Python',
    groups: ['21213', '21214', '21215', '21216'],
    type: 'Лекция',
    duration_hours: '',
    classroom: '3107',
    day: 'Ср',
    timeslots: [20],
  },
  {
    teacher: 'Дмитрий Иртегов',
    teacher_code: '000001',
    subject: 'Python',
    groups: ['21215'],
    type: 'Семинар',
    duration_hours: '',
    classroom: '4214',
    day: 'Чт',
    timeslots: [15],
  },
  {
    teacher: 'Дмитрий Иртегов',
    teacher_code: '000001',
    subject: 'Python',
    groups: ['21214'],
    type: 'Семинар',
    duration_hours: '',
    classroom: '4214',
    day: 'Чт',
    timeslots: [14],
  },
  {
    teacher: 'Дмитрий Иртегов',
    teacher_code: '000001',
    subject: 'Python',
    groups: ['21213'],
    type: 'Семинар',
    duration_hours: '',
    classroom: '4213',
    day: 'Чт',
    timeslots: [16],
  },
];

const daysMapping = {
  Пн: 0,
  Вт: 1,
  Ср: 2,
  Чт: 3,
  Пт: 4,
  Сб: 5,
  Вс: 6,
};

const timeSlotsMapping = {
  13: '12:40 - 14:15',
  14: '14:30 - 16:05',
  15: '16:20 - 17:55',
  16: '18:10 - 19:45',
  17: '19:45 - 21:20',
  18: '08:00 - 09:35',
  19: '09:50 - 11:25',
  20: '11:40 - 13:15',
};

const parseSchedule = (data) => {
  const parsedSchedule = {};

  data.forEach((item) => {
    const { teacher, subject, classroom, day, timeslots } = item;
    timeslots.forEach((slot) => {
      const time = timeSlotsMapping[slot];
      if (!parsedSchedule[time]) {
        parsedSchedule[time] = Array(7).fill(null);
      }
      parsedSchedule[time][daysMapping[day]] = {
        subject,
        teacher,
        location: classroom,
      };
    });
  });

  return parsedSchedule;
};

const schedule = parseSchedule(jsonData);

const SchedulePage: React.FC = () => (
  <div>
    <ScheduleTable schedule={schedule} />
    <SearchPanel />
  </div>
);

export default SchedulePage;
