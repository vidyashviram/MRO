
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DialogModule } from 'primeng/dialog';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        CalendarModule,
        TableModule,
        CardModule,
        DropdownModule,
        DialogModule,
        TabViewModule,
        ToggleButtonModule,
    ],
    exports: [
        CalendarModule,
        TableModule,
        CardModule,
        DropdownModule,
        DialogModule,
        TabViewModule,
        ToggleButtonModule,
    ]
})


export class PrimengModulesModule { }