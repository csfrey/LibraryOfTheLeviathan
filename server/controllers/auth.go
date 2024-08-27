package controllers

import (
	"fmt"
	"os"
	"time"
	"webapp/database"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {
	fmt.Println("Registering user.")
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// check if email already used
	var user database.User

	if err := database.Users.FindOne(c.Context(), bson.M{"email": data["email"]}).Decode(&user); err == nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Email already in use",
		})
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user = database.User{
		Role:     "viewer",
		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}

	result, err := database.Users.InsertOne(c.Context(), user)
	fmt.Println("Inserted user to database")

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
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect password",
		})
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
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("AUTH_SECRET")), nil
	})

	if err != nil || !token.Valid {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	claims := token.Claims
	issuer, _ := claims.GetIssuer()
	userObjectID, _ := primitive.ObjectIDFromHex(issuer)

	var user database.User

	if err := database.Users.FindOne(c.Context(), bson.M{"_id": userObjectID}).Decode(&user); err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	return c.JSON(user)
}

// only accepts name
func SelfUpdateUser(c *fiber.Ctx) error {
	// Check auth status of JWT
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("AUTH_SECRET")), nil
	})

	if err != nil || !token.Valid {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	// Find user by JWT Issuer (a.k.a. user ID)
	claims := token.Claims
	issuer, _ := claims.GetIssuer()
	userObjectID, _ := primitive.ObjectIDFromHex(issuer)

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
