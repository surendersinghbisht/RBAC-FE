import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IdentityUserDto, UserService } from '../../Services/UserService';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css'],
  imports: [CommonModule, RouterLink]
})
export class UserDashboard implements OnInit {
  userName = '';
  totalTasks = 12;
  completedTasks = 8;
  pendingTasks = 4;

  recentActivities: string[] = [
    'Completed Task: Fix login bug',
    'Submitted Task: Dashboard design',
    'Pending Task: API integration'
  ];

  constructor(private router: Router, private userService: UserService) {}

user?:IdentityUserDto;

  ngOnInit() {
    this.userService.getMyDetails().subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User details:', user);
      this.userName = user.userName;
      console.log('User details:', user);
      this.user = user
    })
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
