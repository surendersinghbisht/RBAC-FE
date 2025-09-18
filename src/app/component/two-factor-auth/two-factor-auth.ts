import { Component, OnInit } from '@angular/core';
import { AuthService, LoginResponse } from '../../Services/AuthService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.html',
  styleUrls: ['./two-factor-auth.css']
})
export class TwoFactorAuthComponent implements OnInit {
  userID: string = '';
  code: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userID = localStorage.getItem('userId') ?? '';
  }

  onSubmit(): void {
    this.authService.validateOtp(this.code, this.userID).subscribe({
      next: (data:LoginResponse) => {
        console.log(data.token);
        if (data.success) {
          localStorage.setItem('token', data.token ?? '');
         localStorage.setItem('roles', JSON.stringify(data?.roles ?? []));
          const roles = data?.roles ?? [];
console.log('2fa roles', roles);
          if(roles.includes('Admin')){
            this.router.navigate(['dashboard']);
          }else{
          this.router.navigate(['user-dashboard']);
          }
          console.log('2FA successful');
          localStorage.removeItem('userId');
          // this.router.navigate(['dashboard']);
        } else {
          console.log('Invalid 2FA code');
        }
      },
      error: (err) => {
        console.error('2FA error:', err);
      }
    });
  }
}
