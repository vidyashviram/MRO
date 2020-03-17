import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [DatePipe]

})
export class SearchComponent implements OnInit {

 

  // Filter Fields
  public masterData: any;
  public customerData: any;
  public statusData: any;
  public distributionChannelData: any;

  dateTime = new Date();
  fromDate: Date = new Date();
  toDate: Date = new Date();

  dashboardFilterForm: FormGroup;
  dashboardRequests: any[];

  ClassificationList: SelectItem[];
  StatusList: SelectItem[];
  MaterialList: SelectItem[];
  CustomerList: SelectItem[];
  WorkOrdersList: SelectItem[];
  PartList: SelectItem[];
  PartNameList: SelectItem[];

  //Table Fields
  tableData: any;
  loadTable: boolean = false;
  loadNoData: boolean = false;
  disableBtn: boolean = false;


  cols: any;
  alert = sweetalert;

  constructor(private formBuilder: FormBuilder, private dashboardService: SearchService,private datePipe: DatePipe ) { }



  ngOnInit() {
    this.initialiseDropdoown();
    this.initialiseDropdownApi();
    this.initialiseTableCols();
    this.dashboardFilterForm = this.formBuilder.group({
      workOrderId: '0',
      custId: '',
      gateStatus: '0',
      partNum: '0',
      partName: '0',
      materialId: '',
      distributionChannelId: '0',
      fromDate: '',
      toDate: '',
    });


  }

  initialiseDropdoown() {
    this.ClassificationList = [
      { label: 'Select', value: '0' }
    ];
    this.StatusList = [
      { label: 'Select', value: '0' }
    ]
    this.MaterialList = [
      { label: 'Select', value: '' }
    ]

    this.CustomerList = [
      { label: 'Select', value: '' }
    ];
    this.WorkOrdersList = [
      { label: 'Select', value: '0' },
    ]

    this.PartNameList = [
      { label: 'Select', value: '0' }
    ]

    this.PartList = [
      { label: 'Select', value: '0' }
    ]
  }


  initialiseDropdownApi() {

    this.dashboardService.getDropdownWorkorder().subscribe(res => {
      this.masterData = res;

      this.masterData.workOrdersList.forEach(item => {
        let workOrder = {
          label: item.workOrderId,
          value: item.workOrderId
        };
        this.WorkOrdersList.push(workOrder);
      })
    });

    this.dashboardService.getDropdownCustomer().subscribe(res => {

      this.customerData = res;

      this.customerData.customersList.forEach(item => {
        let customer = {
          label: item.custName,
          value: item.custName
        };
        this.CustomerList.push(customer);
      });
    });

    this.dashboardService.getDropdownPartName().subscribe(res => {

      this.masterData = res;

      this.masterData.partNames.forEach(item => {
        let partName = {
          label: item.partName,
          value: item.partId
        };
        this.PartNameList.push(partName);
      });
    });


    this.dashboardService.getDropdownPartNumber().subscribe(res => {
      this.masterData = res;

      this.masterData.partList.forEach(item => {
        let partNumber = {
          label: item.partNum,
          value: item.partId
        };
        this.PartList.push(partNumber);
      });

    });

    this.dashboardService.getDropdownStatus().subscribe(res => {
      this.statusData = res;

      this.statusData.workStatusList.forEach(item => {
        let status = {
          label: item.statusDesc,
          value: item.statusId
        };
        this.StatusList.push(status);
      });
    });

    this.dashboardService.getDropdownMaterial().subscribe(res => {
      this.masterData = res;

      this.masterData.materialList.forEach(item => {
        let material = {
          label: item.materialName,
          value: item.materialName
        };
        this.MaterialList.push(material);
      });
    });

    this.dashboardService.getDropdownDistributionChannel().subscribe(res => {
      this.distributionChannelData = res;

      this.distributionChannelData.distChannelList.forEach(item => {
        let classification = {
          label: item.distributionChannel,
          value: item.distributionChannel
        };
        this.ClassificationList.push(classification);
      });
    });

  }


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


  /**
  * submit search for OrderId, Customer, Status,Partnumber, Partname, Classification,FromDate, ToDate,
  */
  submitSearch() {
    this.validatatingFilter();
  }

  validatatingFilter() {
    this.loadTableData();
  }

  loadTableData(){
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



}
