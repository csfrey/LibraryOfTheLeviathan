package database

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Role      string               `json:"role,omitempty" bson:"role,omitempty"`
	Name      string               `json:"name,omitempty" bson:"name,omitempty"`
	Email     string               `json:"email,omitempty" bson:"email,omitempty"`
	Favorites []primitive.ObjectID `json:"favorites,omitempty" bson:"favorites,omitempty"`
	Password  []byte               `json:"-" bson:"password,omitempty"`
}

type Domain struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name      string             `json:"name,omitempty" bson:"name,omitempty"`
	Page      uint               `json:"page,omitempty" bson:"page,omitempty"`
	Source    string             `json:"source,omitempty" bson:"source,omitempty"`
	Summary   string             `json:"summary,omitempty" bson:"summary,omitempty"`
	CreatedBy primitive.ObjectID `json:"createdBy,omitempty" bson:"createdBy,omitempty"`
	UpdatedBy primitive.ObjectID `json:"updatedBy,omitempty" bson:"updatedBy,omitempty"`
	CreatedAt primitive.DateTime `json:"createdAt,omitempty" bson:"createdAt,omitempty"`
	UpdatedAt primitive.DateTime `json:"updatedAt,omitempty" bson:"updatedAt,omitempty"`
}

type Adventure struct {
	Domain

	TimeToComplete     float32 `json:"timeToComplete,omitempty" bson:"timeToComplete,omitempty"`
	NumberOfCharacters int     `json:"numberOfCharacters" bson:"numberOfCharacters,omitempty"`
	Levels             int     `json:"levels,omitempty" bson:"levels,omitempty"`
}

type Background struct {
	Domain
}

type CharacterClass struct {
	Domain

	Subclasses string `bson:"subclasses,omitempty"`
}

type Feat struct {
	Domain
}

type MagicItem struct {
	Domain

	Rarity string `bson:"rarity,omitempty"`
}

type Race struct {
	Domain
}

type Retainer struct {
	Domain
}

type Spell struct {
	Domain

	SchoolOfMagic string `bson:"schoolOfMagic,omitempty"`
	Level         uint   `bson:"level,omitempty"`
}

type Subclass struct {
	Domain

	ParentClass string `bson:"parentClass,omitempty"`
}
