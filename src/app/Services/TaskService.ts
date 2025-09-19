import { HttpClient } from "@angular/common/http";
import {Injectable } from "@angular/core";
import { Observable } from "rxjs";

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

    private baseUrl = 'https://localhost:7069/api/UserTask';
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

        GetAllTaskByAdmin(): Observable<any> {
            const adminId = JSON.parse(localStorage.getItem('user') || '{}').id;
            return this.http.get(`${this.baseUrl}/get-task-admin/${adminId}`);
        }

        deleteTask(taskId: number): Observable<any> {
            return this.http.delete(`${this.baseUrl}/delete-task/${taskId}`);
        }
}