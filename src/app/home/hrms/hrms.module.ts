import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmsRoutingModule } from './hrms-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule } from '@angular/forms';

import { EmployeeeditComponent } from './employee/employeeedit/employeeedit.component';
import { EducationComponent } from './employee/employeeedit/education/education.component';
import { ProfessionalComponent } from './employee/employeeedit/professional/professional.component';
import { KyeComponent } from './employee/employeeedit/kye/kye.component';
import { ResignationComponent } from './employee/employeeedit/resignation/resignation.component';
import { DependentsComponent } from './employee/employeeedit/dependents/dependents.component';
import { BasicInfoComponent } from './employee/employeeedit/basic-info/basic-info.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipe } from 'ng2-search-filter';


@NgModule({
  declarations: [DashboardComponent, Ng2SearchPipe,EmployeeComponent,EmployeeeditComponent, BasicInfoComponent, EducationComponent, ProfessionalComponent, KyeComponent, ResignationComponent, DependentsComponent ],
  imports: [
    CommonModule,
    HrmsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    
  ]
})
export class HrmsModule { }
