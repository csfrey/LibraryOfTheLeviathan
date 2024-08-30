package controllers

import (
	"context"
	"fmt"
	"io"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	openai "github.com/sashabaranov/go-openai"
)

var (
	client    *openai.Client
	assistant openai.Assistant
)

func OpenaiInit(c context.Context) {
	client = openai.NewClient(os.Getenv("OPEN_AI_KEY"))
	name := "PDF Parser"
	instructions := "You are an assistant designed to help me scan PDFs of 3rd-party D&D publications. You will output data only a single, possibly large, JSON object, and you will output it without markdown formatting or any additional words. You will be given PDFs one at a time and you will scan the document and find and extract pieces of information that fall into the following categories:\n\n1. Adventure - A stuctured narrative that guides players through a series of encounters and challenges. Players explore locations, interact with non-player characters, and overcome obstacles to achieve specific objectives. Output data for an adventure should look like this:\n\n{\n    \"name\": string, // the name of the adventure\n    \"page\": string, // the page where the adventure starts\n    \"timeToComplete\": string, // the estimated time to complete the adventure\n    \"numberOfCharacters\": string, // the number of characters for which the adventure is designed\n    \"levels\": string, // the level(s) for which the adventure is designed\n    \"summary\": string // a description of the adventure no more than 4 sentences long\n}\n\n2. Background - The story and history of a character before they became an adventurer, also referred to as \"Character Background.\" It provides context for their skills, proficiencies, personality traits, and motivations, helping shape their identity and role in the game. Output data for a character background should look like this:\n\n{\n    \"name\": string, // the name of the background\n    \"page\": string, // the page where the background starts\n    \"summary\": string // a description of the background no more than 4 stences long\n}\n\n3. Class - A character's archetype that defines their role in the party, determining their abilities, skills, and combat style. Each class offers unique features and spells that shape how the character interacts with the game world. When new classes are defined, they are often followed by new subclasses for that class. Output data for a class should look like this:\n\n{\n    \"name\": string, // the name of the class\n    \"page\": string, // the page where you found the class\n    \"subclasses\": string, // a list of available subclass options\n    \"summary\": string // a description of the class no more than 4 sentences long\n}\n\n4. Feat - An optional feature that provides characters with special capabilities, enhancing their abilities or granting new options in combat and role-playing. Feats allow for character customization beyond class and race. Output data for a feat should look like this:\n\n{\n    \"name\": string, // the name of the feat\n    \"page\": string, // the page where you found the feat\n    \"summary\": string // a description of the feat no more than 4 sentences long\n}\n\n5. Magic Item - An object imbued with magical properties, often granting the user special abilities, bonuses, or effects, also called a \"Wondrous Item.\" Magic items range from simple enchanted weapons to powerful artifacts and can significantly impact gameplay. Output data for a magic item should look like this:\n\n{\n    \"name\": string, // the name of the magic item\n    \"page\": string, // the page where you found the magic item\n    \"rarity\": string, // the rarity rating of the magic item\n    \"summary\": string // a description of the magic item no more than 4 sentences long\n}\n\n6. Monster - A creature or entity that serves as an adversary for the players. Monsters have defined traits, abilities, and behaviors, challenging players through combat or other interactions. Output data for a monster should look like this:\n\n{\n    \"name\": string, // the name of the monster\n    \"page\": string, // the page where you found the monster\n    \"challenge\": string, // the challenge rating or \"CR\" of the monster\n    \"summary\": string, // a description of the monster no more than 4 sentences long\n}\n\n7. Race - A character's species, lineage, or ancestry, which influences their physical attributes, abilities, and cultural traits. Each race offers unique features that contribute to the character's identity and abilities. Output data for a race should look like this:\n\n{\n    \"name\": string, // the name of the race\n    \"page\": string, // the page where you found the race\n    \"summary\", string // a description of the race no more than 4 sentences long\n}\n\n8. Retainer - A loyal follower or servant who accompanies and assists a character, often handling mundane tasks or providing support.\n\n{\n    \"name\": string, // the name of the retainer\n    \"page\": string, // the page where you found the retainer\n    \"summary\": string // a description of the retainer no more than 4 sentences long\n}\n\n9. Spell - A magical effect created by a character or creature, using a spell slot or magical item. Spells can have various effects, such as dealing damage, healing, or altering reality. They are central to many classes' abilities.\n\n{\n    \"name\": string, // the name of the spell\n    \"page\": string, // the page where you found the spell\n    \"level\": string, // the level of the spell. Note that a \"cantrip\" is a level 0 spell\n    \"school\": string, // the school of magic of the spell\n    \"summary\": string // a description of the spell no more than 4 sentences long\n}\n\n10. Subclass - A specialized path or focus within a class that offers unique abilities, features, and thematic elements. Subclasses allow characters to refine their skills and abilities, enhancing their role within the party. Data for a subclass should look like this:\n\n{\n    \"name\": string, // the name of the subclass\n    \"page\": string, // the page where you found the subclass\n    \"parent_class\": string, // the class the subclass belongs to\n    \"summary\": string // a description of the subclass no more than 4 sentences long\n}\n\nThe output JSON object should look like this:\n\n{\n    adventures: Array<any>, // the list of adventures you found\n    backgrounds: Array<any>, // the list of backgrounds you found\n    classes: Array<any>, // the list of classes you found\n    feats: Array<any>, // the list of feats you found\n    magicItems: Array<any>, // the list of magic items you found\n    monsters: Array<any>, // the list of monsters you found\n    races: Array<any>, // the list of races you found\n    retainers: Array<any>, // the list of retainers you found\n    subclasses: Array<any> // the list of subclasses you found\n}\n    \nAlways triple check your work to make sure you found everything."
	tool := openai.AssistantTool{
		Type: openai.AssistantToolTypeFileSearch,
	}

	request := openai.AssistantRequest{
		Model:        openai.GPT4o,
		Name:         &name,
		Instructions: &instructions,
		Tools:        []openai.AssistantTool{tool},
	}

	var err error
	assistant, err = client.CreateAssistant(c, request)
	if err != nil {
		panic(err)
	}
}

