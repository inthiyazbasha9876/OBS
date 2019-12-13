import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeeditComponent } from './employee/employeeedit/employeeedit.component';





const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee', component: EmployeeComponent}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmsRoutingModule { }
