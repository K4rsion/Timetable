package models

type Classroom struct {
	Id            int    `json:"-" db:"classroom_id"`
	ClassroomNo   string `json:"classroom_no" binding:"required" db:"classroom_no"`
	ClassroomType string `json:"classroom_type" binding:"required" db:"classroom_type"`
}
