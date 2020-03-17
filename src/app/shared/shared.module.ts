import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DataTableComponent } from './data-table/data-table.component';
import { PrimengModulesModule } from './primeng-modules';
import { MaterialModulesModule } from './material-module';
import { PageHeaderComponent } from './page-header/page-header.component';



@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SideNavComponent, 
    DataTableComponent, PageHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    HeaderComponent, 
    FooterComponent,
    SideNavComponent,
    DataTableComponent,
    PageHeaderComponent,
    PrimengModulesModule,
    MaterialModulesModule
  ]
})
export class SharedModule { }
