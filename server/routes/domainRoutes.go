package routes

import (
	"webapp/controllers"

	"github.com/gofiber/fiber/v2"
)

func DomainRoutes(app *fiber.App) {
	app.Get("/api/collection/:name", controllers.GetCollection)
}
