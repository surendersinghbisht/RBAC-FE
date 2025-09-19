import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/UserService';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import TaskService from '../../Services/TaskService';
import { MatSnackBar } from '@angular/material/snack-bar';
export enum TaskStatus {
  Pending = 0,
  Done = 1,
  Working = 2
}

@Component({
  selector: 'app-assign-task',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './assign-task.html',
  styleUrl: './assign-task.css'
})
export class AssignTask implements OnInit {
  TaskStatus = TaskStatus;
assignedTasks: any[] = [];
users: any[] = [];
form! :FormGroup;
constructor(private userservice: UserService,
  private fb: FormBuilder,
  private taskService: TaskService,
  private snackBar: MatSnackBar
) {

}


  showSnack(message: string, type: 'success' | 'error' | 'delete') {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: [`${type}-snackbar`]
  });
}

ngOnInit() {
   this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: [''],
      assignedTo: ['', [Validators.required]]
    });
    
  this.userservice.getAllUsers().subscribe((res) => {
    this.users = res;
    console.log('all users', this.users);
  } );

this.getAllTasksByAdmin();

}

getAllTasksByAdmin() {
  this.taskService.GetAllTaskByAdmin().subscribe({
    next: (res) => {
      console.log('res', res);
      this.assignedTasks = res;
    },
    error: (err) => console.error(err)
  })
}

assignTask() {
   if (this.form.invalid) return;
  console.log('form value', this.form.value);
this.taskService.addTask(this.form.value).subscribe((res) => {
  this.showSnack("Task assigned successfully", "success");
  this.form.reset();
  this.getAllTasksByAdmin();
});
}

editTask(task:any){
  this.form.patchValue({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      assignedTo: task.assignedToId
  });
   console.log('form value', this.form.value);
}

deleteTask(taskId: number) {
  this.taskService.deleteTask(taskId).subscribe({
    next: (res) => {
      this.showSnack("Task deleted successfully", "delete");
      this.getAllTasksByAdmin();
    },
    error: (err) => console.error(err)
  })
}
}

