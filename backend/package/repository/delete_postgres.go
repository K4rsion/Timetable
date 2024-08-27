package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
)

type DeletePostgres struct {
	db *sqlx.DB
}

func NewDeletePostgres(db *sqlx.DB) *DeletePostgres {
	return &DeletePostgres{db: db}
}

func (r *DeletePostgres) DeleteSchedule(groupNo string) error {
	query := fmt.Sprintf(`
		DELETE FROM %s s
		USING %s sg
		WHERE s.group_id = sg.group_id
		AND sg.group_no = $1;
	`, schedulesTable, groupsTable)
	_, err := r.db.Exec(query, groupNo)
	if err != nil {
		return err
	}
	return nil
}

func (r *DeletePostgres) DeleteTeacher(teacherCode string) error {
	query := fmt.Sprintf(`
		DELETE FROM %s
		WHERE teacher_code=$1
	`, teachersTable)
	_, err := r.db.Exec(query, teacherCode)
	if err != nil {
		return err
	}
	return nil
}

func (r *DeletePostgres) DeleteGroup(groupNo string) error {
	query := fmt.Sprintf(`
		DELETE FROM %s
		WHERE group_no=$1
	`, groupsTable)
	_, err := r.db.Exec(query, groupNo)
	if err != nil {
		return err
	}
	return nil
}

func (r *DeletePostgres) DeleteSubject(subjectName string) error {
	query := fmt.Sprintf(`
		DELETE FROM %s
		WHERE subject_name=$1
	`, subjectsTable)
	_, err := r.db.Exec(query, subjectName)
	if err != nil {
		return err
	}
	return nil
}

func (r *DeletePostgres) DeleteClassroom(classroomNo string) error {
	query := fmt.Sprintf(`
		DELETE FROM %s
		WHERE classroom_no=$1
	`, classroomsTable)
	_, err := r.db.Exec(query, classroomNo)
	if err != nil {
		return err
	}
	return nil
}
