import { Component, inject, OnInit } from '@angular/core';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModuleModule } from '../../../../../../../../user/src/app/Shared/Modules/shared-module.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetCategoryModel } from '../../../../../Services/Category/Queries/Models/GetCategoryModel';
import { GetCarBrandModel } from '../../../../../Services/Car/Queries/Models/GetCarBrandModel';
import { GetModelWithBrand } from '../../../../../Services/Models/Quereis/Models/GetModelWithBrand';
import { modelCompatibilityDtos } from '../../../../../Core/Dtos/modelCompatibilityDtos';
import { Routing } from '../../../../../Meta/Routing';
import { ModelQuereisService } from '../../../../../Services/Models/Quereis/Handler/model-quereis.service';
import { CategoryQuereisService } from '../../../../../Services/Category/Queries/Handler/category-quereis.service';
import { CarBrandQueriesService } from '../../../../../Services/Car/Queries/Handler/car-brand-queries.service';
import { CompatibilityCommendService } from '../../../../../Services/Compatibility/Commend/Handler/compatibility-commend.service';
import { NavigationService } from '../../../../../Services/Navigation/navigation.service';
import { ToastrService } from 'ngx-toastr';
import { ProductCommendService } from '../../../../../Services/Product/Commend/Handler/product-commend.service';
import { AddProductModel } from '../../../../../Services/Product/Commend/Models/AddProductModel';
import { UpdateProductModel } from '../../../../../Services/Product/Commend/Models/UpdateProductModel';

