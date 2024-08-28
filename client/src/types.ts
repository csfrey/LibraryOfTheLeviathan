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
