import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthCommendService } from '../../../../../Services/Auth/Commend/Handler/auth-commend.service';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';

@Component({
  selector: 'app-personal-information',
  imports: [MatFormSharedModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
})
export class PersonalInformationComponent {
  personalForm: FormGroup;
  showPassword: boolean = false;
  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  showConfirmPassword: boolean = false;

  private readonly _AuthCommendServcies = inject(AuthCommendService);

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        countryCode: ['+20', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{9,15}$')],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatchValidator(form: FormGroup): any {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.personalForm.valid) {
      this._AuthCommendServcies.updatePersonalInformation(
        this.personalForm.value
      );
      this.submitted.emit(true);
      console.log('Form Submitted', this.personalForm.value);
    } else {
      this.personalForm.markAllAsTouched();
    }
  }
}