@Component({
  selector: 'app-edit-product',
  standalone: true, // Add standalone: true if you're using standalone components
  imports: [
    MatFormSharedModule,
    QuillModule,
    NgSelectModule,
    SharedModuleModule,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  Categorys: GetCategoryModel[] = [];

  CarBrands: GetCarBrandModel[] = [];
  Models: GetModelWithBrand[] = [];
  ModelCompatibility: modelCompatibilityDtos[] = [];
  ModelCampatibilityView: {
    BrandName: string;
    ModelName: string;
    MinYear: number;
    MaxYear: number;
  }[] = [];
  selectedBrand: any;
  RangeYear: number[] = [];
  selectMaxYear: any;
  selectMinYear: any;
  selectedModel: any;
  selectedCategory: any;
  Ip = Routing.Ip;
  activeSection: string = 'restock';
  isDragOver = false;
  imagePreviews: string[] = [];
  images: File[] = [];

  // Define editor configuration
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Basic formatting
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      ['link'], // Links
    ],
  };

  private readonly _ModelQuereisService = inject(ModelQuereisService);
  private readonly _CategoryServices = inject(CategoryQuereisService);
  private readonly _CarBrandServices = inject(CarBrandQueriesService);
  private readonly _ModelCampatibilityServices = inject(CompatibilityCommendService);
  private readonly _Navigation = inject(NavigationService);
  private readonly Toster = inject(ToastrService);
  private readonly _ProductCommendService = inject(ProductCommendService);

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      // Product Information
      name: ['', Validators.required],
      description: ['', Validators.required],
      basePrice: ['', Validators.required],
      discountedPrice: [''],
      inStock: [true],
      Stock: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.LodingCategory();
    this.LodingCarBrand();
  }

  GetMaxAndMinYearsWithBrands(event: any) {
    this.RangeYear = event.RnageYera;
    this.selectMinYear = null;
    this.selectMaxYear = null;
  }

  click() {
    if (this.selectMaxYear && this.selectMinYear && this.selectedModel) {
      if (
        this.ModelCampatibilityView.find(
          (x) => x.ModelName == this.selectedModel.name
        )
      ) {
        this.Toster.warning('Model already added');
        return;
      }

      if (this.selectMaxYear < this.selectMinYear) {
        this.Toster.error('Max year must be greater than min year');
        return;
      }

      this.ModelCampatibilityView.push({
        BrandName: this.selectedBrand.name,
        ModelName: this.selectedModel.name,
        MinYear: this.selectMinYear,
        MaxYear: this.selectMaxYear,
      });

      this.ModelCompatibility.push({
        modelId: this.selectedModel.id,
        minYear: this.selectMinYear,
        maxYear: this.selectMaxYear,
        productId: '',
      });

      this.selectMaxYear = null;
      this.selectMinYear = null;
      this.selectedModel = null;
      this.RangeYear = [];
    }
  }

  remove(Model: any) {
    this.ModelCampatibilityView = this.ModelCampatibilityView.filter(
      (x) => x.ModelName != Model.ModelName
    );
    this.ModelCompatibility = this.ModelCompatibility.filter(
      (x) => x.modelId != Model.ModelName
    );
  }

  GetModelsWithBrands(event: any) {
    this._ModelQuereisService.GetModelsWithBarnd(event.id).subscribe((res) => {
      this.Models = res.data;
      this.Models = this.Models.map((model) => ({
        ...model,
        displayName: `${model.name} (${model.minYear} -- ${model.maxYear})`,
        RnageYera: Array.from(
          { length: model.maxYear - model.minYear + 1 },
          (_, index) => model.minYear + index
        ),
      }));
    });
  }

  LodingCategory() {
    this._CategoryServices
      .GetCategoriesWithPagination(1, 50)
      .subscribe((res) => {
        this.Categorys = res.data;
      });
  }

  LodingCarBrand() {
    this._CarBrandServices
      .GeTCarBrandsWithPagination(1, 100)
      .subscribe((res) => {
        this.CarBrands = res.data;
      });
  }

  SelectCategory(event: any) {
    this.selectedCategory = event.categoryID;
  }

  getModelLabel(model: any): string {
    return `${model.name} (${model.minYear}-${model.maxYear})`;
  }

  formatText(format: string, value?: any) {
    const editor = document.querySelector('quill-editor') as any;
    if (editor && editor.quill) {
      const range = editor.quill.getSelection(true);
      editor.quill.format(format, value);
    }
  }

  setActiveSection(section: string): void {
    this.activeSection = this.activeSection === section ? '' : section;
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  saveDraft() {
    if (this.productForm) {
      console.log('Saving draft', this.productForm.value);
    }
  }

  publishProduct() {
    if (this.images.length == 0) {
      this.Toster.error('Please select at least one image.');
      return;
    }

    if (this.selectedCategory == null) {
      this.Toster.error('Please select Category.');
      return;
    }

    if (this.ModelCompatibility.length == 0) {
      this.Toster.error('Please select Model Compatibility.');
      return;
    }

    if (this.productForm && this.productForm.valid) {
      const request: AddProductModel = {
        CategoryID: this.selectedCategory,
        Description: this.productForm.value.description,
        FormImages: this.images,
        Name: this.productForm.value.name,
        Price: this.productForm.value.basePrice,
        SellerID: localStorage.getItem('sellerID') ?? '',
        StockQuantity: +this.productForm.value.Stock,
      };

      this._ProductCommendService.AddProduct(request).subscribe((res) => {
        if (res.success) {
          this.ModelCompatibility.forEach((x) => {
            x.productId = res.data;
          });

          this._ModelCampatibilityServices
            .AddModelCompatibility({
              modelCompatibilityDtos: this.ModelCompatibility,
            })
            .subscribe((compatRes) => {
              if (compatRes.success) {
                this.Toster.success(compatRes.message);
              }
            });
        } else {
          this.Toster.error(res.message);
        }
      });
    }
  }

  //#region Upload Image
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files.length) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.processFiles(target.files);
    }
  }

  processFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert('Please select only image files.');
        return;
      }

      this.images.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          this.imagePreviews.push(result);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  browseImage() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput.click();
  }

  addMediaFromUrl() {
    const url = prompt('Enter Image URL:');
    if (url) {
      this.imagePreviews.push(url);
    }
  }

  removeImage(image: string, index: number) {
    this.imagePreviews = this.imagePreviews.filter((img) => img !== image);
    this.images.splice(index, 1);
  }
  //#endregion

  updateProduct() {
  if (this.productForm.invalid) {
    this.Toster.error('Please fill in all required fields.');
    return;
  }

  if (!this.selectedCategory) {
    this.Toster.error('Please select a category.');
    return;
  }

  if (this.ModelCompatibility.length === 0) {
    this.Toster.error('Please select model compatibility.');
    return;
  }

  const request: UpdateProductModel = {
    Id: 'PUT_EXISTING_PRODUCT_ID_HERE', // Replace dynamically
    Name: this.productForm.value.name,
    Description: this.productForm.value.description,
    Price: +this.productForm.value.basePrice,
    FormImages: this.images,
    IdIamgesDelteted: [], // Add logic to collect deleted image IDs if needed
    StockQuantity: +this.productForm.value.Stock,
    SellerID: localStorage.getItem('sellerID') ?? '',
    CategoryID: this.selectedCategory,
  };

  this._ProductCommendService.UpdateProduct(request).subscribe((res) => {
    if (res.success) {
      this.Toster.success('Product updated successfully!');
    } else {
      this.Toster.error(res.message);
    }
  });
}


}