import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login';
import { TwoFactorAuthComponent } from './component/two-factor-auth/two-factor-auth';
import { Dashboard } from './Pages/dashboard/dashboard';
import { UserDashboard } from './Pages/user-dashboard/user-dashboard';
import { AuthGuard } from './AuthGaurd/AuthGaurd';
import { Register } from './Pages/register/register';
import { Settings } from './Pages/settings/settings';
import { Details } from './Pages/details/details';
import { AddAnnouncements } from './Pages/add-announcements/add-announcements';
import { AssignTask } from './Pages/assign-task/assign-task';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
path: 'settings',
component: Settings
  },
   {
        path: 'location-details',
        component: Details,
      },
  {
    path: 'two-factor-auth',
    component: TwoFactorAuthComponent
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }, 
  },
  {
    path: 'user-dashboard',
    component: UserDashboard,
    canActivate: [AuthGuard],
    data: { roles: ['User'] }  
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: Register
  },
  {
path: 'add-announcement',
component: AddAnnouncements
  },
  {
    path: 'assign-tasks',
    component: AssignTask
  },
  {
    path: 'template',
    component: RichTextEditorComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
