import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GetUserOrders } from '../../../../Services/Orders/Queries/Model/GetUserOrders';
import { GetUserIdModel } from '../../../../Services/User/Queries/Models/GetUserIdModels';
import { Routing } from '../../../../Meta/Routing';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';
import { SharedDataService } from '../../../../Services/SharedDataService/shared-data.service';
import { OrdersService } from '../../../../Services/Orders/Queries/Handler/orders.service';
import { OrderDetailsComponent } from './order-details/order-details.component';

@Component({
  selector: 'app-orders',
  imports: [RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  OrdersUser: Array<GetUserOrders> = new Array<GetUserOrders>();
  userInfo: GetUserIdModel = {
    countCard: 0,
    dateCreate: '',
    email: '',
    id: '',
    picture: '',
    name: '',
    phoneNumberDtos: [],
    shippingAddresses: [],
  };
  Ip = Routing.Ip;
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);
  private readonly toster = inject(ToastrService);
  private readonly _NavigationService = inject(NavigationService);
  private readonly _sharedDataService = inject(SharedDataService);
  private readonly _OrderQuereisService = inject(OrdersService);

  ngOnInit(): void {
    this._sharedDataService.currentCUser.subscribe((user) => {
      this.userInfo = user;
      console.log('user', user);
    });

    this.route.data.subscribe(({ userOrders }) => {
      this.OrdersUser = userOrders;
    });
  }

  ShowDetails(OrdersUser: GetUserOrders) {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      width: '1000px',
      data: OrdersUser,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
