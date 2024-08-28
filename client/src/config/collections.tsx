import { ColumnDef } from "@tanstack/react-table";

import {
  Adventure,
  Background,
  Class,
  Feat,
  MagicItem,
  Monster,
  Race,
  Retainer,
  Spell,
  Subclass,
} from "./types";
import { getSortableHeader } from "@/components/table/DomainTable";

export type CollectionConfig = {
  name: string;
  display: string;
  description: string;
  icon: (size: string) => React.ReactNode;
  columns: ColumnDef<any>[];
};

export const collectionsConfig: CollectionConfig[] = [
  {
    name: "adventures",
    display: "Adventures",
    description:
      "Embark on epic quests filled with danger, mystery, and treasure, where your choices shape the fate of the realm",
    icon: (size: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
        />
      </svg>
    ),
    columns: [
      {
        // Name
        header: getSortableHeader("Name"),
        accessorKey: "name",
      },
      {
        // Source
        header: getSortableHeader("Source"),
        accessorKey: "source",
        accessorFn: (a) => `${a.source}, p.  ${a.page}`,
      },
      {
        // Time to complete
        header: getSortableHeader("Approx. Time"),
        accessorKey: "timeToComplete",
        accessorFn: (a) => `${a.timeToComplete} hours`,
      },
      {
        // # of Characters
        header: getSortableHeader("# of Characters"),
        accessorKey: "numberOfCharacters",
      },
      {
        // Level
        header: getSortableHeader("Character Level"),
        accessorKey: "levels",
      },
      {
        // Summary
        header: "Summary",
        accessorKey: "summary",
      },
    ] as ColumnDef<Adventure>[],
  },
  {
    name: "backgrounds",
    display: "Backgrounds",
    description:
      "Uncover the roots of your character's past and let it guide their destiny, from humble beginnings to legendary feats",
    icon: (size: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
    columns: [
      {
        // Name
        header: getSortableHeader("Name"),
        accessorKey: "name",
      },
      {
        // Source
        header: getSortableHeader("Source"),
        accessorKey: "source",
        accessorFn: (a) => `${a.source}, p.  ${a.page}`,
      },
      {
        // Summary
        header: "Summary",
        accessorKey: "summary",
      },
    ] as ColumnDef<Background>[],
  },
  {
    name: "classes",
    display: "Classes",
    description:
      "Master the arts of combat, magic, and stealth, defining your role in the party and your path to glory",
    icon: (size: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
        />
      </svg>
    ),
    columns: [
      {
        // Name
        header: getSortableHeader("Name"),
        accessorKey: "name",
      },
      {
        // Source
        header: getSortableHeader("Source"),
        accessorKey: "source",
        accessorFn: (a) => `${a.source}, p.  ${a.page}`,
      },
      {
        header: getSortableHeader("Subclasses"),
        accessorKey: "subclasses",
      },
      {
        // Summary
        header: "Summary",
        accessorKey: "summary",
      },
    ] as ColumnDef<Class>[],
  },
  {
    name: "feats",
    display: "Feats",
    description:
      "Enhance your abilities and unlock new powers with feats that showcase your character's unique talents and strengths",
    icon: (size: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
        />
      </svg>
    ),
    columns: [
      {
        // Name
        header: getSortableHeader("Name"),
        accessorKey: "name",
      },
      {
        // Source
        header: getSortableHeader("Source"),
        accessorKey: "source",
        accessorFn: (a) => `${a.source}, p.  ${a.page}`,
      },
      {
        // Summary
        header: "Summary",
        accessorKey: "summary",
      },
    ] as ColumnDef<Feat>[],
  },
  {
    name: "magic-items",
    display: "Magic Items",
    description:
      "Discover enchanted relics and artifacts that hold untold power, waiting to be wielded by the worthy",
    icon: (size: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
        />
      </svg>
    ),
    columns: [
      {
        // Name
        header: getSortableHeader("Name"),
        accessorKey: "name",
      },
      {
        // Source
        header: getSortableHeader("Source"),
        accessorKey: "source",
        accessorFn: (a) => `${a.source}, p.  ${a.page}`,
      },
      {
        header: getSortableHeader("Rarity"),
        accessorKey: "rarity",
      },
      {
        // Summary
        header: "Summary",
        accessorKey: "summary",
      },
    ] as ColumnDef<MagicItem>[],
  },
  {
    name: "monsters",
    display: "Monsters",
    description:
      "Face fearsome creatures and mythical beasts that challenge your courage and test your might at every turn",
    icon: (size: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082"
        />
      </svg>
    ),
    columns: [
      {
        // Name
        header: getSortableHeader("Name"),
        accessorKey: "name",
      },
      {
        // Source
        header: getSortableHeader("Source"),
        accessorKey: "source",
        accessorFn: (a) => `${a.source}, p.  ${a.page}`,
      },
      {
        // Summary
        header: "Summary",
        accessorKey: "summary",
      },
    ] as ColumnDef<Monster>[],
  },
  {
    name: "races",
    display: "Races",
    description:
      "Explore diverse ancestries with rich histories and unique traits that shape your character's identity and worldview",
    icon: (size: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
    columns: [
      {
        // Name
        header: getSortableHeader("Name"),
        accessorKey: "name",
      },
      {
        // Source
        header: getSortableHeader("Source"),
        accessorKey: "source",
        accessorFn: (a) => `${a.source}, p.  ${a.page}`,
      },
      {
        // Summary
        header: "Summary",
        accessorKey: "summary",
      },
    ] as ColumnDef<Race>[],
  },
  {
    name: "retainers",
    display: "Retainers",
    description:
      "Recruit loyal companions and allies who provide invaluable support and add depth to your adventures",
    icon: (size: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
        />
      </svg>
    ),
    columns: [
      {
        // Name
        header: getSortableHeader("Name"),
        accessorKey: "name",
      },
      {
        // Source
        header: getSortableHeader("Source"),
        accessorKey: "source",
        accessorFn: (a) => `${a.source}, p.  ${a.page}`,
      },
      {
        // Summary
        header: "Summary",
        accessorKey: "summary",
      },
    ] as ColumnDef<Retainer>[],
  },
  {
    name: "spells",
    display: "Spells",
    description:
      "Harness the arcane, divine, and natural forces of magic to unleash powerful spells that can turn the tide of battle.",
    icon: (size: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
        />
      </svg>
    ),
    columns: [
      {
        // Name
        header: getSortableHeader("Name"),
        accessorKey: "name",
      },
      {
        // Source
        header: getSortableHeader("Source"),
        accessorKey: "source",
        accessorFn: (a) => `${a.source}, p.  ${a.page}`,
      },
      {
        header: getSortableHeader("School of Magic"),
        accessorKey: "schoolOfMagic",
      },
      {
        // Summary
        header: "Summary",
        accessorKey: "summary",
      },
    ] as ColumnDef<Spell>[],
  },
  {
    name: "subclasses",
    display: "Subclasses",
    description:
      "Specialize your character with unique subclasses that offer new abilities and exciting ways to play",
    icon: (size: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>
    ),
    columns: [
      {
        // Name
        header: getSortableHeader("Name"),
        accessorKey: "name",
      },
      {
        // Source
        header: getSortableHeader("Source"),
        accessorKey: "source",
        accessorFn: (a) => `${a.source}, p.  ${a.page}`,
      },
      {
        header: getSortableHeader("Class"),
        accessorKey: "parentClass",
      },
      {
        // Summary
        header: "Summary",
        accessorKey: "summary",
      },
    ] as ColumnDef<Subclass>[],
  },
];
