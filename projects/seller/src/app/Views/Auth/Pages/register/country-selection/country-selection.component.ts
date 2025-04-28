import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCommendService } from '../../../../../Services/Auth/Commend/Handler/auth-commend.service';

@Component({
  selector: 'app-country-selection',
  imports: [MatFormSharedModule, RouterModule],
  templateUrl: './country-selection.component.html',
  styleUrl: './country-selection.component.css',
})
export class CountrySelectionComponent {
  countryForm: FormGroup;

  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  private readonly _AuthCommendService = inject(AuthCommendService);
  constructor(private fb: FormBuilder) {
    this.countryForm = this.fb.group({
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  sellGlobally(): void {
    console.log('Navigating to Jumia Global seller page...');
    window.open('https://www.jumia-global.com/', '_blank');
  }

  onSubmit(): void {
    if (this.countryForm.valid) {
      this._AuthCommendService.updateCountrySelection(this.countryForm.value);
      this.submitted.emit(true);
    }
  }
}
