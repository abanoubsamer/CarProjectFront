import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthQueriresService } from '../../../../Services/Auth/Quereis/Handler/auth-querires.service';
import { Router, RouterModule } from '@angular/router';
import { LoginSellerModel } from '../../../../Services/Auth/Quereis/Model/LoginSellerModel';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthQueriresService, private router: Router,  private toastr: ToastrService // ✅ هنا
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
  
    const request: LoginSellerModel = this.loginForm.value;
    this.loading = true;
    this.errorMessage = '';
  
    this.authService.LoginServices(request).subscribe({
      next: (res) => {
        this.loading = false;
        const responseData = res.data;
  
        if (responseData?.token) {
          localStorage.setItem('Token', responseData.token);
          localStorage.setItem('UserID', responseData.userID);
          localStorage.setItem('SellerID', responseData.sellerID);
  
          this.toastr.success('Login successful!', 'Success ✅'); // ✅ التوستر هنا
          this.router.navigateByUrl('/Dashboard');
        } else {
          this.errorMessage = 'Login failed: token not found.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Login failed. Please try again.';
        this.toastr.error(this.errorMessage, 'Error ❌'); // ✅ توستر للخطأ كمان
        console.error(err);
      },
    });
}
}