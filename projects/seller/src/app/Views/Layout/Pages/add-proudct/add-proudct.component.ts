import { Component, inject, OnInit } from '@angular/core';
import { AddProductModel } from '../../../../Services/Product/Commend/Models/AddProductModel';
import { ProductCommendService } from '../../../../Services/Product/Commend/Handler/product-commend.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormSharedModule } from '../../../../Shared/Modules/mat-form-shared.module';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';
import { Routing } from '../../../../Meta/Routing';
import { GetCategoryModel } from '../../../../Services/Category/Queries/Models/GetCategoryModel';
import { GetCarBrandModel } from '../../../../Services/Car/Queries/Models/GetCarBrandModel';
import { ModelQuereisService } from '../../../../Services/Models/Quereis/Handler/model-quereis.service';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';
import { GetModelWithBrand } from '../../../../Services/Models/Quereis/Models/GetModelWithBrand';
import { CategoryQuereisService } from '../../../../Services/Category/Queries/Handler/category-quereis.service';
import { CarBrandQueriesService } from '../../../../Services/Car/Queries/Handler/car-brand-queries.service';
import { modelCompatibilityDtos } from '../../../../Core/Dtos/modelCompatibilityDtos';
import { SharedModuleModule } from '../../../../../../../user/src/app/Shared/Modules/shared-module.module';
import { CompatibilityCommendService } from '../../../../Services/Compatibility/Commend/Handler/compatibility-commend.service';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { GetSKUModel } from '../../../../Services/Compatibility/Commend/Model/GetSKUModel';
@Component({
  selector: 'app-add-proudct',
  imports: [
    MatFormSharedModule,
    QuillModule,
    NgSelectModule,
    SharedModuleModule,
  ],
  templateUrl: './add-proudct.component.html',
  styleUrl: './add-proudct.component.css',
})
export class AddProudctComponent implements OnInit {
  productForm: FormGroup;
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
  selectedSku: any;
  items: any[] = [];
  skuSelected: boolean = false;
  searchControl = new FormControl();
  showDropdown: boolean = false;
  performSearch(term: string) {
    console.log('Searching for:', term);
    this._ModelCampatibilityServices.GetSKU(term).subscribe((results: any) => {
      this.items = results.data || [];
      console.log(this.items);

      console.log('Search results:', this.items);
      this.showDropdown = this.items.length > 0;
      this.skuSelected = false;
      this.selectedSku = null;
    });
  }

  selectItem(item: any) {
    this.selectedSku = item;
    this.selectedCategory = item.categoryID;

    this.searchControl.setValue(item.sku, { emitEvent: false });
    this.showDropdown = false;
    this.skuSelected = true;
  }

  onFocus() {
    if (this.items.length > 0) {
      this.showDropdown = true;
    }
  }

  onBlur() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  activeSection: string = 'restock';
  private readonly _ModelQuereisService = inject(ModelQuereisService);
  private readonly _CategoryServices = inject(CategoryQuereisService);
  private readonly _CarBrandServices = inject(CarBrandQueriesService);
  private readonly _ModelCampatibilityServices = inject(
    CompatibilityCommendService
  );
  private readonly _Navigation = inject(NavigationService);
  AddNewModelCampatibility() {
    if (!this.selectedSku) {
      const visible = document.querySelector('.visible') as HTMLElement;
      if (visible) {
        visible.style.display = 'block'; // خلي العنصر ظاهر
        setTimeout(() => {
          visible.classList.add('show'); // أضف الكلاس اللي بيعمل أنيميشن
        }, 10); // تأخير بسيط عشان الـ transition يتفعل
      }
    }
  }

