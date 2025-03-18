import { Component } from '@angular/core';
import { ProductCardsComponent } from './ProductCards/product-cards/product-cards.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandCarComponent } from './brand-car/brand-car.component';

@Component({
  selector: 'app-home',
  imports: [ProductCardsComponent, CategoriesComponent, BrandCarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
