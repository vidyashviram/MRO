import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesComponent } from './features.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
        {
          path: 'dashboard',
          loadChildren: () => import('../features/dashboard/dashboard.module').then(m => m.DashboardModule)
        },
        {
          path: 'workOrders',
          loadChildren: () => import('../features/work-orders/work-orders.module').then(m => m.WorkOrdersModule)
        },
        { 
          path: 'search',
         loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
        },
        { 
          path: 'warranty',
         loadChildren: () => import('./warranty/warranty.module').then(m => m.WarrantyModule)
        },
        { 
          path: 'admin',
         loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
        },
    ]
  },
  { path: 'warranty', loadChildren: () => import('./warranty/warranty.module').then(m => m.WarrantyModule) },
  

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
