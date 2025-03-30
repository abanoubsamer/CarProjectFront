import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-slider-adv',
  templateUrl: './slider-adv.component.html',
  styleUrls: ['./slider-adv.component.css'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderAdvComponent {
  imagePaths: string[] = [
    'Adv/cmHJM20106.webp',
    'Adv/dCcwq23810.webp',
    'Adv/IWS8520206.webp',
    'Adv/JJQe029208.webp',
    'Adv/OxOlt20806.webp',
    'Adv/T5cVg20506.webp',
    'Adv/tpQ9F20706.webp',
    'Adv/UPYfU20206.webp',
  ];
  // تقسيم الصور إلى أزواج
  imagePairs: string[][] = [];

  constructor() {
    for (let i = 0; i < this.imagePaths.length; i += 2) {
      this.imagePairs.push(this.imagePaths.slice(i, i + 2));
    }
  }
}
