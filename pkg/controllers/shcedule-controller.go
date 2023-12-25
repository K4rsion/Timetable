package controllers

import (
	"Timetable/pkg/models"
	"Timetable/pkg/utils"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

var NewSchedule models.Schedule

func GetBook(w http.ResponseWriter, r *http.Request) {
	newSchedules := models.GetAllSchedules()
	res, _ := json.Marshal(newSchedules)
	w.Header().Set("Content-Type", "pkjlication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func AutoScheduleGenerator(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	jsonData := string(body)
	fmt.Println("Received JSON:", jsonData)
	var data = utils.MiniZincSolver(jsonData)
	fmt.Fprint(w, data)
}

// ManualScheduleCreation
// ImportSchedule
