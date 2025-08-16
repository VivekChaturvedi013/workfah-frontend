import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cart:Cart = new Cart();
  private cartSubject : BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.cart);
  
  addtoCart(food:Food):void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if( cartItem) return ;
    this.cart.items.push(new CartItem(food));
    this.setCarttoLocalStorage();
  }
  
  removeFromCart(foodId: string):void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
  }

  changeQuantity(foodId: string, quantity: number): void {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if( !cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = cartItem.food.price * quantity;
    this.setCarttoLocalStorage();

  }

  clearCart(): void {
    this.cart = new Cart();
    this.setCarttoLocalStorage();

  }

  getCartObservable(): import('rxjs').Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCarttoLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevsum, currentItem) => prevsum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevCount, currentItem) => prevCount + currentItem.quantity, 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage() {
    const cartJson = localStorage.getItem('cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
    
}
}
