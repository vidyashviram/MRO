import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
//   MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule,MatSidenavModule,
//   MatListModule, MatTabsModule, MatGridListModule,MatFormFieldModule
// } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';




@ NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule
  ],
  exports: [
    CommonModule,
     MatToolbarModule,
     MatButtonModule,
     MatCardModule,
     MatInputModule,
     MatDialogModule,
     MatTableModule,
     MatMenuModule,
     MatIconModule,
     MatProgressSpinnerModule,
     MatSidenavModule,
     MatListModule,
     MatTabsModule,
     MatGridListModule,
     MatFormFieldModule
     ]
})
export class MaterialModulesModule { }
