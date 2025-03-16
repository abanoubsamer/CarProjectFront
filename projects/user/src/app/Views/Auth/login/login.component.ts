import { Component, inject, OnInit } from '@angular/core';
import { MatFormSharedModule } from '../../../Shared/Modules/mat-form-shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginModel } from '../../../Services/Auth/Commend/Models/LoginModel';
import { AuthCommendService } from '../../../Services/Auth/Commend/Handler/auth-commend.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationService } from '../../../Services/Navigation/navigation.service';
@Component({
  selector: 'app-login',
  imports: [MatFormSharedModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  //#region Failds
  Form: FormGroup = new FormGroup({});
  hide: boolean = true;
  //#endregion

  //#region  Injectes
  readonly Bulider = inject(FormBuilder);
  readonly AuthCommend = inject(AuthCommendService);
  private readonly toastrService = inject(ToastrService);
  private readonly Navigation = inject(NavigationService);
  //#endregion

  //#region  LiveHooks
  ngOnInit(): void {
    this.Form = this.initFormLogin();
  }
  //#endregion

  //#region Methods
  initFormLogin(): FormGroup {
    return this.Bulider.group({
      email: [
        '',
        {
          validators: [
            Validators.required,
            Validators.email,
            Validators.maxLength(20),
            Validators.minLength(5),
          ],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(8)],
        },
      ],
    });
  }

  login() {
    if (this.Form.valid) {
      var request: LoginModel = this.Form.value;
      this.AuthCommend.Login(request).subscribe({
        next: (res) => {
          if (res.success) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userID);
            this.toastrService.success('Success Login');
            this.Navigation.NavigationByUrl('/Public/Home');
          }
        },
        error: (err) => {
          this.toastrService.error(err.error.message);
        },
      });
    }
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  //#endregion
}
