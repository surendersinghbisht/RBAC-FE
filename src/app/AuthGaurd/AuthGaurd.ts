import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRoles: string[] = JSON.parse(localStorage.getItem('roles') || '[]');
    const allowedRoles: string[] = route.data['roles'];


    if (allowedRoles && allowedRoles.some(r => userRoles.includes(r))) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
