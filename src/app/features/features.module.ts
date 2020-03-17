import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SearchModule } from './search/search.module';
import { WorkOrdersModule } from './work-orders/work-orders.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WarrantyModule } from './warranty/warranty.module';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [FeaturesComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardModule,
    SearchModule,
    WorkOrdersModule,
    WarrantyModule,
    FeaturesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    ToastrModule.forRoot({    /*to avoid duplicate toast in prmieng toaster */
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class FeaturesModule { }
