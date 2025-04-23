import { GetcartUser } from './../../../../Services/Cart/CartItem';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../../../Services/Cart/cart.service';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';
import { ToastrService } from 'ngx-toastr';
import { Routing } from '../../../../Meta/Routing';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  Card: GetcartUser = { cardId: '', cardItemsDtos: [] };
  Ip = Routing.Ip;
  orderSummary: OrderSummary = {
    Discount: 0,
    Shipping: 0,
    Subtotal: 0,
    Total: 0,
  };

  address: string = '';
  phone: string = '';

  get isPhoneDisabled(): boolean {
    return this.address.trim() === '';
  }

  get isCheckoutDisabled(): boolean {
    return this.phone.trim() === '';
  }
  //#endregion

  //#region Inject
  private readonly route = inject(ActivatedRoute);

  private readonly _NavigationService = inject(NavigationService);
  private readonly _cartServices = inject(CartService);

  private readonly toster = inject(ToastrService);

  //#endregion

  //#region  LiveHooks
  ngOnInit(): void {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 0);
    this.route.data.subscribe(({ CardUser }) => {
      this.Card = CardUser;
      console.log(CardUser);

      this.CalcOrderSummary(this.Card);
    });
  }

  // openMapDialog(stepper: MatStepper) {
  //   console.log('Opening dialog...');
  //   const dialogRef = this.dialog.open(MapPickerComponent, {
  //     data: this.address,
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.address = result;

  //       stepper.next();
  //     }
  //   });
  // }

  // openPhoneDialog(stepper: MatStepper) {
  //   const dialogRef = this.dialog.open(PhoneComponent, {});
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.phone = result;
  //       stepper.next();
  //     }
  //   });
  // }

  // openPopupIfLocationEnabled(stepper: MatStepper) {
  //   navigator.permissions
  //     .query({ name: 'geolocation' })
  //     .then((result) => {
  //       if (result.state === 'granted') {
  //         this.openMapDialog(stepper);
  //       } else if (result.state === 'prompt') {
  //         // لو لسه المستخدم ما وافقش، نحاول نطلب الموقع
  //         navigator.geolocation.getCurrentPosition(
  //           () => {
  //             this.openMapDialog(stepper);
  //           },
  //           () => {
  //             this.toster.warning(' يجب تفعيل الموقع الجغرافي لفتح الخريطة!');
  //           }
  //         );
  //       } else {
  //         this.toster.warning(
  //           ' تم رفض إذن الموقع! يرجى تفعيله من إعدادات المتصفح.'
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       this.toster.error('❌ خطأ أثناء فحص إذن الموقع:', error);
  //     });
  // }
  //#endregion

  //#region Methods
  CalcOrderSummary(Card: GetcartUser): OrderSummary {
    // Reset all values before calculation
    this.orderSummary.Subtotal = 0;
    this.orderSummary.Discount = 0;
    this.orderSummary.Shipping = 0;

    Card.cardItemsDtos.forEach((element) => {
      this.orderSummary.Subtotal += element.product.price * element.quantity;
    });

    // Correcting total calculation by subtracting Discount
    this.orderSummary.Total =
      this.orderSummary.Subtotal +
      this.orderSummary.Shipping -
      this.orderSummary.Discount;

    return this.orderSummary;
  }

  updateQuantity(cardItemsId: string, quantity: number) {
    if (quantity >= 1) {
      this._cartServices
        .UpdateCardItemsToCart({ cardItemsId, quantity })
        .subscribe({
          next: (res) => {
            if (res.success) {
              var carditems = this.Card.cardItemsDtos.find(
                (x) => x.id == cardItemsId
              );
              if (carditems) carditems.quantity = quantity;
              this.CalcOrderSummary(this.Card);
            }
          },
        });
    }
  }

  DeleteCartItems(id: string) {
    this._cartServices.DeleteCardItemsToCart(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.Card.cardItemsDtos = this.Card.cardItemsDtos.filter(
            (x) => x.id != id
          );

          this.CalcOrderSummary(this.Card);
        }
      },
    });
  }

  // Checkout() {
  //   var request: CheckOutModel = {
  //     userID: localStorage.getItem('userId') ?? '',
  //     phoneId: this.phone,
  //     shippingAddressID: this.address,
  //     orderItems: this.Card.cardItemsDtos.map((x) => {
  //       return { productID: x.product.productID, quantity: x.quantity };
  //     }),
  //   };

  //   this._OrderServices.CheckOutServices(request).subscribe({
  //     next: (res) => {
  //       window.location.href = res.data;
  //     },
  //   });
  // }
}
export interface OrderSummary {
  Subtotal: number;
  Discount: number;
  Shipping: number;
  Total: number;
}
