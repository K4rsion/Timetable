package routes

import (
	"Timetable/pkg/controllers"
	"github.com/gorilla/mux"
)

func RegisterTimetableRoutes(router *mux.Router) {
	router.HandleFunc("/schedule/add/", controllers.AddSchedule).Methods("POST")
	router.HandleFunc("/schedule/get/{scheduleId}", controllers.GetScheduleById).Methods("GET")
	router.HandleFunc("/schedule/update/{scheduleId}", controllers.UpdateSchedule).Methods("PUT")
	router.HandleFunc("/schedule/delete/{scheduleId}", controllers.DeleteSchedule).Methods("DELETE")
	router.HandleFunc("/schedule/getAll/", controllers.GetSchedule).Methods("GET")
	//router.HandleFunc("/login/", controllers.AutoHandler).Methods("POST")
	//router.HandleFunc("/schedule/auto/", controllers.AutoHandler).Methods("POST")
	//router.HandleFunc("/schedule/manual/", middleware.MiddleHandler).Methods("POST")
	//router.HandleFunc("/schedule/import/", controllers.AutoHandler).Methods("POST")
}
