package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"timetable/models"
)

type AuthPostgres struct {
	db *sqlx.DB
}

func NewAuthPostgres(db *sqlx.DB) *AuthPostgres {
	return &AuthPostgres{db: db}
}

func (r *AuthPostgres) CreateUser(user models.User) (int, error) {
	var id int
	query := fmt.Sprintf("INSERT INTO %s (username, password_hash, user_role) values ($1, $2, $3) RETURNING user_id", usersTable)

	row := r.db.QueryRow(query, user.Username, user.Password, user.UserRole)
	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *AuthPostgres) GetUser(username, password string) (models.User, error) {
	var user models.User
	query := fmt.Sprintf("SELECT user_id, username, password_hash, user_role FROM %s WHERE username=$1 AND password_hash=$2", usersTable)
	err := r.db.Get(&user, query, username, password)

	return user, err
}

func (r *AuthPostgres) DeleteScheduler(id int) error {
	query := fmt.Sprintf("DELETE FROM %s WHERE user_id=$1", usersTable)
	_, err := r.db.Exec(query, id)
	if err != nil {
		return err
	}
	return nil
}

func (r *AuthPostgres) GetSchedulers() ([]models.User, error) {
	var users []models.User
	query := fmt.Sprintf("SELECT user_id, username, user_role FROM %s WHERE user_role='scheduler'", usersTable)
	err := r.db.Select(&users, query)
	return users, err
}
