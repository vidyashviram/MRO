import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'

  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'home',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
