import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { userCardResolver } from '../../../Resolver/user-card.resolver';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      {
        path: 'Cart',
        loadComponent: () =>
          import('./cart/cart.component').then((m) => m.CartComponent),
        resolve: { CardUser: userCardResolver },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
