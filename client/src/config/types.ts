export type User = {
  _id: string;
  role: string;
  name: string;
  email: string;
  favorites: string[];
  password: string;
};

export type Domain = {
  _id: string;
  name: string;
  page: number;
  source: string;
  summary: string;
  createdBy: string;
  updatedBy: string;
};

export type Adventure = Domain & {
  timeToComplete: number;
  numberOfCharacters: number;
  levels: number;
};

export type Background = Domain & {};

export type Class = Domain & {
  subclass: string;
};

export type Feat = Domain & {};

export type MagicItem = Domain & {
  rarity: string;
};

export type Monster = Domain & {
  challenge: string;
};

export type Race = Domain & {};

export type Retainer = Domain & {};

export type Spell = Domain & {
  schoolOfMagic: string;
  level: number;
};

export type Subclass = Domain & {
  parentClass: string;
};
