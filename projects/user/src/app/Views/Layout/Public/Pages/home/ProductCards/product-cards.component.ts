import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetProducts } from '../../../../../../Services/Product/Queries/Models/GetProducts';
import { Routing } from '../../../../../../Meta/Routing';
import { QueriesProductService } from '../../../../../../Services/Product/Queries/Handler/queries-product.service';
import { NotFoundComponent } from '../../../../Components/not-found/not-found.component';
import { SharedModuleModule } from '../../../../../../Shared/Modules/shared-module.module';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-cards',
  imports: [NotFoundComponent, SharedModuleModule, NgxPaginationModule],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.css',
})
export class ProductCardsComponent implements OnInit {
  Products: Array<GetProducts> = [];
  Ip = Routing.Ip;
  pageSize = 4;
  p = 1;
  total: number = 0;

  //cache
  private pageCache = new Map<number, GetProducts[]>();

  private _ProductService = inject(QueriesProductService);

  private _totservice = inject(ToastrService);

  ngOnInit(): void {
    this.GetProductPagination(this.p, this.pageSize);
  }

  GetProductPagination(
    PageNumber: number,
    PageSize: number,
    filter?: object
  ): void {
    if (this.pageCache.has(PageNumber)) {
      this.Products = this.pageCache.get(PageNumber)!;
      return;
    }
    this._ProductService
      .GetProuctsWihtPagination(PageNumber, PageSize, filter)
      .subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.Products = res.data;
            this.total = res.totalCount;
            this.pageCache.set(PageNumber, res.data);
          }
        },
        error: (err) => {
          this._totservice.error(err.message);
        },
      });
  }

  pageChanged(event: number) {
    this.p = event;
    this.GetProductPagination(this.p, this.pageSize);

    const element = document.getElementById('products-container');
    if (element) {
      this.smoothScrollTo(element.offsetTop - 100);
    }
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

  //#region  Scroll
  private smoothScrollTo(targetPosition: number, duration: number = 500) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }
  //#endregion
}
