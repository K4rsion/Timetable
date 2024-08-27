package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"timetable/models"
)

type SearchPostgres struct {
	db *sqlx.DB
}

func NewSearchPostgres(db *sqlx.DB) *SearchPostgres {
	return &SearchPostgres{db: db}
}

func (r *SearchPostgres) SearchByTeacher(teacherName string) (models.ScheduleDB, error) {
	var scheduleDb models.ScheduleDB

	query := fmt.Sprintf(`SELECT 
		th.teacher_name,
		th.teacher_code,
		sb.subject_name,
		s.day_of_week,
		s.type,
		s.time_slots,
		cr.classroom_no,
		array_agg(sg.group_no) AS groups
	FROM %s s
	JOIN %s sg ON sg.group_id = s.group_id 
	JOIN %s th ON th.teacher_id = s.teacher_id 
	JOIN %s sb ON sb.subject_id = s.subject_id 
	JOIN %s cr ON cr.classroom_id = s.classroom_id 
	WHERE th.teacher_name = $1
	GROUP BY 
		th.teacher_name,
		th.teacher_code,
		sb.subject_name,
		s.day_of_week,
		s.type,
		s.time_slots,
		cr.classroom_no`,
		schedulesTable, groupsTable, teachersTable, subjectsTable, classroomsTable)
	rows, err := r.db.Query(query, teacherName)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var entry models.ScheduleEntry
		var timeSlots pq.Int64Array // Используем pq.Int64Array для сканирования массива
		var groups pq.StringArray

		err := rows.Scan(
			&entry.Teacher,
			&entry.TeacherCode,
			&entry.Subject,
			&entry.Day,
			&entry.Type,
			&timeSlots,
			&entry.Classroom,
			&groups,
		)
		if err != nil {
			return nil, err
		}

		entry.TimeSlots = convertInt64ArrayToIntArray(timeSlots)
		entry.Groups = groups
		scheduleDb = append(scheduleDb, entry)
	}

	return scheduleDb, nil
}

func (r *SearchPostgres) SearchByGroup(groupNo string) (models.ScheduleDbByGroup, error) {
	var scheduleDb models.ScheduleDbByGroup

	query := fmt.Sprintf(`SELECT 
		th.teacher_name,
		th.teacher_code,
		sb.subject_name,
		s.day_of_week,
		s.type,
		s.time_slots,
		cr.classroom_no
	FROM %s s
	JOIN %s sg ON sg.group_id = s.group_id 
	JOIN %s th ON th.teacher_id = s.teacher_id 
	JOIN %s sb ON sb.subject_id = s.subject_id 
	JOIN %s cr ON cr.classroom_id = s.classroom_id 
	WHERE sg.group_no = $1`,
		schedulesTable, groupsTable, teachersTable, subjectsTable, classroomsTable)

	rows, err := r.db.Query(query, groupNo)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var entry models.ScheduleEntryByGroup
		err := rows.Scan(
			&entry.Teacher,
			&entry.TeacherCode,
			&entry.Subject,
			&entry.Day,
			&entry.Type,
			&entry.TimeSlots,
			&entry.Classroom,
		)
		if err != nil {
			return nil, err
		}

		scheduleDb = append(scheduleDb, entry)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return scheduleDb, nil
}

// Функция для преобразования pq.Int64Array в []int
func convertInt64ArrayToIntArray(arr pq.Int64Array) []int {
	intArr := make([]int, len(arr))
	for i, v := range arr {
		intArr[i] = int(v)
	}
	return intArr
}
