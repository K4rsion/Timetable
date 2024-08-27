package service

import (
	"timetable/models"
	"timetable/package/repository"
)

type Authorization interface {
	CreateUser(user models.User) (int, error)
	GenerateToken(username, password string) (string, error)
	ParseToken(accessToken string) (int, string, error)
	DeleteScheduler(id int) error
	GetSchedulers() ([]models.User, error)
	GetUser(username, password string) (models.User, error)
}

type Create interface {
	CreateAuto(inputJson []byte) ([]byte, error)
	CheckSchedule(inputJson []byte) ([]byte, error)
	SaveSchedule(schedule models.ScheduleDB) error
	CreateTeacher(teacher models.Teacher) (int, error)
	CreateGroup(group models.Group) (int, error)
	CreateSubject(subject models.Subject) (int, error)
	CreateClassroom(classroom models.Classroom) (int, error)
	GetAll() (models.Common, error)
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

type Service struct {
	Authorization
	Create
	Search
	Update
	Delete
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
		Create:        NewCreateService(repos.Create),
		Search:        NewSearchService(repos.Search),
		Delete:        NewDeleteService(repos.Delete),
	}
}
