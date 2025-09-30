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
import { ManageUsers } from './Pages/manage-users/manage-users';
import { MyTasks } from './Pages/my-tasks/my-tasks';
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'manage-users' },
      { path: 'manage-users', component: ManageUsers },
      { path: 'location-details', component: Details },
      { path: 'settings', component: Settings },
      { path: 'add-announcement', component: AddAnnouncements },
      { path: 'assign-tasks', component: AssignTask },
      { path: 'template', component: RichTextEditorComponent },
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboard,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'my-tasks' },
      { path: 'my-tasks', component: MyTasks },
      { path: 'settings', component: Settings },
      { path: 'location-details', component: Details },
    ]  
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
