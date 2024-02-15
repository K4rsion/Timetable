package models

import (
	"Timetable/pkg/config"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB

type Schedule struct {
	gorm.Model
	//`gorm:""json"groups"`
	Groups   string `json:"groups"`
	Teachers string `json:"teachers"`
	Subjects string `json:"subjects"`
	Rooms    string `json:"rooms"`
	//constraints
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Schedule{})
}

func (s *Schedule) CreateSchedule() *Schedule {
	db.NewRecord(s)
	db.Create(&s)
	return s
}

func GetAllSchedules() []Schedule {
	var Schedules []Schedule
	db.Find(&Schedules)
	return Schedules
}

func GetScheduleById(Id int64) (*Schedule, *gorm.DB) {
	var schedule Schedule
	db := db.Where("ID=?", Id).Find(&schedule)
	return &schedule, db
}

func DeleteSchedule(Id int64) Schedule {
	var schedule Schedule
	db.Where("ID=?", Id).Delete(schedule)
	return schedule
}
