import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IdentityUserDto, UserService } from '../../Services/UserService';
import { AddAnnouncementService } from '../../Services/AnnouncementService';

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

  showNotifications = false;
  notifications: any[] = [];
  notificationCount = this.notifications.length;

  user?: IdentityUserDto;

  constructor(private router: Router, private userService: UserService,
    private anouncementService: AddAnnouncementService
  ) {}

  ngOnInit() {
    this.userService.getMyDetails().subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userName = user.userName;
      this.user = user;
    });

    this.getAllAnnouncements();
  }

  getAllAnnouncements() {
    this.anouncementService.GetAllAnnouncementsForUser().subscribe((res) => {
      console.log('announcements for user', res);
      this.notifications = res;
      this.notificationCount = this.notifications.length;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

 
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  clearNotifications() {
    this.notifications = [];
    this.notificationCount = 0;
    this.showNotifications = false;
  }

  markAllAsRead() {
   
    this.anouncementService.markAsRead().subscribe(() => {
     this.getAllAnnouncements();
      this.clearNotifications();
    });
  }
}
