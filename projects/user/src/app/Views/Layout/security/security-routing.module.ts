import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security.component';
import { userCardResolver } from '../../../Resolver/user-card.resolver';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { OrdersComponent } from './orders/orders.component';

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
      { path: 'profile', component: ProfileComponent, title: 'profile' },
      {
        path: 'editprofile',
        component: EditprofileComponent,
        title: 'editprofile',
      },
      {
        path: 'changepassword',
        component: ChangepasswordComponent,
        title: 'changepassword',
      },
      { path: 'orders', component: OrdersComponent, title: 'orders' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
