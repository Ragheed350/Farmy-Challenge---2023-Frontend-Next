export interface Salad {
  name: string;
  id: number;
  size: string;
  ingredients: Ingredient[];
  cost: number;
  targetStock: number;
  currentStock: number;
  price: number;
}

export interface Ingredient {
  id: number;
  numOfServings: number;
}
