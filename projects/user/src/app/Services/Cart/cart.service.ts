import { Injectable } from '@angular/core';
import { GetcartUser } from './CartItem';
import { Observable } from 'rxjs';
import { ApiService } from '../Api/api.service';
import { Routing } from '../../Meta/Routing';
import { Response } from '../../Core/BasicResponse/Response';
@Injectable({
  providedIn: 'root',
})

  export class CartService {
    constructor(private Api: ApiService) {}
    getCart(userid: string): Observable<Response<GetcartUser>> {
      return this.Api.Get<Response<GetcartUser>>(Routing.Cart.GetCart.replace("{Id}",userid));
    }
    // addToCart(item: CartItem): Observable<CartItem[]> {
    //   return this.Api.Post<CartItem[]>(Routing.Cart.AddToCart, item);
    // }
    // updateCartItem(productId: string, quantity: number): Observable<CartItem[]> {
    //   return this.Api.Put<CartItem[]>(
    //     `${Routing.Cart.UpdateItem}/${productId}`,
    //     { quantity }
    //   );
    // }
    // removeFromCart(productId: string): Observable<CartItem[]> {
    //   return this.Api.Delete<CartItem[]>(Routing.Cart.RemoveItem, productId);
    // }
  }