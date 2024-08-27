package database

import (
	"context"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	Database         *mongo.Database
	Users            *mongo.Collection
	Adventures       *mongo.Collection
	Backgrounds      *mongo.Collection
	CharacterClasses *mongo.Collection
	Feats            *mongo.Collection
	MagicItems       *mongo.Collection
	Races            *mongo.Collection
	Retainers        *mongo.Collection
	Spells           *mongo.Collection
	Subclasses       *mongo.Collection
)

func Setup() *mongo.Client {
	uri := os.Getenv("MONGO_URI")

	// Use the SetServerAPIOptions() method to set the Stable API version to 1
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	// Send a ping to confirm a successful connection
	var result bson.M
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{Key: "ping", Value: 1}}).Decode(&result); err != nil {
		panic(err)
	}
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")

	Database = client.Database("lotl")
	Users = Database.Collection("users")
	Adventures = Database.Collection("adventures")
	Backgrounds = Database.Collection("backgrounds")
	CharacterClasses = Database.Collection("character_classes")
	Feats = Database.Collection("feats")
	MagicItems = Database.Collection("magic_items")
	Races = Database.Collection("races")
	Retainers = Database.Collection("retainers")
	Spells = Database.Collection("spells")
	Subclasses = Database.Collection("subclasses")

	return client
}
