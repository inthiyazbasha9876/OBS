import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent,canActivate:[AuthGuard],children:[
    { path: 'hrms', loadChildren: () => import('./hrms/hrms.module').then(m =>m.HrmsModule ) },
    { path: 'tms', loadChildren: () => import('./timesheetmanagement/timesheetmanagement.module').then(m => m.TimesheetmanagementModule) },
    { path: 'psa', loadChildren: () => import('./psa/psa.module').then(m => m.PsaModule) },
  ] },
  { path: '**', component: HomeComponent },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
