import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserQuereisService } from '../../../../Services/User/Queries/Handler/user-quereis.service';
import { GetUserIdModel } from '../../../../Services/User/Queries/Models/GetUserIdModels';
import { Response } from '../../../../Core/BasicResponse/Response';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userData: GetUserIdModel = {} as GetUserIdModel;
  userPhoto: string | null = '';
  userId: string = localStorage.getItem('userId') || '';

  constructor(
    private userService: UserQuereisService,
  ) {}

  ngOnInit(): void {
    if (this.userId) {
      this.loadUserData();
    } else {
      console.error('User ID not found');
      // ممكن ترجعي المستخدم لصفحة تسجيل الدخول
    }
  }

  loadUserData(): void {
    this.userService.GetUserServices(this.userId).subscribe(
      (response: Response<GetUserIdModel>) => {
        this.userData = response.data;
        console.log('User data loaded:', this.userData);
        if (this.userData?.picture) {
          this.userPhoto = this.userData.picture;
        }
      },
      
    );
  }
}
