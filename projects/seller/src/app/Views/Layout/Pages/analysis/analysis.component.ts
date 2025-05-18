import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-analysis',
  imports: [RouterModule,NgxChartsModule],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent  {
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
    { name: 'Dec', value: 13000 }
  ];

  revenueDataCar = [
    { name: 'Car1', value: 1200 },
    { name: 'Car2', value: 1900 },
    { name: 'Car3', value: 3000 },
    { name: 'Car4', value: 5000 },
    { name: 'Car5', value: 6000 }
  ];

  MasterData = [
    { name: 'visa', value: 60 },
    { name: 'cash', value: 40 }
  ];

  

  orderStatus = [
    { name: 'Pending', value: 100 },
    { name: 'Confirm', value: 750 },
    { name: 'Shipped', value: 500 },
    { name: 'Delivered', value: 600 },
    { name: 'Cancelled', value: 700 },

  ];


  salesByLocation = [
  { name: 'Baldwin', value: 1200 },
  { name: 'Rowlett', value: 1900 },
  { name: 'Santa Cruz', value: 3000},
  { name: 'Austin', value: 4000 },
  { name: 'Denver', value: 5000 },
  { name: 'Phoenix', value: 6000 },
  { name: 'Seattle', value: 7000 },
  { name: 'Atlanta', value: 8000 },
  { name: 'Orlando', value: 10000 },
  { name: 'Chicago', value: 11000 },
  { name: 'Miami', value: 12000 },
  { name: 'San Diego', value: 13000 },
  { name: 'Boston', value: 5500 }

  ];


  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EF5350'],
  };

  // متغير لتحديد الوضع (إضاءة أو ليلي)
  isDarkMode = false;

  constructor() {
    // عند تحميل الصفحة، استرجاع قيمة الوضع من localStorage
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'true';
    }
  }

  toggleTheme() {
    // التبديل بين الوضعين
    this.isDarkMode = !this.isDarkMode;
    
    // حفظ القيمة في localStorage
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
}