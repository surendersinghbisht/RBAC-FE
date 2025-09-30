import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityUserDto, UserService } from '../../Services/UserService';
import { AddAnnouncementService } from '../../Services/AnnouncementService';
import TaskService from '../../Services/TaskService';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiBot } from '../../component/ai-bot/ai-bot';

@Component({
  selector: 'app-my-tasks',
  imports: [CommonModule, FormsModule, AiBot],
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.css'
})
export class MyTasks implements OnInit {
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

  recentActivities: any[] = [];

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
      this.getAllTasks();
this.getAllAnnouncements();
this.getRecentActivities();
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

getAllTasks(){
  this.taskService.GetAllTaskByLoggedInuser().subscribe({
    next: (res) => {
      this.tasks = res; 
      console.log('res', res);
    },
    error: (err) => console.error('Error fetching tasks', err)
  })
}

getRecentActivities() {
  this.taskService.getRecentActivities().subscribe((res) => {
    this.recentActivities = res;
    console.log('recent activities', this.recentActivities);
  });
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
      this.getRecentActivities();
    });
  }

  getAllAnnouncements() {
    this.anouncementService.GetAllAnnouncementsForUser().subscribe((res) => {
      this.notifications = res;
            console.log('announcements for user', this.notifications);
      this.notificationCount = this.notifications.length;
    });
  }

 

 

}
