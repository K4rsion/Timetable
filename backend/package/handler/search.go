package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) searchByTeacher(c *gin.Context) {
	teacherName := c.Param("teacherName")

	lessons, err := h.services.Search.SearchByTeacher(teacherName)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, lessons)
}

func (h *Handler) searchByGroup(c *gin.Context) {
	groupNo := c.Param("groupNo")

	lessons, err := h.services.Search.SearchByGroup(groupNo)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, lessons)
}
