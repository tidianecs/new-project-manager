import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './layouts/auth/register/register.component';
import { LoginComponent } from './layouts/auth/login/login.component';
import { ProjectDashboardComponent } from './layouts/project-dashboard/project-dashboard.component';
import { TaskDashboardComponent } from './layouts/task-dashboard/task-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'project-dashboard', component: ProjectDashboardComponent },
  { path: 'task-dashboard/:projectId', component: TaskDashboardComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
