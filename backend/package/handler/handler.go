package handler

import (
	"github.com/gin-gonic/gin"
	"timetable/package/service"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	router.Use(CORSMiddleware())

	auth := router.Group("/auth")
	{
		authorized := auth.Group("/authorized", h.userIdentity)
		{
			admin := authorized.Group("/admin", h.checkRole("admin"))
			{
				admin.POST("/addScheduler", h.signUp)
				admin.POST("/deleteScheduler/:id", h.deleteScheduler)
				admin.GET("/getSchedulers", h.getSchedulers)
			}
			authorized.GET("/signOut", h.signOut)
		}
		auth.POST("/signIn", h.signIn)
	}

	api := router.Group("/api")
	{
		authorized := api.Group("/authorized", h.userIdentity)
		{
			create := authorized.Group("/create", h.checkRole("admin", "scheduler"))
			{
				create.POST("/createAuto", h.createAuto)
				create.POST("/checkSchedule", h.checkSchedule)
				create.POST("/saveSchedule", h.saveSchedule)

				create.GET("/getAll", h.getAll)

				create.POST("/teacher", h.createTeacher)
				create.POST("/group", h.createGroup)
				create.POST("/subject", h.createSubject)
				create.POST("/classroom", h.createClassroom)
			}

			deleteS := authorized.Group("/delete", h.checkRole("admin", "scheduler"))
			{
				deleteS.DELETE("/schedule/:groupNo", h.deleteSchedule)
				deleteS.DELETE("/teacher/:teacherCode", h.deleteTeacher)
				deleteS.DELETE("/group/:groupNo", h.deleteGroup)
				deleteS.DELETE("/subject/:subjectName", h.deleteSubject)
				deleteS.DELETE("/classroom/:classroomNo", h.deleteClassroom)
			}
		}
		search := api.Group("/search")
		{
			search.GET("/byTeacher/:teacherName", h.searchByTeacher)
			search.GET("/byGroup/:groupNo", h.searchByGroup)
		}
	}
	return router
}
