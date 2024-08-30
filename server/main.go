package main

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"webapp/database"
	"webapp/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("Starting...")

	godotenv.Load()
	fmt.Println("Environment variables loaded.")

	app := fiber.New(fiber.Config{
		BodyLimit: 1024 * 1024 * 1024,
	})
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:8000, http://localhost:5173",
	}))
	fmt.Println("App created.")

	client := database.Setup()
	fmt.Println("Database connected.")

	defer client.Disconnect(context.TODO())

	routes.AuthRoutes(app)
	fmt.Println("Auth routes set up.")

	routes.AppRoutes(app)
	fmt.Println("App routes set up.")

	routes.DomainRoutes(app)
	fmt.Println("Domain routes set up.")

	routes.IngestRoutes(app)
	fmt.Println("Ingest routes set up.")

	port, _ := strconv.Atoi(os.Getenv("PORT"))
	app.Listen(fmt.Sprintf(":%d", port))
}
