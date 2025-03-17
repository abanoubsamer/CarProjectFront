import { Component } from '@angular/core';
import { ProductCardsComponent } from './ProductCards/product-cards/product-cards.component';
import { CategoriesComponent } from '../../../Components/categories/categories.component';

@Component({
  selector: 'app-home',
  imports: [ProductCardsComponent, CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
