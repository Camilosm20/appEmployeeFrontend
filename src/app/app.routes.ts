// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'add-employee', component: EmployeeFormComponent },
  { path: 'edit-employee/:id', component: EmployeeFormComponent },
  { path: '**', redirectTo: '/employee' }
];