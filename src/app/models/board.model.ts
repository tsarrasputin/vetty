export interface Card {
  id: string;
  header: string;
  description: string;
  creationTime: Date;
}

export interface List {
  id: string;
  header: string;
  cards: Card[];
}