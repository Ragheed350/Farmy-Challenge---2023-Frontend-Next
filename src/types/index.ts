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

export interface Product {
  id: number;
  name: string;
  costPerServing: number;
  weightPerServing: number;
  supplierId: number;
  hoursFresh: number;
}

export interface BusinessLogic {
  margin: number;
  saladTypes: { small: Target; medium: Target; large: Target };
}

interface Target {
  targetCost: number;
  targetWeight: number;
}
