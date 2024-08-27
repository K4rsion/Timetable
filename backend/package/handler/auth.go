package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time"
	"timetable/models"
)

func (h *Handler) signUp(c *gin.Context) {
	var input models.User

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, "invalid input body")
		return
	}

	id, err := h.services.Authorization.CreateUser(input)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

type signInInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (h *Handler) signIn(c *gin.Context) {
	var input signInInput

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	user, err := h.services.Authorization.GetUser(input.Username, input.Password)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	token, err := h.services.Authorization.GenerateToken(input.Username, input.Password)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	// Установка токена в cookie
	c.SetCookie(
		"token",
		token,
		int(24*time.Hour.Seconds()),
		"/",
		"",
		false,
		true,
	)

	c.JSON(http.StatusOK, map[string]interface{}{
		//"token":    token,
		"username": user.Username,
		"role":     user.UserRole,
	})
}

func (h *Handler) deleteScheduler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	err = h.services.Authorization.DeleteScheduler(id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, "success")
}

func (h *Handler) getSchedulers(c *gin.Context) {
	var users []models.User

	users, err := h.services.Authorization.GetSchedulers()
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, users)
}

func (h *Handler) signOut(c *gin.Context) {
	c.Status(http.StatusOK)
}
