package service

import (
	"errors"
	"os"
	"os/exec"
	"timetable/models"
	"timetable/package/repository"
)

type CreateService struct {
	repo repository.Create
}

func NewCreateService(repo repository.Create) *CreateService {
	return &CreateService{repo: repo}
}

func (s *CreateService) CreateAuto(inputJson []byte) ([]byte, error) {
	pythonScript := "python/generator/scheduler.py"
	filePath := "python/generator/json"
	fileOutput := "/output.json"
	fileInput := "/input.json"

	err := os.WriteFile(filePath+fileInput, inputJson, 0644)
	if err != nil {
		return nil, errors.New("error writing to file")
	}

	cmd := exec.Command("py", pythonScript, filePath)

	_, err = cmd.CombinedOutput()
	if err != nil {
		return nil, errors.New("error executing cmd")
	}

	if exitCode := cmd.ProcessState.ExitCode(); exitCode != 0 {
		return nil, errors.New("error exit code")
	}

	outputJson, err := os.ReadFile(filePath + fileOutput)
	if err != nil {
		return nil, errors.New("error reading from file")
	}

	return outputJson, nil
}

func (s *CreateService) CheckSchedule(inputJson []byte) ([]byte, error) {
	pythonScript := "python/validator/validator.py"
	filePath := "python/validator/json/"
	fileOutput := "output.json"
	fileInput := "input.json"

	err := os.WriteFile(filePath+fileInput, inputJson, 0644)
	if err != nil {
		return nil, errors.New("error writing to file")
	}

	cmd := exec.Command("py", pythonScript, filePath)

	_, err = cmd.CombinedOutput()
	if err != nil {
		return nil, errors.New("error executing cmd")
	}

	if exitCode := cmd.ProcessState.ExitCode(); exitCode != 0 {
		return nil, errors.New("error exit code")
	}

	outputJson, err := os.ReadFile(filePath + fileOutput)
	if err != nil {
		return nil, errors.New("error reading from file")
	}

	return outputJson, nil
}

func (s *CreateService) SaveSchedule(schedule models.ScheduleDB) error {
	for i := 0; i < len(schedule); i++ {
		currentSchedule := schedule[i]

		teacher := models.Teacher{Name: currentSchedule.Teacher, Code: currentSchedule.TeacherCode}
		teacherId, err := s.repo.GetTeacher(teacher)
		if err != nil {
			return err
		}

		subject := models.Subject{SubjectName: currentSchedule.Subject}
		subjectId, err := s.repo.GetSubject(subject)
		if err != nil {
			return err
		}

		classroom := models.Classroom{ClassroomNo: currentSchedule.Classroom}
		classroomId, err := s.repo.GetClassroom(classroom)
		if err != nil {
			return err
		}

		groups := currentSchedule.Groups

		for j := 0; j < len(groups); j++ {
			currentGroup := groups[j]
			group := models.Group{GroupNo: currentGroup}
			groupId, err := s.repo.GetGroup(group)
			if err != nil {
				return err
			}

			err = s.repo.SaveSchedule(currentSchedule, teacherId, groupId, subjectId, classroomId)
			if err != nil {
				return err
			}
		}
	}
	return nil
}

func (s *CreateService) GetAll() (models.Common, error) {
	var common models.Common
	teachers, err := s.repo.GetAllTeachers()
	if err != nil {
		return models.Common{}, err
	}

	groups, err := s.repo.GetAllGroups()
	if err != nil {
		return models.Common{}, err
	}

	subjects, err := s.repo.GetAllSubjects()
	if err != nil {
		return models.Common{}, err
	}

	classrooms, err := s.repo.GetAllClassrooms()
	if err != nil {
		return models.Common{}, err
	}

	common.Teachers = teachers
	common.Groups = groups
	common.Subjects = subjects
	common.Classrooms = classrooms

	return common, nil
}

func (s *CreateService) CreateTeacher(teacher models.Teacher) (int, error) {
	return s.repo.CreateTeacher(teacher)
}

func (s *CreateService) CreateGroup(group models.Group) (int, error) {
	return s.repo.CreateGroup(group)
}

func (s *CreateService) CreateSubject(subject models.Subject) (int, error) {
	return s.repo.CreateSubject(subject)
}

func (s *CreateService) CreateClassroom(classroom models.Classroom) (int, error) {
	return s.repo.CreateClassroom(classroom)
}
