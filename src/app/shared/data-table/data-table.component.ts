import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/core/services/search.service';
declare var require: any;
let sweetalert = require('sweetalert');


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor( private dashboardService: SearchService,private datePipe: DatePipe) { }

  @Input() dashboardFilterForm:FormGroup;
  dashboardRequests: any[];

  tableData: any;
  loadTable: boolean = false;
  loadNoData: boolean = false;
  disableBtn: boolean = false;
 

  cols: any;
  alert = sweetalert;


  initialiseTableCols() {
    this.cols = [
      { field: 'workOrderId', header: 'Order Id' },
      { field: 'createdOn', header: 'Created On' },
      { field: 'gateStatus', header: 'Status' },
      { field: 'partName', header: 'Part Name' },
      { field: 'priority', header: 'Priority' },
      { field: 'customerName', header: 'Customer Name' },
      { field: 'partNum', header: 'Part Number' },
      { field: 'materialType', header: 'Material Type' },
      { field: 'classification', header: ' Classification' },
      // { field: 'redflag', header: ' Red Flag' },
      // { field: 'action', header: ' Action' }
    ];
  }

  loadTableData() {
    this.tableData = {


      "workOrderFilter": {

        //          "workOrderId" : "",
        //         "custName" : "",
        //         "gateStatus" : "0",
        //         "partNum" : "0",
        //         "partName" : "0",
        //         "material" : "",
        //         "distributionChannelId" : "",
        //         "fromDate" : "2020-02-25 00:00:00" ,
        //         "toDate" : "2020-03-28 00:00:00" 
        "workOrderId": this.dashboardFilterForm.get("workOrderId").value,
        "custName": this.dashboardFilterForm.get("custId").value,
        "gateStatus": this.dashboardFilterForm.get("gateStatus").value,
        "partNum": this.dashboardFilterForm.get("partNum").value,
        "partName": this.dashboardFilterForm.get("partName").value,
        "material": this.dashboardFilterForm.get("materialId").value,
        "distributionChannelId": this.dashboardFilterForm.get("distributionChannelId").value,
        "fromDate": this.datePipe.transform(this.dashboardFilterForm.get("fromDate").value, 'yyyy-MM-dd HH:mm:ss'),
        "toDate": this.datePipe.transform(this.dashboardFilterForm.get("toDate").value, 'yyyy-MM-dd HH:mm:ss')
      }
    }

    this.dashboardService.getdashboardSearchData(this.tableData).subscribe(res => {
      console.log(res)
      if (res == '') {
        this.loadTable = false;
        this.loadNoData = true;
        // this.alert("No data found", {
        //   icon: "warning",
        // });
      } else {
        this.dashboardRequests = res;
        this.loadTable = true;
        this.loadNoData = false;
        this.tableData = this.dashboardRequests;
      }
    }, error => {
      this.loadTable = false;
      this.loadNoData = true;

      this.alert("Failed performing the operation", {
        icon: "warning",
      });
    });
  }

  ngOnInit() {
    this.initialiseTableCols();
  }

}
