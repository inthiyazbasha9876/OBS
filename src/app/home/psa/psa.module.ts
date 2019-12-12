import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsaRoutingModule } from './psa-routing.module';
import { PsaComponent } from './psa.component';


@NgModule({
  declarations: [PsaComponent],
  imports: [
    CommonModule,
    PsaRoutingModule
  ]
})
export class PsaModule { }
