package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"
	"timetable/models"
)

type CretePostgres struct {
	db *sqlx.DB
}

func NewCreatePostgres(db *sqlx.DB) *CretePostgres {
	return &CretePostgres{db: db}
}

func (r *CretePostgres) SaveSchedule(schedule models.ScheduleEntry, teacherId int, groupId int, subjectId int, classroomId int) error {
	var id int
	query := fmt.Sprintf("INSERT INTO %s (group_id, teacher_id, classroom_id, subject_id, day_of_week, type, time_slots) values ($1, $2, $3, $4, $5, $6, $7) RETURNING teacher_id", schedulesTable)

	row := r.db.QueryRow(query, groupId, teacherId, classroomId, subjectId, schedule.Day, schedule.Type, pq.Array(schedule.TimeSlots))
	if err := row.Scan(&id); err != nil {
		return err
	}

	return nil
}

func (r *CretePostgres) CreateTeacher(teacher models.Teacher) (int, error) {
	var id int
	query := fmt.Sprintf("INSERT INTO %s (teacher_name, teacher_code) values ($1, $2) RETURNING teacher_id", teachersTable)

	row := r.db.QueryRow(query, teacher.Name, teacher.Code)
	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *CretePostgres) CreateGroup(group models.Group) (int, error) {
	var id int
	query := fmt.Sprintf("INSERT INTO %s (group_no) values ($1) RETURNING group_id", groupsTable)

	row := r.db.QueryRow(query, group.GroupNo)
	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *CretePostgres) CreateSubject(subject models.Subject) (int, error) {
	var id int
	query := fmt.Sprintf("INSERT INTO %s (subject_name) values ($1) RETURNING subject_id", subjectsTable)

	row := r.db.QueryRow(query, subject.SubjectName)
	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *CretePostgres) CreateClassroom(classroom models.Classroom) (int, error) {
	var id int
	query := fmt.Sprintf("INSERT INTO %s (classroom_no, classroom_type) values ($1, $2) RETURNING classroom_id", classroomsTable)

	row := r.db.QueryRow(query, classroom.ClassroomNo, classroom.ClassroomType)
	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

//////////////////

func (r *CretePostgres) GetTeacher(teacher models.Teacher) (int, error) {
	var id int
	query := fmt.Sprintf("SELECT teacher_id FROM %s WHERE teacher_name=$1 AND teacher_code=$2", teachersTable)
	err := r.db.Get(&id, query, teacher.Name, teacher.Code)

	return id, err
}

func (r *CretePostgres) GetGroup(group models.Group) (int, error) {
	var id int
	query := fmt.Sprintf("SELECT group_id FROM %s WHERE group_no=$1", groupsTable)
	err := r.db.Get(&id, query, group.GroupNo)

	return id, err
}

func (r *CretePostgres) GetSubject(subject models.Subject) (int, error) {
	var id int
	query := fmt.Sprintf("SELECT subject_id FROM %s WHERE subject_name=$1", subjectsTable)
	err := r.db.Get(&id, query, subject.SubjectName)

	return id, err
}

func (r *CretePostgres) GetClassroom(classroom models.Classroom) (int, error) {
	var id int
	query := fmt.Sprintf("SELECT classroom_id FROM %s WHERE classroom_no=$1", classroomsTable)
	err := r.db.Get(&id, query, classroom.ClassroomNo)

	return id, err
}

/////////////////////////

func (r *CretePostgres) GetAllTeachers() ([]models.Teacher, error) {
	var teachers []models.Teacher
	query := fmt.Sprintf("SELECT * FROM %s", teachersTable)
	err := r.db.Select(&teachers, query)
	if err != nil {
		return nil, err
	}
	return teachers, nil
}

func (r *CretePostgres) GetAllGroups() ([]models.Group, error) {
	var groups []models.Group
	query := fmt.Sprintf("SELECT * FROM %s", groupsTable)
	err := r.db.Select(&groups, query)
	if err != nil {
		return nil, err
	}
	return groups, nil
}

func (r *CretePostgres) GetAllSubjects() ([]models.Subject, error) {
	var subjects []models.Subject
	query := fmt.Sprintf("SELECT * FROM %s", subjectsTable)
	err := r.db.Select(&subjects, query)
	if err != nil {
		return nil, err
	}
	return subjects, nil
}

func (r *CretePostgres) GetAllClassrooms() ([]models.Classroom, error) {
	var classrooms []models.Classroom
	query := fmt.Sprintf("SELECT * FROM %s", classroomsTable)
	err := r.db.Select(&classrooms, query)
	if err != nil {
		return nil, err
	}
	return classrooms, nil
}
