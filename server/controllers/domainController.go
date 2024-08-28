package controllers

import (
	"webapp/database"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetCollection(c *fiber.Ctx) error {
	var results []bson.M
	var cursor *mongo.Cursor

	collectionName := c.Params("name")

	switch collectionName {
	case "adventures":
		{
			newCursor, err := database.Adventures.Find(c.Context(), bson.M{})
			if err != nil {
				return fiber.NewError(fiber.StatusInternalServerError, "Failed to get the cursor")
			}
			cursor = newCursor
		}
	case "backgrounds":
		{
			newCursor, err := database.Backgrounds.Find(c.Context(), bson.M{})
			if err != nil {
				return fiber.NewError(fiber.StatusInternalServerError, "Failed to get the cursor")
			}
			cursor = newCursor
		}
	case "classes":
		{
			newCursor, err := database.CharacterClasses.Find(c.Context(), bson.M{})
			if err != nil {
				return fiber.NewError(fiber.StatusInternalServerError, "Failed to get the cursor")
			}
			cursor = newCursor
		}
	case "feats":
		{
			newCursor, err := database.Feats.Find(c.Context(), bson.M{})
			if err != nil {
				return fiber.NewError(fiber.StatusInternalServerError, "Failed to get the cursor")
			}
			cursor = newCursor
		}
	case "magic-items":
		{
			newCursor, err := database.MagicItems.Find(c.Context(), bson.M{})
			if err != nil {
				return fiber.NewError(fiber.StatusInternalServerError, "Failed to get the cursor")
			}
			cursor = newCursor
		}
	case "monsters":
		{
			newCursor, err := database.Monsters.Find(c.Context(), bson.M{})
			if err != nil {
				return fiber.NewError(fiber.StatusInternalServerError, "Failed to get the cursor")
			}
			cursor = newCursor
		}
	case "races":
		{
			newCursor, err := database.Races.Find(c.Context(), bson.M{})
			if err != nil {
				return fiber.NewError(fiber.StatusInternalServerError, "Failed to get the cursor")
			}
			cursor = newCursor
		}
	case "retainers":
		{
			newCursor, err := database.Retainers.Find(c.Context(), bson.M{})
			if err != nil {
				return fiber.NewError(fiber.StatusInternalServerError, "Failed to get the cursor")
			}
			cursor = newCursor
		}
	case "spells":
		{
			newCursor, err := database.Spells.Find(c.Context(), bson.M{})
			if err != nil {
				return fiber.NewError(fiber.StatusInternalServerError, "Failed to get the cursor")
			}
			cursor = newCursor
		}
	case "subclasses":
		{
			newCursor, err := database.Subclasses.Find(c.Context(), bson.M{})
			if err != nil {
				return fiber.NewError(fiber.StatusInternalServerError, "Failed to get the cursor")
			}
			cursor = newCursor
		}
	default:
		return fiber.NewError(fiber.StatusNotFound, "No such collection")
	}

	if err := cursor.All(c.Context(), &results); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to pull from database")
	}

	return c.JSON(results)
}