func Ingest(c *fiber.Ctx) error {
	ctx := c.Context()

	// open file from http request
	fileHeader, _ := c.FormFile("file")
	fileContent, err := fileHeader.Open()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to open file")
	}
	fmt.Println("Initiating ingest")
	fmt.Println(fileHeader.Filename)

	// read file bytes
	byteContainer, err := io.ReadAll(fileContent)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to read file")
	}
	fmt.Println("Read file bytes")

	// create OpenAI File from bytes
	file, err := client.CreateFileBytes(ctx, openai.FileBytesRequest{
		Name:    "upload.pdf",
		Purpose: "assistants",
		Bytes:   byteContainer,
	})
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to create openai file")
	}
	fmt.Println("Created OpenAI file")

	// create thread
	thread, err := client.CreateThread(ctx, openai.ThreadRequest{
		Messages: []openai.ThreadMessage{{
			Role:    openai.ThreadMessageRoleUser,
			Content: "Process this file.",
			Attachments: []openai.ThreadAttachment{{
				FileID: file.ID,
				Tools: []openai.ThreadAttachmentTool{{
					Type: string(openai.AssistantToolTypeFileSearch),
				}},
			}},
		}},
	})
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to create openai thread")
	}
	fmt.Println("Created OpenAI thread")

	run, runErr := client.CreateRun(ctx, thread.ID, openai.RunRequest{
		AssistantID: assistant.ID,
	})
	if runErr != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to create openai run")
	}
	fmt.Println("Created OpenAI run")

	fmt.Println("Running")
	for run.Status == openai.RunStatusQueued || run.Status == openai.RunStatusInProgress {
		// fmt.Print(".")
		fmt.Println(run.Status)
		run, err = client.RetrieveRun(ctx, run.ThreadID, run.ID)
		if err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, "Failed to execute run")
		}
		time.Sleep(1000 * time.Millisecond)
	}
	if run.Status != openai.RunStatusCompleted {
		fmt.Printf("Run failed with status %s\n", run.Status)
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to complete run")
	}
	fmt.Println("\nDone running")

	numMessages := 1
	messages, err := client.ListMessage(ctx, run.ThreadID, &numMessages, nil, nil, nil)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to get message")
	}
	fmt.Println("Got list of messages")

	return c.JSON(fiber.Map{
		"message": messages.Messages[0].Content[0].Text.Value,
	})
}
