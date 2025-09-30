import { Component, OnInit } from '@angular/core';
import { IdentityUserDto, UserService } from '../../Services/UserService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AiBot } from "../../component/ai-bot/ai-bot";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [CommonModule, FormsModule, RouterLink, RouterModule, RouterOutlet],
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


  }




logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('roles');
  this.router.navigate(['login']);
}
}
