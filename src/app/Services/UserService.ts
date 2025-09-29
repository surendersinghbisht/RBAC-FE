import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BASE_URL } from '../../api';

interface LoginRequest {
  Email: string;
  Password: string;
}

export interface LoginResponse {
    userId: string;
  email?: string;
  token?: string;
  message: string;
  success: boolean;
  twoFactorRequired?: boolean;
}

// identity-user.dto.ts
export interface IdentityUserDto {
  id: string;
  userName: string;
  email: string;
  role?: string;
}



@Injectable({
  providedIn: 'root'
})
export class UserService {

        private baseUrl = `${BASE_URL}/User`

  constructor(private http: HttpClient) { } 

  getAllUsers():Observable<LoginResponse[]>{
    return this.http.get<LoginResponse[]>(`${this.baseUrl}/all-users`);
  }

  // getLoggedInUser():Observable<LoginResponse[]>{
  //   return this.http.get<LoginResponse[]>(`${this.baseUrl}/logged-in-user`);
  // }

  getMyDetails():Observable<IdentityUserDto>{
    return this.http.get<IdentityUserDto>(`${this.baseUrl}/me`);
  }

  updateRoleForUser(userId: string, role: string):Observable<IdentityUserDto>{
    let updatedData = {
      userId: userId,
      newRole: role
    }
    return this.http.post<IdentityUserDto>(`${this.baseUrl}/update-role`, updatedData);
  }

}
