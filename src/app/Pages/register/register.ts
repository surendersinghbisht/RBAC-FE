import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/AuthService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private authService: AuthService, private router: Router,
    private snackBar: MatSnackBar
    ) {}

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
        console.log('Registration successful:', res);
        this.router.navigate(['/login']);
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.snackBar.open('Error registering user', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}
