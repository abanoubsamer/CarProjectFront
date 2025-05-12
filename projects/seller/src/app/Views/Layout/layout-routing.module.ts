import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'Dashboard',
        loadComponent: () =>
          import('./Pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'AddProduct',
        loadComponent: () =>
          import('./Pages/add-proudct/add-proudct.component').then(
            (c) => c.AddProudctComponent
          ),
      },
      
      {
        path: 'EditProduct',
        loadComponent: () =>
          import('./Pages/managment-product/edit-product/edit-product.component').then(
            (c) => c.EditProductComponent
          ),
      },

      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
