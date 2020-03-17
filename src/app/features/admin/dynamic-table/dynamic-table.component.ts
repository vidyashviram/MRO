import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { Configuration } from 'src/app/config/app-settings.config';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styles: [':host {display:block;width: 100%;}'],
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
  @Input() tableData: {
    data: [],
    headData: []
  }[];
  @Input() tableFrom: string;
  @Output() showEdit = new EventEmitter();
  @Input() editable: boolean;
  @Input() deletable: boolean;
  @Input() updateRow: boolean;
  @Output() customerEvent = new EventEmitter();
  @Output() supplierEvent = new EventEmitter();
  getPage: any;
  getId: any;
  alert = sweetalert;

  cols: any = [];

  constructor(private Configuration: Configuration, private adminService: AdminService) { }

  ngOnInit() {
    this.formateDataForTable(this.tableData, this.tableFrom);
    this.getPage = this.tableFrom;
  }

  formateDataForTable(obj, from) {
    this.tableData = obj

    if (from == 'getUsersData') {
      this.cols = [
        { field: 'username', header: this.Configuration.userName },
        { field: 'roleName', header: this.Configuration.userRole },
        { field: 'email', header: this.Configuration.userEmail },
        { field: 'modifiedDate', header: this.Configuration.userCreateddate },
      ];
    }
    else if (from == 'getRoleData') {
      this.cols = [
        { field: 'roleName', header: this.Configuration.roleName },
        { field: 'modifiedDate', header: this.Configuration.userCreateddate },
      ];
    }
    else if (from == 'getPlantData') {
      this.cols = [
        { field: 'plantName', header: this.Configuration.plantName },
        { field: 'location', header: this.Configuration.plocation },
        { field: 'plantNum', header: this.Configuration.plantNum },
        { field: 'type', header: this.Configuration.ptype },
        { field: 'distributionchannel', header: this.Configuration.pdistributionchannel },
        { field: 'template', header: this.Configuration.pTemplate },
        { field: 'division', header: this.Configuration.pDivision },
        { field: 'salesorg', header: this.Configuration.pSalesOrg },
        { field: 'modifiedDate', header: this.Configuration.preceiveddate },
      ];
    }
    else if (from == 'getCustomersData') {
      this.cols = [
        { field: 'custName', header: this.Configuration.custName },
        { field: 'custNum', header: this.Configuration.custPo },
        { field: 'custPhone', header: this.Configuration.custPhone },
        { field: 'custEmail', header: this.Configuration.custEmail },
        { field: 'custAddress', header: this.Configuration.custAddress },
        { field: 'billTo', header: this.Configuration.billTo },
        { field: 'shipTo', header: this.Configuration.shipTo },
        { field: 'modifiedDate', header: this.Configuration.createdDate },
      ];
    }
    else if (from == 'getSupplierData') {
      this.cols = [
        { field: 'supplierName', header: this.Configuration.supplierName },
        { field: 'supplierPhone', header: this.Configuration.supplierPhone },
        { field: 'supplierEmail', header: this.Configuration.supplierEmail },
        { field: 'supplierAddress', header: this.Configuration.supplierAddress },
        { field: 'modifiedDate', header: this.Configuration.screatedDate },
      ];
    }
    else if (from == 'getSMTPServerData') {
      this.cols = [
        { field: 'userName', header: this.Configuration.smtpuserName },
        { field: 'smtpServer', header: this.Configuration.smtpsmtpServer },
        { field: 'connectionSecurity', header: this.Configuration.smtpconnectionSecurity },
        { field: 'authenticationMethod', header: this.Configuration.smtpauthenticationMethod },
        { field: 'port', header: this.Configuration.smtpport },
      ];
    }
    else if (from == 'getDBServerData') { 
      this.cols = [
        { field: 'userName', header: this.Configuration.dbuserName },
        { field: 'dataBaseName', header: this.Configuration.dbdataBaseName },
        { field: 'dbUrl', header: this.Configuration.dbdbUrl },
      ];
    }
    else if (from == 'getActiveDirServerData') {
      this.cols = [
        { field: 'serviceUserName', header: this.Configuration.ldapuserName },
        { field: 'protocol', header: this.Configuration.ldapProtocol },
        { field: 'domain', header: this.Configuration.ldapDomain },
        { field: 'host', header: this.Configuration.ldapHost },
      ];
    }
  }

  editRow(data) {
    this.showEdit.emit(data);
  }


  deleteRow(data) {
    console.log("check data " + JSON.stringify(data) + this.tableFrom)
    let status = data.active == true ? 'Inactive' : 'Active'
    if (this.tableFrom == 'getCustomersData') {
      this.adminService.deleteCustomerData(data.custid).subscribe(data => {
        if (data) {
          this.customerEvent.emit({ "tab": { "textLabel": "Customer Management" }, "index": 2 });
          this.loadCustData();
        }
      });
    } else if (this.tableFrom == 'getSupplierData') {
      this.adminService.deleteSupplierData(data.supplierId).subscribe(data => {
        if (data) {
          this.customerEvent.emit({ "tab": { "textLabel": "Supplier Management" }, "index": 3 });
          this.loadSuppData();
        }
      });
    } else if (this.tableFrom == 'getPlantData') {
      let status = data.active == true ? 'true' : 'false'
      this.adminService.deletePlantData(data.plantId, status).subscribe(data => {
        if (data) {
          this.customerEvent.emit({ "tab": { "textLabel": "Plant Configuration" }, "index": 5 });
          this.loadPlantData();
        }
      });
    } else if (this.tableFrom == 'getUsersData') {
      let status = data.active == true ? 'true' : 'false'
      this.adminService.deleteUserData(data.roleid, status).subscribe(data => {
        if (data) {
          this.customerEvent.emit({ "tab": { "textLabel": "User Management" }, "index": 0 });
          this.loadUserData();
        }
      });
    }
    else if (this.tableFrom == 'getRoleData') {
      let status = data.active == true ? 'true' : 'false'
      this.adminService.deleteRoleData(data.roleId, status).subscribe(data => {
        if (data) {
          this.customerEvent.emit({ "tab": { "textLabel": "Role Management" }, "index": 1 });
          this.loadRoleData();
        }
      });
    }
  }
  public loadCustData() {
    this.adminService.getCustomersData()
      .subscribe(res => {
        this.formateDataForTable(res, this.tableFrom);
        this.getPage = this.tableFrom;
      });
  }

  public loadSuppData() {
    this.adminService.getSupplierData()
      .subscribe(res => {
        this.formateDataForTable(res, this.tableFrom);
        this.getPage = this.tableFrom;
      });
  }

  public loadPlantData() {
    this.adminService.getPlantData()
      .subscribe(res => {
        this.formateDataForTable(res, this.tableFrom);
        this.getPage = this.tableFrom;
      });
  }

  public loadUserData() {
    this.adminService.getUsersData()
      .subscribe(res => {
        this.formateDataForTable(res, this.tableFrom);
        this.getPage = this.tableFrom;
      });
  }


  public loadRoleData() {
    this.adminService.getRoleData()
      .subscribe(res => {
        this.formateDataForTable(res, this.tableFrom);
        this.getPage = this.tableFrom;
      });
  }
}
