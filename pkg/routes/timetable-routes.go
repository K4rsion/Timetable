package routes

import (
	"Timetable/pkg/middleware"
	"github.com/gorilla/mux"
)

func RegisterTimetableRoutes(router *mux.Router) {
	//router.HandleFunc("/schedule/auto/", controllers.AutoHandler).Methods("POST")
	router.HandleFunc("/schedule/manual/", middleware.MiddleHandler).Methods("POST")
	//router.HandleFunc("/schedule/import/", controllers.AutoHandler).Methods("POST")
	//router.HandleFunc("/schedule/{scheduleID}", controllers.AutoHandler).Methods("GET")
	//router.HandleFunc("/schedule/{scheduleID}", controllers.AutoHandler).Methods("DELETE")
	//router.HandleFunc("/login/", controllers.AutoHandler).Methods("POST")
}
