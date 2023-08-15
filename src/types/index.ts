export interface Salad {
  name: string;
  id: number;
  size: "small" | "medium" | "large";
  ingredients: { id: number; numOfServings: number }[];
  cost: number;
  targetStock: number;
  currentStock: number;
  price: number;
}

export interface UpdateSalad_Req {
  salad_id: number;
  salad: Salad;
}

export interface Ingredient {
  id: number;
  name: string;
  costPerServing: number;
  weightPerServing: number;
  supplierId: number;
  hoursFresh: number;
}
