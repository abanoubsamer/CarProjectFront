import { Component, OnInit } from '@angular/core';
import { BrandCarComponent } from './brand-car/brand-car.component';
import { CarPartsSelectorComponent } from './car-parts-selector/car-parts-selector.component';
import { AdvertisingComponent } from './advertising/advertising.component';
import { ModelsComponentComponent } from '../select-category/Components/models-component/models-component.component';
import { ProductCardsComponent } from './ProductCards/product-cards.component';
import { SliderAdvComponent } from './slider-adv/slider-adv.component';
import { GetCarBrandModel } from '../../../../../Services/Car/Queries/Models/GetCarBrandModel';
import { GetCategoryModel } from '../../../../../Services/Category/Queries/Models/GetCategoryModel';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-home',
  imports: [
    ProductCardsComponent,
    BrandCarComponent,
    CarPartsSelectorComponent,
    AdvertisingComponent,
    SliderAdvComponent,
    InfoComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  brands: GetCarBrandModel[] = [];
  category: GetCategoryModel[] = [];
  handleCategorys(event: GetCategoryModel[]) {
    this.category = event;
  }
  handleCarBrands(event: GetCarBrandModel[]) {
    this.brands = event;
  }
}
