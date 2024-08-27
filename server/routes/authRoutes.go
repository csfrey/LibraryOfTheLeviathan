package routes

import (
	"webapp/controllers"

	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App) {
	app.Post("/api/user/register", controllers.Register)
	app.Post("/api/user/login", controllers.Login)
	app.Post("/api/user/logout", controllers.Logout)
	app.Get("/api/user/current", controllers.CurrentUser)
	app.Put("/api/user/current", controllers.SelfUpdateUser)
	app.Put("/api/user/change_password", controllers.ChangePassword)
}
