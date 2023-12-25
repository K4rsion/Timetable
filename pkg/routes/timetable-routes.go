package routes

import (
	"MiniZincPlusServer/pkg/controllers"
	"github.com/gorilla/mux"
)

var RegisterTimetableRoutes = func(router *mux.Router) {
	//router.HandleFunc("/schedule/auto/", controllers.AutoHandler).Methods("POST")
	router.HandleFunc("/schedule/manual/", controllers.AutoHandler).Methods("POST")
	//router.HandleFunc("/schedule/import/", controllers.AutoHandler).Methods("POST")
	//router.HandleFunc("/schedule/{scheduleID}", controllers.AutoHandler).Methods("GET")
	//router.HandleFunc("/schedule/{scheduleID}", controllers.AutoHandler).Methods("DELETE")
	//router.HandleFunc("/login/", controllers.AutoHandler).Methods("POST")
}
