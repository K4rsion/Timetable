package models

type Teacher struct {
	Id   int    `json:"-" db:"teacher_id"`
	Name string `json:"name" binding:"required" db:"teacher_name"`
	Code string `json:"code" binding:"required" db:"teacher_code"`
}
