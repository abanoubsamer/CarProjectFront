import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, NavBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
