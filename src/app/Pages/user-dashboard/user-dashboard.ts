import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AddAnnouncementService } from '../../Services/AnnouncementService';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { IdentityUserDto, UserService } from '../../Services/UserService';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css'],
  imports: [RouterModule,RouterLink, CommonModule, FontAwesomeModule]
})
export class UserDashboard implements OnInit {
  faBell = faBell;  
  showNotifications = false;
  notifications: any[] = [];
  notificationCount = this.notifications.length;
  userName = '';
  user?: IdentityUserDto;
  constructor(private router: Router, private anouncementService: AddAnnouncementService, private userService: UserService){}
  ngOnInit(): void {
    this.userService.getMyDetails().subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userName = user.userName;
      this.user = user;
    });

    this.getAllAnnouncements();
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
  getAllAnnouncements() {
    this.anouncementService.GetAllAnnouncementsForUser().subscribe((res) => {
      this.notifications = res;
            console.log('announcements for user', this.notifications);
      this.notificationCount = this.notifications.length;
    });
  }
    logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
