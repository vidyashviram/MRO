import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModulesModule } from 'src/app/shared/material-module';
import { DashboardTableComponent } from './dashboard-table/dashboard-table.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DashboardComponent, DashboardTableComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // MaterialModulesModule,
    SharedModule
  ],
  exports:[DashboardComponent],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule { }
