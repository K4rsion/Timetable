package models

import (
	"MiniZincPlusServer/pkg/config"
	"gorm.io/gorm"
)

var db *gorm.DB

type Schedule struct {
	gorm.Model
	Groups   []string `json:"groups"`
	Teachers []string `json:"teachers"`
	Subjects []string `json:"subjects"`
	Rooms    []string `json:"rooms"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Schedule{})
}

func (s *Schedule) CreateSchedule() *Schedule {
	//db.NewRecord(s)
	db.Create(&s)
	return s
}

func GetAllSchedules() []Schedule {
	var Schedules []Schedule
	db.Find(&Schedules)
	return Schedules
}
