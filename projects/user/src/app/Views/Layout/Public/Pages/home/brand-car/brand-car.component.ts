import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-car',
  imports: [],
  templateUrl: './brand-car.component.html',
  styleUrl: './brand-car.component.css',
})
export class BrandCarComponent {
  carBrands = [
    { id: 3, name: 'Audi', logo: 'Brands/BMW.webp' },
    { id: 4, name: 'BMW', logo: 'Brands/byd.webp' },
    { id: 5, name: 'Brilliance', logo: 'Brands/Chevrolet.webp' },
    { id: 6, name: 'BYD', logo: 'Brands/Daion.webp' },
    { id: 7, name: 'Geely', logo: 'Brands/Datsun-Logo-1965.webp' },
    { id: 8, name: 'Changan', logo: 'Brands/dfsk.webp' },
    { id: 9, name: 'BMW', logo: 'Brands/byd.webp' },
    { id: 10, name: 'Brilliance', logo: 'Brands/Chevrolet.webp' },
    { id: 11, name: 'BYD', logo: 'Brands/Dodg.webp' },
    { id: 12, name: 'Geely', logo: 'Brands/البينا.webp' },
    { id: 12, name: 'Changan', logo: 'Brands/الفاروميو.webp' },
    { id: 14, name: 'Audi', logo: 'Brands/BMW.webp' },
    { id: 15, name: 'BMW', logo: 'Brands/byd.webp' },
    { id: 16, name: 'Brilliance', logo: 'Brands/Chevrolet.webp' },
    { id: 17, name: 'BYD', logo: 'Brands/Daion.webp' },
    { id: 18, name: 'Geely', logo: 'Brands/Datsun-Logo-1965.webp' },
  ];

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

  selectBrand(brandId: number) {
    console.log('Selected brand:', brandId);
  }
}
