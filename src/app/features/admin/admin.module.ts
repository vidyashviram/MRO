import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { AppConfigComponent } from './app-config/app-config.component';
import { CustomerConfigComponent } from './customer-config/customer-config.component';
import { EmailConfigComponent } from './email-config/email-config.component';
import { UserConfigComponent } from './user-config/user-config.component';
import { SupplierConfigComponent } from './supplier-config/supplier-config.component';
import { PlantConfigComponent } from './plant-config/plant-config.component';
import { DbserverConfigComponent } from './dbserver-config/dbserver-config.component';
import { SmtpserverConfigComponent } from './smtpserver-config/smtpserver-config.component';
import { LdapConfigComponent } from './ldap-config/ldap-config.component';
import { EmailTemplateComponent } from './email-template/email-template.component';

@NgModule({
    declarations: [AdminComponent, DynamicTableComponent, AppConfigComponent, CustomerConfigComponent, EmailConfigComponent, UserConfigComponent, SupplierConfigComponent, PlantConfigComponent, DbserverConfigComponent, SmtpserverConfigComponent,LdapConfigComponent, EmailTemplateComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AdminRoutingModule,
    ],
  
  })
  export class AdminModule { }