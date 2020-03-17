import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarrantyRoutingModule } from './warranty-routing.module';
import { WarrantyComponent } from './warranty.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [WarrantyComponent],
  imports: [
    CommonModule,
    WarrantyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    
  ]
})
export class WarrantyModule { }
