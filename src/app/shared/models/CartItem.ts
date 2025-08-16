import { Food } from "./food";

export class CartItem {
    food!: Food;
    quantity: number = 1;
    price!: number;

   constructor(food: Food) {
    this.food = food;
    this.price = food.price;
    this.quantity = 1;
   }
}