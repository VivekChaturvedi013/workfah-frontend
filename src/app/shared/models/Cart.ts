import { CartItem } from "./CartItem";

export class Cart {
    items: CartItem[] = [];
    totalPrice: number = 0;
    totalCount: number = 0;

    addToCart(item: CartItem) {
        let foundItem = this.items.find(i => i.food.id === item.food.id);
        if (foundItem) {
            foundItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
        this.calculateTotal();
    }

    calculateTotal() {
        this.totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.totalCount = this.items.reduce((count, item) => count + item.quantity, 0);
    }
}