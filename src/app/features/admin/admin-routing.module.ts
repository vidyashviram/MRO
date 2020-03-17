import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';

const routes: Routes = [{ path: '', component: AdminComponent },{
  path:'dynamictable',component:DynamicTableComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
