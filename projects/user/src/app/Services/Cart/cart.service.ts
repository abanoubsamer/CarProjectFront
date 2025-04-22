import { Injectable } from '@angular/core';
import { CartItem } from './CartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();
  addToCart(product: CartItem): void {
    if (product.quantity <= 0) return;
    const existingItem = this.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      this.items.push(product);
    }
    this.cartItems.next(this.items);
  }
  removeFromCart(productId: string): void {
    this.items = this.items.filter((item) => item.id !== productId);
    this.cartItems.next(this.items);
  }
  clearCart(): void {
    this.items = [];
    this.cartItems.next(this.items);
  }
  getCartItems(): CartItem[] {
    return this.items;
  }
  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find((item) => item.id === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
    } else if (item && quantity === 0) {
      this.removeFromCart(productId);
      return;
    }
  }
  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
