import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetmanagementRoutingModule } from './timesheetmanagement-routing.module';
import { TimesheetmanagementComponent } from './timesheetmanagement.component';


@NgModule({
  declarations: [TimesheetmanagementComponent],
  imports: [
    CommonModule,
    TimesheetmanagementRoutingModule
  ]
})
export class TimesheetmanagementModule { }
