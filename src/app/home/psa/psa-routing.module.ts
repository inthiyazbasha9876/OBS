import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsaComponent } from './psa.component';

const routes: Routes = [{ path: '', component: PsaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsaRoutingModule { }
