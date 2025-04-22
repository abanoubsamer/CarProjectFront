import { GetProductById } from './../../../../../Services/Product/Queries/Models/GetProductById';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRatingComponent } from './product-rating/product-rating.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';
import { QueriesProductService } from '../../../../../Services/Product/Queries/Handler/queries-product.service';
import { ActivatedRoute } from '@angular/router';
import { Routing } from '../../../../../Meta/Routing';

@Component({
  selector: 'app-product-detials',
  imports: [CommonModule, ProductRatingComponent, CustomerReviewsComponent],
  templateUrl: './product-detials.component.html',
  styleUrl: './product-detials.component.css',
})
export class ProductDetialsComponent implements OnInit {
  product: GetProductById = {} as GetProductById;
  Ip = Routing.Ip;
  userId = localStorage.getItem('userId');
  selectedImage: string = '';
  private readonly _productQuereisService = inject(QueriesProductService);
  private readonly _Routing = inject(ActivatedRoute);
  ngOnInit(): void {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 0);
    this._Routing.data.subscribe(({ ProductId }) => {
      this.product = ProductId;
    });
  }

  changeImage(event: Event, newSrc: string) {
    this.selectedImage = newSrc;
  }
  fullStars(rate: number) {
    return Math.floor(rate);
  }
}
