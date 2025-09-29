import { HttpClient } from "@angular/common/http";
import {Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../../api";

export interface Task {
Title: string;
Description :string;
AssignedById:number;
AssignedToId:number;
DueDate:Date;
}

@Injectable({
  providedIn: 'root'
})

export default class TaskService {

  private baseUrl = `${BASE_URL}/UserTask`;
        constructor(private http: HttpClient) { }

        addTask(data: any): Observable<any> {
            const userId = JSON.parse(localStorage.getItem('user') || '{}').id;

            let taskData: Task ={
            Title: data.title,
            Description : data.description,
            AssignedById: userId,
            AssignedToId: data.assignedTo,
            DueDate: data.dueDate
            }
            console.log('asdasdasda',taskData);
            return this.http.post(`${this.baseUrl}/create-task`, taskData);
        }

        GetAllTaskByLoggedInuser(): Observable<any> {
            const loggenInUserId = JSON.parse(localStorage.getItem('user') || '{}').id;
            return this.http.get(`${this.baseUrl}/get-tasks/${loggenInUserId}`);
        }

        deleteTask(taskId: number): Observable<any> {
            return this.http.delete(`${this.baseUrl}/delete-task/${taskId}`);
        }

        updateTask(editedData: any):Observable<any> {
            let data = {
                taskId: editedData.taskId,
                assignedToId: editedData.assignedTo,
                dueDate: editedData.dueDate,
                title: editedData.title,
                description: editedData.description
            }
            console.log(editedData)
         return this.http.put(`${this.baseUrl}/edit-task`, data);
}

getTasksByStatus(status: string): Observable<any> {

  const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
  return this.http.get(`${this.baseUrl}/user-tasks-by-status`,{
    params: {
       userId,       
       status
    }
  });
}

updateStatus(taskId: number, status: string): Observable<any> {
 const statusMap: any = { 'Pending': 0, 'Done': 2, 'Working': 1 };
  console.log('status', status, taskId);
  let data = {
   taskId,
  status: statusMap[status]
  }
  return this.http.put(`${this.baseUrl}/update-task-status`, data);
}

getRecentActivities(): Observable<any> {
  const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
  return this.http.get(`${this.baseUrl}/recent-activities/${userId}`);
}
}