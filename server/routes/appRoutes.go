package routes

import (
	"webapp/controllers"

	"github.com/gofiber/fiber/v2"
)

func AppRoutes(app *fiber.App) {
	app.Get("/api/users", controllers.GetUsers)
}
