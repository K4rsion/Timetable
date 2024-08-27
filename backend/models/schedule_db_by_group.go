package models

import "github.com/lib/pq"

type ScheduleEntryByGroup struct {
	Teacher     string        `json:"teacher" db:"teacher_name"`
	TeacherCode string        `json:"teacher_code" db:"teacher_code"`
	Subject     string        `json:"subject" db:"subject_name"`
	Type        string        `json:"type" db:"type"`
	Classroom   string        `json:"classroom" db:"classroom_no"`
	Day         string        `json:"day" db:"day_of_week"`
	TimeSlots   pq.Int64Array `json:"timeslots" db:"time_slots"`
}

type ScheduleDbByGroup []ScheduleEntryByGroup
