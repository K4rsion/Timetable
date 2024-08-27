package models

type ScheduleEntry struct {
	Teacher       string   `json:"teacher" db:"teacher_name"`
	TeacherCode   string   `json:"teacher_code" db:"teacher_code"`
	Subject       string   `json:"subject" db:"subject_name"`
	Groups        []string `json:"groups" db:"groups"`
	Type          string   `json:"type" db:"type"`
	DurationHours string   `json:"duration_hours" db:"-"`
	Classroom     string   `json:"classroom" db:"classroom_no"`
	Day           string   `json:"day" db:"day_of_week"`
	TimeSlots     []int    `json:"timeslots" db:"time_slots"`
}

type ScheduleDB []ScheduleEntry
