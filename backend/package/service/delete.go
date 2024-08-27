package service

import "timetable/package/repository"

type DeleteService struct {
	repo repository.Delete
}

func NewDeleteService(repo repository.Delete) *DeleteService {
	return &DeleteService{repo: repo}
}

func (s *DeleteService) DeleteSchedule(groupNo string) error {
	return s.repo.DeleteSchedule(groupNo)
}

func (s *DeleteService) DeleteTeacher(teacherCode string) error {
	return s.repo.DeleteTeacher(teacherCode)
}

func (s *DeleteService) DeleteGroup(groupNo string) error {
	return s.repo.DeleteGroup(groupNo)
}

func (s *DeleteService) DeleteSubject(subjectName string) error {
	return s.repo.DeleteSubject(subjectName)
}

func (s *DeleteService) DeleteClassroom(classroomNo string) error {
	return s.repo.DeleteClassroom(classroomNo)
}
