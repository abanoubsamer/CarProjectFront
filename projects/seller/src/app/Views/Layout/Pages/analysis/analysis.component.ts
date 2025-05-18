import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [RouterModule, NgxChartsModule, CommonModule, NgClass],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css',
})
export class AnalysisComponent {
  // بيانات الإيرادات الشهرية
  revenueData = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1900 },
    { name: 'Mar', value: 3000 },
    { name: 'Apr', value: 5000 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 7000 },
    { name: 'Jul', value: 8000 },
    { name: 'Aug', value: 9000 },
    { name: 'Sep', value: 10000 },
    { name: 'Oct', value: 11000 },
    { name: 'Nov', value: 12000 },
    { name: 'Dec', value: 13000 },
  ];

  // بيانات المنتجات الأكثر مبيعاً
  revenueDataCar = [
    { name: 'Car 1', value: 1200 },
    { name: 'Car 2', value: 1900 },
    { name: 'Car 3', value: 3000 },
    { name: 'Car 4', value: 5000 },
    { name: 'Car 5', value: 6000 },
  ];

  // بيانات طرق الدفع
  paymentMethodsData = [
    { name: 'Visa/MC', value: 60 },
    { name: 'Cash', value: 40 },
  ];

  // بيانات حالة الطلبات
  orderStatus = [
    { name: 'Pending', value: 100 },
    { name: 'Confirmed', value: 750 },
    { name: 'Shipped', value: 500 },
    { name: 'Delivered', value: 600 },
    { name: 'Cancelled', value: 50 },
  ];

  // بيانات المبيعات حسب الموقع
  salesByLocation = [
    { name: 'Baldwin', value: 1200 },
    { name: 'Rowlett', value: 1900 },
    { name: 'Santa Cruz', value: 3000 },
    { name: 'Austin', value: 4000 },
    { name: 'Denver', value: 5000 },
    { name: 'Phoenix', value: 6000 },
    { name: 'Seattle', value: 7000 },
    { name: 'Atlanta', value: 8000 },
    { name: 'Orlando', value: 10000 },
    { name: 'Chicago', value: 11000 },
    { name: 'Miami', value: 12000 },
    { name: 'San Diego', value: 13000 },
    { name: 'Boston', value: 5500 },
  ];

  // بيانات إحصائية سريعة
  quickStats = [
    {
      label: 'Total Revenue',
      value: 'EGP 85,400',
      icon: 'fa-dollar-sign',
      color: '#4e73df',
    },
    {
      label: 'Orders',
      value: '2,854',
      icon: 'fa-shopping-cart',
      color: '#1cc88a',
    },
    { label: 'Customers', value: '1,280', icon: 'fa-users', color: '#36b9cc' },
    { label: 'Products', value: '75', icon: 'fa-tag', color: '#f6c23e' },
  ];

  // تحديد لوحة الألوان
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#4e73df', // أزرق فاتح
      '#1cc88a', // أخضر
      '#36b9cc', // سماوي
      '#f6c23e', // أصفر
      '#e74a3b', // أحمر
      '#5a5c69', // رمادي
      '#6f42c1', // أرجواني
      '#fd7e14', // برتقالي
      '#20c9a6', // فيروزي
    ],
  };

  // خيارات مشتركة للرسوم البيانية
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  legendPosition = 'below';
  showLabels = true;
  animations = true;
  barPadding = 8;
  roundEdges = true;
  legendTitle = '';

  // متغير لتحديد الوضع (إضاءة أو ليلي)
  isDarkMode = false;

  constructor() {
    // عند تحميل الصفحة، استرجاع قيمة الوضع من localStorage
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'true';
      this.applyTheme();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyTheme();
  }

  private applyTheme() {
    // تطبيق الوضع على عنصر الـ body للتأثير على كامل الصفحة
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
