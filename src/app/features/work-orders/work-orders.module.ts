import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { WorkOrdersComponent } from './work-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkOrderCommonFormComponent } from './work-order-common-form/work-order-common-form.component';
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component';
import { ReceivingComponent } from './receiving/receiving.component';
import { CustomerComponent } from './customer/customer.component';
import { MaterialComponent } from './material/material.component';
import { WarrantyComponent } from './warranty/warranty.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';
import { AircraftDispositionComponent } from './aircraft-disposition/aircraft-disposition.component';
import { SpecialInstructionsComponent } from './special-instructions/special-instructions.component';
import { WarrantyDetailsComponent } from './warranty-details/warranty-details.component';
import { WorkOrderTableComponent } from './work-order-table/work-order-table.component';
import { WorkOrderRepairComponent } from './work-order-repair/work-order-repair.component';


@NgModule({
  declarations: [WorkOrdersComponent, WorkOrderCommonFormComponent, WorkOrderDetailsComponent, ReceivingComponent, CustomerComponent, MaterialComponent, WarrantyComponent,  MaterialDetailsComponent, AircraftDispositionComponent, SpecialInstructionsComponent, WarrantyDetailsComponent, WorkOrderTableComponent, WorkOrderRepairComponent],
  imports: [
    CommonModule,
    SharedModule,
    WorkOrdersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    WorkOrdersComponent,
    WorkOrderCommonFormComponent,
    WorkOrderDetailsComponent,
    ReceivingComponent,
    CustomerComponent,
    MaterialComponent,
    WarrantyComponent,
    MaterialDetailsComponent,
    AircraftDispositionComponent,
    SpecialInstructionsComponent,
    WarrantyDetailsComponent







  ]
})
export class WorkOrdersModule { }
