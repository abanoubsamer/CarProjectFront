import { GetcartUser } from './../../../../Services/Cart/CartItem';
import { Component,  OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../../Services/Cart/cart.service';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: GetcartUser = {}as GetcartUser;
  promoCode: string = '';
  shipping: number = 5.00;
  discount: number = 26.00;
  userId: string = localStorage.getItem("userId") ||'';
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCart(this.userId).subscribe({
      next: (response) => {
      this.cartItems=response.data
      },

    });

  }
    subtotal = this.cartItems.cardItemsDtos. reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);



}
