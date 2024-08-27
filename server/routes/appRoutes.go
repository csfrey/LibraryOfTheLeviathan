package routes

import (
	"webapp/controllers"

	"github.com/gofiber/fiber/v2"
)

func AppRoutes(app *fiber.App) {
	app.Get("/api/users", controllers.GetUsers)
	app.Put("/api/user/:id", controllers.UpdateUser)
	app.Delete("/api/user/:id", controllers.DeleteUser)
}
