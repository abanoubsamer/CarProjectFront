import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  schemas: [],
})
export class CategoriesComponent {
  categories = [
    {
      id: 1,
      name: 'Buy spare parts',
      icon: 'Category/steering-wheel-svgrepo-com.svg',
    },
    { id: 2, name: 'Tyres', icon: 'Category/rim-tyre-svgrepo-com.svg' },
    { id: 3, name: 'Engine oil', icon: 'Category/oil-svgrepo-com.svg' },
    { id: 4, name: 'Batteries', icon: 'Category/car-battery-svgrepo-com.svg' },
    {
      id: 5,
      name: 'Spark plug',
      icon: 'Category/spark-spark-plug-svgrepo-com.svg',
    },

    { id: 9, name: 'accessories', icon: 'Category/water-svgrepo-com.svg' },
    {
      id: 10,
      name: 'Buy spare parts',
      icon: 'Category/steering-wheel-svgrepo-com.svg',
    },
    { id: 11, name: 'Tyres', icon: 'Category/rim-tyre-svgrepo-com.svg' },
    { id: 12, name: 'Engine oil', icon: 'Category/oil-svgrepo-com.svg' },
    { id: 13, name: 'Batteries', icon: 'Category/car-battery-svgrepo-com.svg' },
  ];

  selectCategory(categoryId: number) {
    console.log('Selected category:', categoryId);
    // يمكنك إضافة المنطق الخاص بك هنا عند اختيار فئة
  }
}
