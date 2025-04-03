import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { GetCategoryModel } from '../../../../../../Services/Category/Queries/Models/GetCategoryModel';
import { CategoryQuereisService } from '../../../../../../Services/Category/Queries/Handler/category-quereis.service';
import { NavigationService } from '../../../../../../Services/Navigation/navigation.service';
import { SelectCarService } from '../../../../../../Services/SharedDataService/select-car.service';
import { CategoryDto } from '../../../../../../Core/Dtos/CategoryDto';
import { Routing } from '../../../../../../Meta/Routing';
import { SharedModuleModule } from '../../../../../../Shared/Modules/shared-module.module';

@Component({
  selector: 'app-car-parts-selector',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './car-parts-selector.component.html',
  styleUrl: './car-parts-selector.component.css',
})
export class CarPartsSelectorComponent implements OnInit {
  selectedCategory: GetCategoryModel | null = null;
  selectedPart: GetCategoryModel | null = null;
  categorys: GetCategoryModel[] = [];
  IP: string = Routing.Ip;
  private readonly CateogryQuereisService = inject(CategoryQuereisService);
  private readonly Navigation = inject(NavigationService);
  private readonly Selector = inject(SelectCarService);
  ngOnInit(): void {
    this.CateogryQuereisService.GetCategoriesWithPagination(1, 15).subscribe(
      (response) => {
        this.categorys = response.data;
      }
    );
  }

  getFlattenedItems(subCategories: GetCategoryModel[]): GetCategoryModel[] {
    return subCategories.flatMap((sub) => sub);
  }
  showMegaMenu(category: GetCategoryModel, event: MouseEvent) {
    this.selectedCategory =
      this.selectedCategory === category ? null : category;
    const target = event.currentTarget as HTMLElement;
    setTimeout(() => {
      const megaMenu = document.querySelector('.mega-menu') as HTMLElement;
      if (megaMenu) {
        const rect = target.getBoundingClientRect();
        const parentRect = target
          .closest('.categories-container')!
          .getBoundingClientRect();
        megaMenu.style.top = `${rect.bottom - parentRect.top}px`;
        megaMenu.classList.add('animate-slide-down');
        megaMenu.classList.remove('animate-slide-down');
        void megaMenu.offsetWidth;
        megaMenu.classList.add('animate-slide-down');
      }
    }, 10);
  }

  selectPart(item: GetCategoryModel) {
    this.selectedPart = item;
    this.Navigation.NavigationByUrl('/Public/Selector/' + item.categoryID);
  }

  @HostListener('document:click', ['$event'])
  closeMegaMenu(event: Event) {
    if (!(event.target as HTMLElement).closest('.categories-container')) {
      this.selectedCategory = null;
    }
  }
}
