import { Component, OnInit } from '@angular/core';
import { IdentityUserDto, UserService } from '../../Services/UserService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AiBot } from "../../component/ai-bot/ai-bot";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [CommonModule, FormsModule, RouterLink, AiBot],
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  users: any[]= [];
  userDetails?: IdentityUserDto;
  constructor(private userService: UserService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.userService.getMyDetails().subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userDetails = user;
      },
      error: (err) => console.error('Error fetching user details', err)
    });

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log('Users:', users);
        this.users = users;
      },
      error: (err) => console.error('Error fetching users', err)
    });
  }


updateUserRole(user: any) {
  console.log('clicked',user)
  this.userService.updateRoleForUser(user.id, user.role).subscribe({
    next: (updatedUser) => {
      alert('User role updated successfully!');
      console.log('User role updated successfully:', updatedUser);
    },
    error: (err) => console.error('Error updating user role', err)
  })
}

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('roles');
  this.router.navigate(['login']);
}
}
