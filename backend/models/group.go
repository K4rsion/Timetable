package models

type Group struct {
	Id      int    `json:"-" db:"group_id"`
	GroupNo string `json:"group_no" binding:"required" db:"group_no"`
}
