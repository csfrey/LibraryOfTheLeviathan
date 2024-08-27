package controllers

import (
	"os"
	"webapp/database"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetUserObjectIDFromJWT(c *fiber.Ctx) (*primitive.ObjectID, error) {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("AUTH_SECRET")), nil
	})
	if err != nil || !token.Valid {
		c.Status(fiber.StatusUnauthorized)
		return nil, err
	}

	// Pull user ID out of JWT
	claims := token.Claims
	issuer, _ := claims.GetIssuer()
	userObjectID, _ := primitive.ObjectIDFromHex(issuer)

	return &userObjectID, nil
}

func GetUserModelFromObjectID(c *fiber.Ctx, userObjectID *primitive.ObjectID) (*database.User, error) {
	var user database.User
	if err := database.Users.FindOne(c.Context(), bson.M{"_id": userObjectID}).Decode(&user); err != nil {
		c.Status(fiber.StatusNotFound)
		return nil, err
	}
	return &user, nil
}

func GetUserModelFromJWT(c *fiber.Ctx) (*database.User, error) {
	userObjectID, err := GetUserObjectIDFromJWT(c)
	if err != nil {
		return nil, err
	}

	user, err := GetUserModelFromObjectID(c, userObjectID)
	if err != nil {
		return nil, err
	}

	return user, nil
}
