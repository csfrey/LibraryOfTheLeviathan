package controllers

import (
	"webapp/database"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func GetUsers(c *fiber.Ctx) error {
	admin, err := GetUserModelFromJWT(c)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Failed to get user",
		})
	}

	if admin.Role != "admin" {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Insufficient privileges",
		})
	}

	var users []database.User
	cursor, err := database.Users.Find(c.Context(), bson.M{})
	if err != nil {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Users not found",
		})
	}
	if err := cursor.All(c.Context(), &users); err != nil {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "Users not parsed",
		})
	}

	return c.JSON(users)
}
