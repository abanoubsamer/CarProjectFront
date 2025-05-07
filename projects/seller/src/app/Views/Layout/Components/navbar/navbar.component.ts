import { Component, inject } from '@angular/core';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';
import { SellerService } from '../../../../Services/Seller/Handler/seller.service';
import { SharedDataService } from '../../../../Services/SharedDataService/shared-data.service';
import { GetSellerModel } from '../../../../Services/Seller/Models/GetSellerModel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  Seller: GetSellerModel = {
    ContactInfo: '',
    country: '',
    dateCreate: '',
    email: '',
    id: '',
    name: '',
    picture: '',
    sellerId: '',
    ShopName: '',
    type: '',
  };
  SellerId = localStorage.getItem('sellerID');
  private readonly SellerSrvices = inject(SellerService);
  private readonly ShearData = inject(SharedDataService);
  private readonly NavigationUrl = inject(NavigationService);
  ngOnInit(): void {
    if (this.SellerId) {
      this.SellerSrvices.GetSellerWithId(this.SellerId).subscribe((res) => {
        if (res.success) {
          this.ShearData.UpdateSeller(res.data);
          this.Seller = res.data;
        }
      });
    }
  }

  Logout() {
    localStorage.removeItem('sellerID');
    localStorage.removeItem('roles');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.NavigationUrl.NavigationByUrl('Auth/login');
  }
}
