import { Component, Input, OnInit } from '@angular/core';
import { AuthService, LoginResponse } from '../../Services/AuthService';
import { RedirectCommand, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loading:boolean = false;
  @Input() userD?: string;
  errorMessage: string = '';
  loginForm!: FormGroup;
  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    console.log('Form submitted with:', this.loginForm.value);
    this.loading = true;
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (response: LoginResponse) => {
          this.loading = false;
          if (response.success) {
            console.log('Login successful:', response);
             localStorage.setItem('token', response.token ?? '');
            localStorage.setItem('roles', JSON.stringify(response?.roles ?? []));
             if(response.roles == undefined || response.roles.length == 0){
              console.log('No roles assigned to the user.');
              return;
             }
            if(response?.roles.includes('User')) {
              this.router.navigate(['user-dashboard']);
            }else {
              this.router.navigate(['dashboard']);
            }
          } else {
            this.errorMessage = response.message ?? 'Login failed';
            console.log('Login failed:', response.message);
          }

          if (response.twoFactorRequired) {
         localStorage.setItem('roles', JSON.stringify(response?.roles ?? []));
                localStorage.setItem('token', response.token ?? '');
            localStorage.setItem('userId',response.userId);
             this.router.navigate(['two-factor-auth']);
            
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('Login error:', err);
        }
      });
  }
}
