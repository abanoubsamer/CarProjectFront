import { Component } from '@angular/core';
import { BrandCarComponent } from './brand-car/brand-car.component';
import { CarPartsSelectorComponent } from './car-parts-selector/car-parts-selector.component';
import { AdvertisingComponent } from './advertising/advertising.component';
import { ModelsComponentComponent } from '../select-category/Components/models-component/models-component.component';
import { ProductCardsComponent } from './ProductCards/product-cards.component';

@Component({
  selector: 'app-home',
  imports: [
    ProductCardsComponent,
    BrandCarComponent,
    CarPartsSelectorComponent,
    AdvertisingComponent,
    ModelsComponentComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
