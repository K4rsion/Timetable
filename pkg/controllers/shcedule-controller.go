package controllers

import (
	"Timetable/pkg/models"
	"Timetable/pkg/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

var NewSchedule models.Schedule

func GetSchedule(w http.ResponseWriter, r *http.Request) {
	newSchedules := models.GetAllSchedules()
	res, _ := json.Marshal(newSchedules)
	w.Header().Set("Content-Type", "pkjlication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetScheduleById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	scheduleId := vars["scheduleId"]
	Id, err := strconv.ParseInt(scheduleId, 0, 0)
	if err != nil {
		fmt.Println("error while parsing")
	}
	schedule, _ := models.GetScheduleById(Id)
	res, _ := json.Marshal(schedule)
	w.Header().Set("Content-Type", "pkjlication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func AddSchedule(w http.ResponseWriter, r *http.Request) {
	newSchedule := &models.Schedule{}
	utils.ParseBody(r, newSchedule)
	s := newSchedule.CreateSchedule()
	res, _ := json.Marshal(s)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func DeleteSchedule(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	scheduleId := vars["scheduleId"]
	Id, err := strconv.ParseInt(scheduleId, 0, 0)
	if err != nil {
		fmt.Println("error while parsing")
	}
	schedule := models.DeleteSchedule(Id)
	res, _ := json.Marshal(schedule)
	w.Header().Set("Content-Type", "pkjlication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func UpdateSchedule(w http.ResponseWriter, r *http.Request) {
	var updateSchedule = &models.Schedule{}
	utils.ParseBody(r, updateSchedule)
	vars := mux.Vars(r)
	scheduleId := vars["scheduleId"]
	Id, err := strconv.ParseInt(scheduleId, 0, 0)
	if err != nil {
		fmt.Println("error while parsing")
	}
	oldSchedule, db := models.GetScheduleById(Id)
	if updateSchedule.Groups != "" {
		oldSchedule.Groups = updateSchedule.Groups
	}
	if updateSchedule.Rooms != "" {
		oldSchedule.Rooms = updateSchedule.Rooms
	}
	if updateSchedule.Teachers != "" {
		oldSchedule.Teachers = updateSchedule.Teachers
	}
	if updateSchedule.Subjects != "" {
		oldSchedule.Subjects = updateSchedule.Subjects
	}
	db.Save(&oldSchedule)
	res, _ := json.Marshal(oldSchedule)
	w.Header().Set("Content-Type", "pkjlication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

//func AutoScheduleGenerator(w http.ResponseWriter, r *http.Request) {
//	body, _ := io.ReadAll(r.Body)
//	jsonData := string(body)
//	fmt.Println("Received JSON:", jsonData)
//	var data = utils.MiniZincSolver(jsonData)
//	fmt.Fprint(w, data)
//}
