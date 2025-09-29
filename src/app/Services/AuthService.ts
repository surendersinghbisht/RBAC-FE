import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
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
  roles?: string[];
}

interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
  exp: number;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

        private baseUrl = `${BASE_URL}/Auth`
  constructor(private http: HttpClient) { } 

  decodeToken(token: string):JwtPayload | null {
    try{
   return jwtDecode<JwtPayload>(token);
    }catch(error){
  console.error('Invalid token', error);
      return null;
    }
  }


 register(credentials: { userName: string; email: string; password: string }): Observable<any> {
  console.log('cre',credentials)
  return this.http.post<any>(`${this.baseUrl}/register`, credentials);
}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
  }

  validateOtp(code: string, userId: string): Observable<LoginResponse>{
    let requestedModel ={
      Code: code,
      UserId: userId
    }
   return this.http.post<LoginResponse>(`${this.baseUrl}/verify-2fa`, requestedModel);
  }

  enable2FA(email: string, enable: boolean): Observable<any> {
    let enable2FARequest = {
      email,
      enable
    };
    return this.http.post<any>(`${this.baseUrl}/enable-2fa`, enable2FARequest);
  }
}
