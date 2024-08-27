package models

type Subject struct {
	Id          int    `json:"-" db:"subject_id"`
	SubjectName string `json:"subject_name" binding:"required" db:"subject_name"`
}
