import { Component, HostListener, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../../Services/Orders/Handler/orders.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [NgIf, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;

  private orderService = inject(OrdersService);
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isCollapsed = event.target.innerWidth <= 768;
  }

  ngOnInit() {
    this.isCollapsed = window.innerWidth <= 768;
  }
}