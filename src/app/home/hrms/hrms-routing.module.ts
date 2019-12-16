import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeeditComponent } from './employee/employeeedit/employeeedit.component';

import { ProfessionalComponent } from './employee/employeeedit/professional/professional.component';
import { EducationComponent } from './employee/employeeedit/education/education.component';
import { KyeComponent } from './employee/employeeedit/kye/kye.component';
import { ResignationComponent } from './employee/employeeedit/resignation/resignation.component';
import { DependentsComponent } from './employee/employeeedit/dependents/dependents.component';
import { BasicInfoComponent } from './employee/employeeedit/basic-info/basic-info.component';




const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee', component: EmployeeComponent },
  {
    path: 'employee/employeeedit/:employee_Id', component: EmployeeeditComponent
    , children: [
      { path: '', redirectTo: 'basicInfo', pathMatch: 'full' },
      { path: 'basicInfo', component: BasicInfoComponent },
      { path: 'education', component: EducationComponent },
      { path: 'professional', component: ProfessionalComponent },
      { path: 'kye', component: KyeComponent },
      { path: 'resignation', component: ResignationComponent },
      { path: 'dependents', component: DependentsComponent }
    ]
  },
  {path:'employeeedit/:employee_Id', component: EmployeeeditComponent
  , children: [
    { path: '', redirectTo: 'basicInfo', pathMatch: 'full' },
    { path: 'basicInfo', component: BasicInfoComponent },
    { path: 'education', component: EducationComponent },
    { path: 'professional', component: ProfessionalComponent },
    { path: 'kye', component: KyeComponent },
    { path: 'resignation', component: ResignationComponent },
    { path: 'dependents', component: DependentsComponent }
  ]
},
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmsRoutingModule { }
