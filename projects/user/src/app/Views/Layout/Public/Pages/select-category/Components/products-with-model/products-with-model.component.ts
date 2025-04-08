import { Component, inject } from '@angular/core';
import { GetProducts } from '../../../../../../../Services/Product/Queries/Models/GetProducts';
import { Routing } from '../../../../../../../Meta/Routing';
import { QueriesProductService } from '../../../../../../../Services/Product/Queries/Handler/queries-product.service';
import { ToastrService } from 'ngx-toastr';
import { GetModelWithBrand } from '../../../../../../../Services/Models/Quereis/Models/GetModelWithBrand';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from '../../../../../Components/not-found/not-found.component';
import { SharedModuleModule } from '../../../../../../../Shared/Modules/shared-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-products-with-model',
  imports: [NotFoundComponent, SharedModuleModule, NgxPaginationModule],
  templateUrl: './products-with-model.component.html',
  styleUrl: './products-with-model.component.css',
})
export class ProductsWithModelComponent {
  //#region  Fials
  model: GetModelWithBrand = {} as GetModelWithBrand;
  Products: Array<GetProducts> = new Array<GetProducts>();
  Totalitems: number = 0;
  Ip = Routing.Ip;
  pageSize = 5;
  p = 1;
  total: number = 0;
  //#endregion

  private readonly AcativeRoute = inject(ActivatedRoute);
  _ProductService = inject(QueriesProductService);
  _totservice = inject(ToastrService);
  categoryId!: string;
  brandId!: string;
  private readonly ActaveRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.AcativeRoute.data.subscribe(({ ModelById }) => {
      this.AcativeRoute.parent?.params.subscribe((perntparams) => {
        this.AcativeRoute.params.subscribe((params) => {
          this.brandId = params['brandId'];
          this.categoryId = perntparams['id'];
          console.log(this.categoryId);

          this.model = ModelById;
          this.GetProductPagination(1, 10, {
            CategoryId: this.categoryId,
            ModelId: this.model.id,
            BrandId: this.brandId,
          });
        });
      });
    });
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
  pageChanged(event: number) {}
}
