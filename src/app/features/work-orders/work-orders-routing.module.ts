import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkOrdersComponent } from './work-orders.component';
import { WorkOrderDetailsComponent } from './work-order-details/work-order-details.component';
import { WorkOrderTableComponent } from './work-order-table/work-order-table.component';
import { WorkOrderRepairComponent } from './work-order-repair/work-order-repair.component';

const routes: Routes = [
  { path: 'workorder', component: WorkOrdersComponent },
  {path:'workorder-details', component:WorkOrderDetailsComponent},
  {path:'workorder-table', component:WorkOrderTableComponent},
  {path:'workorder-repair',component:WorkOrderRepairComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrdersRoutingModule { }
