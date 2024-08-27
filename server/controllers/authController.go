package controllers

import (
	"os"
	"time"
	"webapp/database"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// check if email already used
	var user database.User

	if err := database.Users.FindOne(c.Context(), bson.M{"email": data["email"]}).Decode(&user); err == nil {
		return fiber.NewError(fiber.StatusBadRequest, "Email already in use")
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user = database.User{
		Role:     "viewer",
		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}

	result, err := database.Users.InsertOne(c.Context(), user)

	if err != nil {
		return err
	}

	return c.JSON(result)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user database.User

	if err := database.Users.FindOne(c.Context(), bson.M{"email": data["email"]}).Decode(&user); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		return fiber.NewError(fiber.StatusUnauthorized, "Username or password is incorrect")
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		Issuer:    user.ID.Hex(),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 30)),
	},
	)

	token, err := claims.SignedString([]byte(os.Getenv("AUTH_SECRET")))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Failed to generate JWT",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24 * 30),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "Login successful!",
	})
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:    "jwt",
		Value:   "",
		Expires: time.Now().Add(-time.Hour),
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "Successfully logged out",
	})
}

func CurrentUser(c *fiber.Ctx) error {
	user, err := GetUserModelFromJWT(c)

	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Failed to find user",
		})
	}

	return c.JSON(user)
}

// only accepts name
func SelfUpdateUser(c *fiber.Ctx) error {
	userObjectID, err := GetUserObjectIDFromJWT(c)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Failed to get User ID from JWT",
		})
	}

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	update := bson.M{"$set": bson.M{
		"name": data["name"],
	}}

	result, err := database.Users.UpdateByID(c.Context(), userObjectID, update)
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Update failed",
		})
	}

	return c.JSON(result)
}

// Expects fields "current_password" and "new_password"
func ChangePassword(c *fiber.Ctx) error {
	user, err := GetUserModelFromJWT(c)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Failed to find user",
		})
	}

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["currentPassword"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["newPassword"]), 14)

	update := bson.M{"$set": bson.M{
		"password": password,
	}}
	result, err := database.Users.UpdateByID(c.Context(), user.ID, update)
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Update failed",
		})
	}

	return c.JSON(result)
}
