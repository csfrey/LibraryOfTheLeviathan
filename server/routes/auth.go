package routes

import (
	"webapp/controllers"

	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Post("/api/logout", controllers.Logout)
	app.Get("/api/current_user", controllers.CurrentUser)
	app.Put("/api/current_user", controllers.SelfUpdateUser)
	app.Put("/api/change_password", controllers.ChangePassword)
}
