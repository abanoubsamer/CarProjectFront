import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../../../../Services/SharedDataService/shared-data.service';
import { UserCommendService } from '../../../../../Services/User/Commend/Handler/user-commend.service';
import { UserQuereisService } from '../../../../../Services/User/Queries/Handler/user-quereis.service';
import { shippingAddressesDto } from '../../../../../Core/Dtos/shippingAddressesDto';
@Component({
  selector: 'app-map-picker',
  imports: [MatFormSharedModule, MatDialogModule, MatDatepickerModule],
  templateUrl: './map-picker.component.html',
  styleUrl: './map-picker.component.css',
})
export class MapPickerComponent {
  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();
  private map!: L.Map;
  private marker!: L.Marker;
  savedLocations: shippingAddressesDto[] = [];
  desapol = false;
  shippingid = '';
  private readonly _UserCommendService = inject(UserCommendService);
  private readonly _UserQuereisService = inject(UserQuereisService);
  private readonly _SharedDataService = inject(SharedDataService);
  private readonly toster = inject(ToastrService);
  private dialogRef = inject(MatDialogRef<MapPickerComponent>);

  ngOnInit(): void {
    this.GetLocationsUser();
    this.initMap();
  }

  GetLocationsUser() {
    this._SharedDataService.currentCUser.subscribe((user) => {
      this.savedLocations = user.shippingAddresses;
    });
  }

  async addNewAddress() {
    const position = this.marker.getLatLng();
    var address = await this._UserCommendService
      .getAddressFromCoordinates(position.lat, position.lng)
      .then((res) => res);
    this._UserCommendService.AddUserShippingAddress(address).subscribe({
      next: (res) => {
        if (res.success) {
          this.toster.success('Secces Add New Address');
          var newLocation: shippingAddressesDto = {
            ...address,
            addressID: res.data,
          };
          this._SharedDataService.updateshippingAddresses(newLocation);
        }
      },
    });
  }

  selectAddress(event: any) {
    this.shippingid = event.source.value;
    this.desapol = true;
    const selectedAddress = this.savedLocations.find(
      (address) => address.addressID === this.shippingid
    );

    if (selectedAddress) {
      const lat = selectedAddress.lat;
      const lon = selectedAddress.lon;

      this.marker.setLatLng([parseFloat(lat), parseFloat(lon)]);
      this.map.setView([parseFloat(lat), parseFloat(lon)], 13);
    }
  }

  SubmitAddress() {
    this.dialogRef.close(this.shippingid);
  }
  //#region Private Methods
  private initMap(): void {
    this.map = L.map('map');

    // إضافة طبقة OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // إنشاء أيقونة مخصصة
    const customIcon = L.icon({
      iconUrl: 'location_15459142.png',
      iconSize: [40, 40], // حجم الأيقونة
      iconAnchor: [20, 40], // نقطة التثبيت بالنسبة للماركر
      popupAnchor: [0, -40], // موضع النافذة المنبثقة إذا كنتِ ستستخدمينها
    });

    // محاولة تحديد الموقع الحالي
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // تعيين الخريطة على الموقع الحالي
          this.map.setView([userLat, userLng], 13);

          // إضافة الماركر المخصص
          this.marker = L.marker([userLat, userLng], {
            draggable: true,
            icon: customIcon,
          }).addTo(this.map);

          this.addMarkerEvents();
          this.locationSelected.emit({ lat: userLat, lng: userLng });
        },
        () => {
          this.setDefaultLocation(customIcon);
        }
      );
    } else {
      this.setDefaultLocation(customIcon);
    }
  }

  private setDefaultLocation(icon: L.Icon): void {
    const defaultLat = 30.0444;
    const defaultLng = 31.2357;

    this.map.setView([defaultLat, defaultLng], 13);
    this.marker = L.marker([defaultLat, defaultLng], {
      draggable: true,
      icon,
    }).addTo(this.map);

    this.addMarkerEvents();
    this.locationSelected.emit({ lat: defaultLat, lng: defaultLng });
  }

  private addMarkerEvents(): void {
    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
    });

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      this.marker.setLatLng([lat, lng]);
    });
  }
  //GetLoacationDetials

  //#endregion;
}
