package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) deleteSchedule(c *gin.Context) {
	groupNo := c.Param("groupNo")

	err := h.services.Delete.DeleteSchedule(groupNo)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, "success")
}

func (h *Handler) deleteTeacher(c *gin.Context) {
	teacherCode := c.Param("teacherCode")

	err := h.services.Delete.DeleteTeacher(teacherCode)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, "success")
}

func (h *Handler) deleteGroup(c *gin.Context) {
	groupNo := c.Param("groupNo")

	err := h.services.Delete.DeleteGroup(groupNo)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, "success")
}

func (h *Handler) deleteSubject(c *gin.Context) {
	subjectName := c.Param("subjectName")

	err := h.services.Delete.DeleteSubject(subjectName)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, "success")
}

func (h *Handler) deleteClassroom(c *gin.Context) {
	classroomNo := c.Param("classroomNo")

	err := h.services.Delete.DeleteClassroom(classroomNo)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, "success")
}
