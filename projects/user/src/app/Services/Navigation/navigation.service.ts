import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly Routing = inject(Router);

  NavigationByUrl(Url: string) {
    this.Routing.navigateByUrl(Url);
  }
}
