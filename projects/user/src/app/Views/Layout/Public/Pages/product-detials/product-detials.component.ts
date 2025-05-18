import { GetProductById } from './../../../../../Services/Product/Queries/Models/GetProductById';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRatingComponent } from './product-rating/product-rating.component';

import { QueriesProductService } from '../../../../../Services/Product/Queries/Handler/queries-product.service';
import { ActivatedRoute } from '@angular/router';
import { Routing } from '../../../../../Meta/Routing';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../../../../Services/SharedDataService/shared-data.service';
import { NavigationService } from '../../../../../Services/Navigation/navigation.service';
import { CartService } from '../../../../../Services/Cart/Handler/cart.service';
import { catchError, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-product-detials',
  imports: [CommonModule, ProductRatingComponent],
  templateUrl: './product-detials.component.html',
  styleUrl: './product-detials.component.css',
})
export class ProductDetialsComponent implements OnInit {
  //#region  Failds
  product: GetProductById = {} as GetProductById;
  Ip = Routing.Ip;
  userId = localStorage.getItem('userId');
  selectedImage: string = '';

  //#endregion

  //#region Injectors
  private readonly _CardService = inject(CartService);
  private readonly _totservice = inject(ToastrService);
  private readonly _sharedDataService = inject(SharedDataService);
  private readonly _NavigationBar = inject(NavigationService);
  private readonly route = inject(ActivatedRoute);

  //#endregion

  //#region LiveHooke
  ngOnInit(): void {
    this.route.data.subscribe(({ ProductId }) => {
      this.product = ProductId;
      this.product.description = this.product.description
        .replace(/,/g, '<br>')
        .replace(/\./g, '<br>');
      console.log(this.product);
    });
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 0);
  }
  //#endregion

  //#region Method
  changeImage(event: Event, newSrc: string) {
    this.selectedImage = newSrc;
  }
  fullStars(rate: number) {
    return Math.floor(rate);
  }

  OrderNow(quantity: number) {
    this.AddToCard(quantity).subscribe({
      next: (res) => {
        if (res.success) {
          this._NavigationBar.NavigationByUrl('Security/Cart');
        }
      },
      error: (err) => {
        this._totservice.error('Error while adding product to cart');
      },
    });
  }

  AddToCard(quantity: number): Observable<any> {
    if (!this.userId) {
      this._NavigationBar.NavigationByUrl('Auth');
      return new Observable();
    }

    return this._CardService
      .addToCart({
        productID: this.product.productID,
        quantity: quantity,
        userId: this.userId,
      })
      .pipe(
        tap((res) => {
          if (res.success) {
            this._totservice.success('Success Add Product In Cart');
            this._sharedDataService.updateCartCount(1);
          }
        }),
        catchError((err) => {
          this._totservice.warning(
            err?.error?.message || 'Something went wrong'
          );
          return new Observable(); // نرجع Observable فاضي عشان مانكسرش السلسلة
        })
      );
  }

  //#endregion
}
