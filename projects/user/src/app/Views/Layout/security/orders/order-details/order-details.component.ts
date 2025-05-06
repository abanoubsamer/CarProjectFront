import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';

@Component({
  selector: 'app-order-details',
  imports: [MatDialogModule, MatFormSharedModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  orderDetails: any;
  datadailog = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.orderDetails = this.datadailog;
    console.log(this.orderDetails);
  }
}
