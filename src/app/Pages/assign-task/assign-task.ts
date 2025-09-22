import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { UserService } from '../../Services/UserService';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import TaskService from '../../Services/TaskService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
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
@ViewChild('formcontainer', { static: false })
formcontainer!: ElementRef;
isEdited:boolean = false;
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
      assignedTo: ['', [Validators.required]],
      taskId: [0]
    });
    
  this.userservice.getAllUsers().subscribe((res) => {
    this.users = res;
    console.log('all users', this.users);
  } );

this.getAllTasksByAdmin();

}

getAllTasksByAdmin() {
  this.taskService.GetAllTaskByLoggedInuser().subscribe({
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
  this.isEdited = true;
  this.form.patchValue({
      taskId: task.taskId,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      assignedTo: task.assignedToId
  });
   setTimeout(() => {
    this.formcontainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

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

updateTask(){
  console.log(this.form.value);
  this.taskService.updateTask(this.form.value).subscribe({
    next: (res) => {
      this.showSnack("Task updated successfully", "success");
      this.isEdited = false;
      this.form.reset();
      this.getAllTasksByAdmin();
    },
    error: (err) => console.error(err)
  })
}

}

