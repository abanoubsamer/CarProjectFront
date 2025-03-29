import { Component, inject, OnInit } from '@angular/core';
import { GetCarBrandModel } from '../../../../../../Services/Car/Queries/Models/GetCarBrandModel';
import { CarBrandQueriesService } from '../../../../../../Services/Car/Queries/Handler/car-brand-queries.service';

@Component({
  selector: 'app-brand-car',
  imports: [],
  templateUrl: './brand-car.component.html',
  styleUrl: './brand-car.component.css',
})
export class BrandCarComponent implements OnInit {
  carBrands: GetCarBrandModel[] = [];

  showAllBrands: boolean = false;
  private readonly _carBrandQuereisService = inject(CarBrandQueriesService);
  ngOnInit(): void {
    this._carBrandQuereisService
      .GeTCarBrandsWithPagination(1, 50)
      .subscribe((res) => (this.carBrands = res.data));
  }
  scrollLeft() {
    const container = document.querySelector('.brands-container');
    if (container) {
      const brandItem = document.querySelector('.brand-item');
      const brandWidth = brandItem ? brandItem.clientWidth + 25 : 135;
      const scrollAmount = brandWidth * 3;

      this.smoothScroll(container, -scrollAmount);
    }
  }

  scrollRight() {
    const container = document.querySelector('.brands-container');
    if (container) {
      const brandItem = document.querySelector('.brand-item');
      const brandWidth = brandItem ? brandItem.clientWidth + 25 : 135;
      const scrollAmount = brandWidth * 3;

      this.smoothScroll(container, scrollAmount);
    }
  }

  smoothScroll(element: any, amount: number) {
    const start = element.scrollLeft;
    const startTime =
      'now' in window.performance ? performance.now() : new Date().getTime();

    const animateScroll = (timestamp: number) => {
      const currentTime =
        'now' in window.performance ? performance.now() : new Date().getTime();
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / 500, 1);

      element.scrollLeft = start + amount * progress;

      if (timeElapsed < 500) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  selectBrand(brandId: string) {
    console.log('Selected brand:', brandId);
  }
  ShowAll() {
    this.showAllBrands = !this.showAllBrands;
  }
}
