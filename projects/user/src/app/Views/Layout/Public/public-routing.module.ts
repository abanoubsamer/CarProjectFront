import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { categoryResolver } from '../../../Resolver/category.resolver';
import { modelWithBrandResolver } from '../../../Resolver/model-with-brand.resolver';
import { modelByIdResolver } from '../../../Resolver/model-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'Home',
        loadComponent: () =>
          import('./Pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'Selector/:id',
        loadComponent: () =>
          import('./Pages/select-category/select-category.component').then(
            (m) => m.SelectCategoryComponent
          ),
        resolve: { CategoryId: categoryResolver },
        children: [
          {
            path: 'Brands',
            loadComponent: () =>
              import(
                './Pages/select-category/Components/select-car-brand/select-car-brand.component'
              ).then((m) => m.SelectCarBrandComponent),
          },
          {
            path: 'Brands/:brandId/Models',
            loadComponent: () =>
              import(
                './Pages/select-category/Components/models-component/models-component.component'
              ).then((m) => m.ModelsComponentComponent),
            resolve: { Models: modelWithBrandResolver },
          },
          {
            path: 'Brands/:brandId/Models/:modelId',
            loadComponent: () =>
              import(
                './Pages/select-category/Components/products-with-model/products-with-model.component'
              ).then((m) => m.ProductsWithModelComponent),
            resolve: { ModelById: modelByIdResolver },
          },
          { path: '', redirectTo: 'Brands', pathMatch: 'full' },
        ],
      },
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
