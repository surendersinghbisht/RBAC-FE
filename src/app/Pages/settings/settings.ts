import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/AuthService';

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings implements OnInit {
constructor(private router: Router, private authSevice: AuthService) {}
user: any;
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']); 
  }

  ngOnInit() {
 
  }
  enable2FA( enable: boolean) {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      }
    
    console.log('enable',enable, this.user);
this.authSevice.enable2FA(this.user.email, enable).subscribe({
  next: (res) => {
    alert('2FA enabled successfully!');
    console.log('2FA enabled successfully:', res);
  },

      error: (err) => {
        alert('error enabling 2FA');
        console.error('Error fetching user details', err)}
})
  }
}
