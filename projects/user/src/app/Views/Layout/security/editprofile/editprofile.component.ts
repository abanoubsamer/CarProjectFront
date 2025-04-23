import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GetUserIdModel } from '../../../../Services/User/Queries/Models/GetUserIdModels';
import { UserQuereisService } from '../../../../Services/User/Queries/Handler/user-quereis.service';
import { CommonModule } from '@angular/common';
import { Response } from '../../../../Core/BasicResponse/Response';

@Component({
  selector: 'app-editprofile',
  imports: [RouterModule,FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit{
  form!: FormGroup;
  userId: string = '';
  success = false;
  userPhoto: string = '';
  userData!: GetUserIdModel;

  constructor(private fb: FormBuilder, private userService: UserQuereisService, private router: Router) {}

  ngOnInit(): void {
    // جلب الـ userId من localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = storedUserId;
    } else {
      console.error('User ID not found!');
      return;
    }

    this.form = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      picture: ['']
    });

    this.userService.GetUserServices(this.userId).subscribe((res: Response<GetUserIdModel>) => {
      const user = res.data;
      this.userData = user;
      this.userPhoto = user.picture;

      this.form.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phoneNumberDtos[0]?.phoneNumber || '',
        address: user.shippingAddresses[0]?.addressID || '',
        picture: user.picture
      });
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedData = {
        ...this.userData,
        ...this.form.value
      };

      this.updateUserData(updatedData);
    }
  }
  // التعامل مع تغيير الصورة
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userPhoto = e.target.result;
        this.form.patchValue({ picture: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  updateUserData(updatedData: GetUserIdModel): void {
    this.userService.UpdateUser(this.userId, updatedData).subscribe(response => {
      this.success = true;
      console.log('User data updated successfully:', response);
      setTimeout(() => this.router.navigate(['/profile']), 2000);
    });
  }

  updateUserPhoto(updatedPhoto: string): void {
    this.userService.UpdateUser(this.userId, { picture: updatedPhoto }).subscribe(response => {
      this.userPhoto = updatedPhoto;
      console.log('User photo updated successfully:', response);
    });
  }
}
