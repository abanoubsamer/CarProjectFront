import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './security/profile/profile.component';
import { EditprofileComponent } from './security/editprofile/editprofile.component';
import { ChangepasswordComponent } from './security/changepassword/changepassword.component';
import { OrdersComponent } from './security/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'Public',
        loadChildren: () =>
          import('./Public/public.module').then((c) => c.PublicModule),
      },
      {
        path: 'Sucurity',
        loadChildren: () =>
          import('./security/security.module').then((c) => c.SecurityModule),
      },
      { path: '', redirectTo: 'Public', pathMatch: 'full' },
      { path: 'profile', component:ProfileComponent, title:'profile'},
      { path: 'editprofile', component:EditprofileComponent, title:'editprofile'},
      { path: 'changepassword', component:ChangepasswordComponent, title:'changepassword'},
      { path: 'orders', component:OrdersComponent, title:'orders' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
