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

// type ClientUser struct {
// 	ID        primitive.ObjectID   `json:"_id,omitempty"`
// 	Role      string               `json:"role,omitempty"`
// 	Name      string               `json:"name,omitempty"`
// 	Email     string               `json:"email,omitempty"`
// 	Favorites []primitive.ObjectID `json:"favorites,omitempty"`
// }

type Domain struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Name      string             `bson:"name,omitempty"`
	Page      uint               `bson:"page,omitempty"`
	Source    string             `bson:"source,omitempty"`
	Summary   string             `bson:"summary,omitempty"`
	CreatedBy string             `bson:"created_by,omitempty"`
	UpdatedBy string             `bson:"updated_by,omitempty"`
	CreatedAt primitive.DateTime `bson:"created_at,omitempty"`
	UpdatedAt primitive.DateTime `bson:"updated_at,omitempty"`
}

type Adventure struct {
	Domain

	AvgHoursToComplete float32 `bson:"avg_hours_to_complete,omitempty"`
	AvgCharacters      int     `bson:"avg_characters,omitempty"`
	AvgLevel           int     `bson:"avg_level,omitempty"`
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

	SchoolOfMagic string `bson:"school_of_magic,omitempty"`
	Level         uint   `bson:"level,omitempty"`
}

type Subclass struct {
	Domain

	ParentClass string `bson:"parent_class,omitempty"`
}
