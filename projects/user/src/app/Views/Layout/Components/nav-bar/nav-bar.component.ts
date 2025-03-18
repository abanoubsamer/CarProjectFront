import { Component, inject, OnInit } from '@angular/core';
import { GetUserIdModel } from '../../../../Services/User/Queries/Models/GetUserIdModels';
import { SharedDataService } from '../../../../Services/SharedDataService/shared-data.service';
import { UserQuereisService } from '../../../../Services/User/Queries/Handler/user-quereis.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  user: GetUserIdModel = {
    name: 'UserName',
    countCard: 0,
    picture: '',
    dateCreate: '',
    email: '',
    id: '',
    phoneNumberDtos: [],
    shippingAddresses: [],
  };
  userid = localStorage.getItem('userId');
  private readonly sharedDataService = inject(SharedDataService);
  private readonly _UserQuereisService = inject(UserQuereisService);
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    if (!this.userid) return;
    this._UserQuereisService.GetUserServices(this.userid).subscribe({
      next: (res) => {
        this.user = res.data;
        this.sharedDataService.updatesuer(this.user);
      },
    });
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    location.reload();
  }
}
