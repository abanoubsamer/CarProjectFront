import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetProducts } from '../../../../../../Services/Product/Queries/Models/GetProducts';
import { Routing } from '../../../../../../Meta/Routing';
import { QueriesProductService } from '../../../../../../Services/Product/Queries/Handler/queries-product.service';
import { NotFoundComponent } from '../../../../Components/not-found/not-found.component';

@Component({
  selector: 'app-product-cards',
  imports: [NotFoundComponent],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css',
})
export class ProductCardsComponent implements OnInit {
  //#region  Fials
  Products: Array<GetProducts> = new Array<GetProducts>();
  Totalitems: number = 0;
  Ip = Routing.Ip;
  //#endregion

  _ProductService = inject(QueriesProductService);

  _totservice = inject(ToastrService);
  ngOnInit(): void {
    this.GetProductPagination(1, 10);
  }

  GetProductPagination(
    PageNumber: number,
    PageSize: number,
    filter?: object
  ): void {
    this._ProductService
      .GetProuctsWihtPagination(PageNumber, PageSize, filter)
      .subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.Products = res.data;
            this.Totalitems = res.totalCount;
          }
        },
        error(err) {},
      });
  }
  fullStars(rate: number) {
    return Math.floor(rate);
  }

  hasHalfStar(rate: number) {
    return rate % 1 !== 0;
  }

  emptyStars(rate: number) {
    return 5 - Math.floor(rate);
  }
}
