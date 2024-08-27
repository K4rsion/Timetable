package repository

import (
	"github.com/jmoiron/sqlx"
	"timetable/models"
)

type Authorization interface {
	CreateUser(user models.User) (int, error)
	GetUser(username, password string) (models.User, error)
	DeleteScheduler(id int) error
	GetSchedulers() ([]models.User, error)
}

type Create interface {
	SaveSchedule(schedule models.ScheduleEntry, teacherId int, groupId int, subjectId int, classroomId int) error
	CreateTeacher(teacher models.Teacher) (int, error)
	CreateGroup(group models.Group) (int, error)
	CreateSubject(subject models.Subject) (int, error)
	CreateClassroom(classroom models.Classroom) (int, error)

	GetTeacher(teacher models.Teacher) (int, error)
	GetGroup(group models.Group) (int, error)
	GetSubject(subject models.Subject) (int, error)
	GetClassroom(classroom models.Classroom) (int, error)

	GetAllTeachers() ([]models.Teacher, error)
	GetAllGroups() ([]models.Group, error)
	GetAllSubjects() ([]models.Subject, error)
	GetAllClassrooms() ([]models.Classroom, error)
}

type Search interface {
	SearchByTeacher(teacherName string) (models.ScheduleDB, error)
	SearchByGroup(groupNo string) (models.ScheduleDbByGroup, error)
}

type Update interface {
}

type Delete interface {
	DeleteSchedule(groupNo string) error
	DeleteTeacher(teacherCode string) error
	DeleteGroup(groupNo string) error
	DeleteSubject(subjectName string) error
	DeleteClassroom(classroomNo string) error
}

type Repository struct {
	Authorization
	Create
	Search
	Update
	Delete
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
		Create:        NewCreatePostgres(db),
		Search:        NewSearchPostgres(db),
		Delete:        NewDeletePostgres(db),
	}
}