  GetMaxAndMinYearsWithBrands(event: any) {
    this.RangeYear = event.RnageYera;
    this.selectMinYear = null;
    this.selectMaxYear = null;
  }
  click() {
    console.log(this.selectedSku?.sku ?? '', this.searchControl?.value);

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
        sKU: this.selectedSku?.sku ?? this.searchControl?.value,
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
        displayName: `${model.name}  (${model.minYear} -- ${model.maxYear})`,
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
  SelectCategory(even: any) {
    this.selectedCategory = even.categoryID;
  }
  getModelLabel(model: any): string {
    return `${model.name} (${model.minYear}-${model.maxYear})`;
  }

  // inventoryForm: FormGroup;
  isDragOver = false;
  imagePreviews: string[] = [];
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'], // التنسيقات الأساسية
      [{ list: 'ordered' }, { list: 'bullet' }], // القوائم
      ['link'], // الروابط
    ],
  };

  images: File[] = [];
  formatText(format: string, value?: any) {
    const editor = document.querySelector('quill-editor') as any;
    if (editor && editor.quill) {
      const range = editor.quill.getSelection(true);
      editor.quill.format(format, value);
    }
  }
  //private categoryService = inject(CategoryService);
  private Toster = inject(ToastrService);
  private _ProductCommendService = inject(ProductCommendService);

  //#region  Category
  // loadParentCategories() {
  //   this.categoryService.getParentCategories().subscribe((data) => {
  //     this.categories = data.data;
  //   });
  // }

  // onCategoryChange(categoryId: any) {
  //   this.selectedCategory = this.categories.find(
  //     (cat) => cat.id === categoryId.value
  //   );
  //   if (this.selectedCategory) {
  //     this.categoryService
  //       .getSubcategories(categoryId.value)
  //       .subscribe((res) => {
  //         this.subcategories = res.data; // تأكد أن res.data هو المكان الصحيح للفئات الفرعية
  //       });
  //   } else {
  //     this.subcategories = [];
  //   }

  //   this.selectedSubCategory = null;
  // }

  // onSubCategoryChange(subCategory: any) {
  //   this.selectedSubCategory = subCategory;

  //   if (subCategory.id) {
  //     this.categoryService.getSubcategories(subCategory.id).subscribe((res) => {
  //       subCategory.subCategories = res.data; // تحميل الفئات الفرعية الخاصة بهذا الـ subcategory
  //     });
  //   }
  // }

  //#endregion

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
    // this.inventoryForm = this.fb.group({
    //   // Restock section
    //   quantity: ['', [Validators.required, Validators.min(1)]],

    //   // Advanced section
    //   productIdType: ['ISBN'],
    //   productId: [''],

    //   // Shipping section
    //   shippingType: ['company'], // 'seller' or 'company'
    // });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((term) => term && term.length >= 2)
      )
      .subscribe((term) => {
        this.performSearch(term);
      });
    this.LodingCategory();
    this.LodingCarBrand();
  }

  setActiveSection(section: string): void {
    this.activeSection = this.activeSection === section ? '' : section;
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  // Method to save draft
  saveDraft() {
    console.log('Saving draft', this.productForm.value);
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
    if (this.ModelCompatibility.length == 0 && !this.selectedSku?.sku) {
      this.Toster.error('Please select Model Compatibility.');
      return;
    }
    if (!this.selectedSku?.sku && !this.searchControl?.value) {
      this.Toster.error('Please Enter SKU');
      return;
    }
    if (this.productForm.valid) {
      var requst: AddProductModel = {
        sKU: this.selectedSku?.sku ?? this.searchControl?.value,
        CategoryID: this.selectedCategory,
        Description: this.productForm.value.description,
        FormImages: this.images,
        Name: this.productForm.value.name,
        Price: this.productForm.value.basePrice,
        SellerID: localStorage.getItem('sellerID') ?? '',
        StockQuantity: +this.productForm.value.Stock,
      };

      this._ProductCommendService.AddProduct(requst).subscribe((res) => {
        if (res.success) {
          if (!this.selectedSku?.sku) {
            this._ModelCampatibilityServices
              .AddModelCompatibility({
                modelCompatibilityDtos: this.ModelCompatibility,
              })
              .subscribe((res) => {
                if (res.success) {
                  this.Toster.success(res.message);
                }
              });
          } else {
            this.Toster.success(res.message);
          }
        } else {
          this.Toster.error(res.message);
        }
      });
    }
  }

  //#region Upload Image
  // عند سحب الملفات داخل منطقة الإسقاط
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  // عند مغادرة الملف لمنطقة الإسقاط
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  // عند إسقاط الملفات
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files.length) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  // عند اختيار ملفات عبر المتصفح
  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.processFiles(target.files);
    }
  }

  // معالجة الملفات وعرض المعاينة
  processFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert('Please select only image files.');
        return;
      }
      this.images.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviews.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  // فتح نافذة اختيار الملفات
  browseImage() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput.click();
  }

  // إضافة صورة من رابط
  addMediaFromUrl() {
    const url = prompt('Enter Image URL:');
    if (url) {
      this.imagePreviews.push(url);
    }
  }

  // حذف صورة معينة
  removeImage(image: string, index: number) {
    this.imagePreviews = this.imagePreviews.filter((img) => img !== image);
    this.images.splice(index, 1);
  }
  //#endregion
}
