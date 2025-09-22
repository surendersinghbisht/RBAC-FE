import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IdentityUserDto, UserService } from '../../Services/UserService';
import { AddAnnouncementService } from '../../Services/AnnouncementService';
import TaskService from '../../Services/TaskService';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css'],
  imports: [CommonModule, RouterLink, FormsModule, FontAwesomeModule]
})
export class UserDashboard implements OnInit {
   faBell = faBell;
  userName = '';
  totalTasks = 12;
  workingTasks:any[] = [];
  pendingTasks: any[] = [];
  completedtasks: any[] = [];
  tasks: any[] = [];
  task = {
  taskId: '',
  status:'Pending'
};

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
    private anouncementService: AddAnnouncementService,
    private taskService: TaskService
  ) {}

  mapStatus(status: number): string {
  switch (status) {
    case 0: return 'Pending';
    case 1: return 'Working';
    case 2: return 'Done';
    default: return 'Pending';
  }}

  ngOnInit() {
    this.taskService.GetAllTaskByLoggedInuser().subscribe({
      next: (res) => {
        console.log('res', res);
        this.tasks = res; 
      }
    })
this.getAllAnnouncements();

    this.userService.getMyDetails().subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userName = user.userName;
      this.user = user;
    });
this.getTasks();
    
  }
  getStatusClass(status: string) {
  switch (status) {
    case 'Done':
      return 'task-done';
    case 'Working':
      return 'task-working';
    case 'Pending':
      return 'task-pending';
    default:
      return '';
  }
}


  getTasks(){
    
  this.taskService.getTasksByStatus('Pending').subscribe((res:any[]) => {
    this.pendingTasks =  res.map((task: any) =>({
...task, status: this.mapStatus(task.status)
    }))
      console.log('pending tasks', this.pendingTasks);
    });

this.taskService.getTasksByStatus('Done').subscribe((res) => {
this.completedtasks = res.map((task:any)=> ({
  ...task, status: this.mapStatus(task.status)
}));  
console.log('completed tasks', this.completedtasks);
    });

    this.taskService.getTasksByStatus('Working').subscribe((res) => {
      console.log('working tasks', res);
      this.workingTasks = res.map((task:any)=> ({
  ...task, status: this.mapStatus(task.status)
}));  
console.log('working tasks', this.workingTasks);
    });
  }

  onStatusChange(task: any) {
    this.taskService.updateStatus(task.taskId, task.status).subscribe(() => {
      this.getTasks();
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
