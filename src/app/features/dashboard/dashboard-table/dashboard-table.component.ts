import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent implements OnInit {

  tableData: any;
  loadTable: boolean = false;
  loadNoData: boolean = false;
  dashboardTableRequests: any[];
  cols:any

  title = sessionStorage.getItem("title");
  getId = sessionStorage.getItem("id");

  constructor(private dashboardService: DashboardService, ) { }


  initialiseTableCols() {
    this.cols = [
      { field: 'workOrderId', header: 'Order Id' },
      { field: 'createdOn', header: 'Created On' },
      { field: 'gateStatus', header: 'Status' },
      { field: 'partName', header: 'Part Name' },
      { field: 'priority', header: 'Priority' },
      { field: 'customerName', header: 'Customer Name' },
      { field: 'partNum', header: 'Part Number' },
      // { field: 'materialType', header: 'Material Type' },
      // { field: 'classification', header: ' Classification' },
      // { field: 'redflag', header: ' Red Flag' },
      // { field: 'action', header: ' Action' }
    ];
  }


  loadDashBoardTable(getId) {
    
    this.dashboardService.getdashboardTableData(getId)
      .subscribe(res => {
       
        // this.displayLoading = false;
        if (res == '') {
          this.loadTable = false;
          this.loadNoData = true;
        } else {
          this.dashboardTableRequests = res;
          this.loadTable = true;
          this.loadNoData = false;
          this.tableData = this.dashboardTableRequests;
        }
      }, error => {
        this.loadTable = false;
        this.loadNoData = true;
        this.displayFailureAlert();
      });

  }

  displayFailureAlert() {
    sweetalert("Failed performing the operation", {
      icon: "warning",
    });
    // this.displayLoading = false;
  }

  ngOnInit() {
    this.initialiseTableCols()
    this.loadDashBoardTable(this.getId);
  }

}
