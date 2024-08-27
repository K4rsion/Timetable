package service

import (
	"timetable/models"
	"timetable/package/repository"
)

type SearchService struct {
	repo repository.Search
}

func NewSearchService(repo repository.Search) *SearchService {
	return &SearchService{repo: repo}
}

func (s *SearchService) SearchByTeacher(teacherName string) (models.ScheduleDB, error) {
	return s.repo.SearchByTeacher(teacherName)
}

func (s *SearchService) SearchByGroup(groupNo string) (models.ScheduleDbByGroup, error) {
	return s.repo.SearchByGroup(groupNo)
}
