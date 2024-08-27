package models

type User struct {
	Id       int    `json:"user_id" db:"user_id"`
	Username string `json:"username" binding:"required" db:"username"`
	Password string `json:"password" binding:"required" db:"password_hash"`
	UserRole string `json:"user_role" binding:"required" db:"user_role"`
}
