import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/AuthService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // if (this.password !== this.confirmPassword) {
    //   alert('Passwords do not match');
    //   return;
    // }

    const newUser = {
      userName: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(newUser).subscribe({
      next: (res) => {
        alert('Registration successful! Please login.');
        console.log('Registration successful:', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert('Error registering user');
      }
    });
  }
}
