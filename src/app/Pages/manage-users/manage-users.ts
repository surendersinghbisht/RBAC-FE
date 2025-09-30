import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/UserService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AiBot } from "../../component/ai-bot/ai-bot";

@Component({
  selector: 'app-manage-users',
  imports: [CommonModule, FormsModule, AiBot, RouterModule],
  templateUrl: './manage-users.html',
  styleUrls: ['./manage-users.css']
})
export class ManageUsers implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService){}

  ngOnInit(): void {
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
}