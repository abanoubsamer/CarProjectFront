import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetModelWithBrand } from '../../../../../../../Services/Models/Quereis/Models/GetModelWithBrand';
import { NavigationService } from '../../../../../../../Services/Navigation/navigation.service';
import { Routing } from '../../../../../../../Meta/Routing';
import { SharedModuleModule } from '../../../../../../../Shared/Modules/shared-module.module';
import { ProductCardsComponent } from '../../../home/ProductCards/product-cards.component';

@Component({
  selector: 'app-models-component',
  imports: [SharedModuleModule, ProductCardsComponent],
  templateUrl: './models-component.component.html',
  styleUrl: './models-component.component.css',
})
export class ModelsComponentComponent implements OnInit {
  models: GetModelWithBrand[] = [];
  categoryId!: string;
  brandId!: string;
  IP: string = Routing.Ip;
  filter: any = {};
  private readonly route = inject(ActivatedRoute);
  private readonly navigation = inject(NavigationService);

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      console.log(params);
      this.categoryId = params['id'];
    });
    this.route.params.subscribe((params) => {
      this.brandId = params['brandId'];
    });
    this.route.data.subscribe(({ Models }) => {
      this.models = Models;
    });
    this.filter = { CategoryId: this.categoryId, BrandId: this.brandId };
  }
  selectModel(modelId: string) {
    if (this.categoryId && this.brandId) {
      this.navigation.NavigationByUrl(
        `Public/Selector/${this.categoryId}/Brands/${this.brandId}/Models/${modelId}`
      );
    }
  }
}
