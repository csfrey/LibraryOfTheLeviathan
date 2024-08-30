package routes

import (
	"context"
	"webapp/controllers"

	"github.com/gofiber/fiber/v2"
)

func IngestRoutes(app *fiber.App) {
	controllers.OpenaiInit(context.Background())

	app.Post("/api/ingest", controllers.Ingest)
}
