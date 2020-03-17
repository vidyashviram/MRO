import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { MaterialModulesModule } from './shared/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CoreModule } from './core/core.module';
import { Configuration } from './config/app-settings.config';
import { SearchService } from './core/services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DashboardService } from './core/services/dashboard.service';
import { AdminService } from './core/services/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModulesModule,
    BrowserAnimationsModule,
   
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [Configuration, SearchService,DashboardService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
