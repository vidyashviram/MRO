import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { items } from 'src/assets/admin/data/adminData';
import { AdminService } from 'src/app/core/services/admin.service';
import { CustomerConfigComponent } from './customer-config/customer-config.component';
declare var require: any;
let sweetalert = require('sweetalert');
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [':host {display:block;width: 100%;}'],
  styleUrls: ['./admin.component.css'],
  providers: [MessageService]
})
export class AdminComponent implements OnInit {
  @ViewChild(CustomerConfigComponent, { static: false }) child: CustomerConfigComponent;
  pageTitle = "Administrator";
  alert = sweetalert;
  items = items;
  tableData: any;
  tableFrom: string;
  display: boolean = false;
  addUser: boolean = false;
  addSupplier: boolean = false;
  addEmail: boolean = false;
  loadTable: boolean = false;
  editDialog: any;
  editRowData: any;
  editRow: boolean;
  tabIndex = 0;
  formData: any;
  addCustomerBtn: boolean = false;
  addUserBtn: boolean = false;
  addPlantBtn: boolean = false;
  addSupplierrBtn: boolean = false;
  addRoleBtn: boolean = false;
  popupTitle = "Customer";

  //Adding roles form details...
  customerForm: FormGroup;

  fieldsArr: any = [
    { "label": "Role Name", "type": "text", "control": "roleName" },
  ]
  //Adding roles form detailsends here..
  dataIndex: any;
  addCustomer: boolean;
  public displayLoading: boolean = false;
  addRole: any;
  roleForm: FormGroup;
  addPlant: any;

  constructor(private adminServ: AdminService, private router: Router,
    private route: ActivatedRoute, private fb: FormBuilder,  private toastr: ToastrService) { }

  ngOnInit() {
    this.tabIndex = Number(this.route.snapshot.paramMap.get('id'));
    if (this.tabIndex || this.tabIndex == 0) {
      let evt: any = { "tab": { "textLabel": items[this.tabIndex]['label'] } };
      this.onTabChanged(evt);
    }
  }

  onTabChanged(evt) {
    // this.displayLoading = true;
    this.editDialog = false;
    this.addUser = false;
    this.addCustomer = false;
    this.addRole = false;
    this.addSupplier = false;
    this.addEmail = false;
    this.addPlant = false;
    // if(evt.index)
    //      this.tabIndex= evt.index;
    if (evt.index == 0) {
      this.tabIndex = 0;
    } else {
      this.tabIndex = evt.index;
    }
    if (evt.tab.textLabel == "User Management") {
      this.addUser = false;
      this.editDialog = false;
      this.popupTitle = "User";
      if (!evt.tab.cancel)
        this.getTabData('getUsersData', 0);
    } else if (evt.tab.textLabel == "Role Management") {
      this.addRole = false;
      this.editDialog = false;
      this.popupTitle = "Role";
      if (!evt.tab.cancel)
        this.getTabData('getRoleData', 1);
    } else if (evt.tab.textLabel == "Customer Management") {
      this.addCustomer = false;
      this.editDialog = false;
      this.popupTitle = "Customer";
      if (!evt.tab.cancel)
        this.getTabData('getCustomersData', 2);
    } else if (evt.tab.textLabel == "Supplier Management") {
      this.addSupplier = false;
      this.editDialog = false;
      this.popupTitle = "Supplier";
      if (!evt.tab.cancel)
        this.getTabData('getSupplierData', 3);
    } else if (evt.tab.textLabel == "Application Configuration") {
      //this.addUser=false;
      this.displayLoading = false
    } else if (evt.tab.textLabel == "Mail Template Configuration") {
      this.addEmail = false;
      this.editDialog = false;
      this.popupTitle = "Email";
      if (!evt.tab.cancel)
        this.getTabData('getEmailData', 6);
    }
    else if (evt.tab.textLabel == "Plant Configuration") {
      this.addPlant = false;
      this.editDialog = false;
      this.popupTitle = "Plant";
      if (!evt.tab.cancel)
        this.getTabData('getPlantData', 4);
    }
  }

  showDialog(action) {
    this.displayLoading = false;
    this.editRow = false;
    if (this.display && action == "mailTemp") {
      this.display = false;
    } else if (action == "mailTemp") {
      this.display = true;
    } else if (!this.addUser && action == "addUser") {
      this.addUser = true;
    } else if (!this.addRole && action == "addRole") {
      this.createForm();
      if (this.roleForm)
        this.roleForm.reset();
      this.addRole = true;
    } else if (!this.addCustomer && action == "addCustomer") {
      this.addCustomer = true;
    } else if (action == "addSupplier") {
      this.addSupplier = true;
    } else if (action == "addPlant") {
      this.addPlant = true;
    } else if (action == "addEmail") {
      this.addEmail = true;
      // this.router.navigate(['home/plantConf',5])
    }
  }

  getTabData(funName, from) {
    this.loadTable = false;
    this.displayLoading = false
    this.adminServ[funName]().subscribe(data => {
      this.tableData = data;
      this.tableFrom = funName;

      if (from == 0) {
        this.addUserBtn = true;
      } else if (from == 1) {
        this.addRoleBtn = true;
      } else if (from == 2) {
        this.addCustomerBtn = true;
      } else if (from == 3) {
        this.addSupplierrBtn = true;
      } else if (from == 4) {
        this.addPlantBtn = true;
      }
    },
      error => {
        console.log(error);
        this.displayLoading = false;
        this.alert("Failed performing the operation", {
          icon: "warning",
        });

        if (from == 0) {
          this.addUserBtn = false;
        } else if (from == 1) {
          this.addRoleBtn = false;
        } else if (from == 2) {
          this.addCustomerBtn = false;
        } else if (from == 3) {
          this.addSupplierrBtn = false;
        } else if (from == 4) {
          this.addPlantBtn = false;
        }
      },
      () => {
        this.loadTable = true;
      }
    )
  }

  showEditDialog(data) {
    this.editRow = true;
    if (!this.addUser && (this.tabIndex == undefined || this.tabIndex == 0)) {
      this.editRowData = data;
      this.addUser = true;
    } else if (!this.addRole && this.tabIndex == 1) {
      this.editRowData = data;
      this.createForm();
      this.addRole = true;
    } else if (!this.addCustomer && this.tabIndex == 2) {
      this.editRowData = data;
      this.addCustomer = true;
    } else if (!this.addSupplier && this.tabIndex == 3) {
      this.editRowData = data;
      this.addSupplier = true;
    } else if (!this.addPlant && this.tabIndex == 5) {
      this.editRowData = data;
      this.addPlant = true;
    } else if (!this.addEmail && this.tabIndex == 6) {
      this.editRowData = data;
      console.log("check row data " + JSON.stringify(this.editRowData))
      this.addEmail = true;
    }
    //  if(this.editDialog)
    //  this.editDialog=false;
    //  else
    //  this.editDialog=true;

  }

  onSelect(index): void {
    let str = 'template' + index + 'Data';
    this.adminServ.setListData(this[str]);
  }


  //Role Form Creation...
  createForm() {
    this.roleForm = this.fb.group({
      roleName: [this.editRowData ? this.editRowData.roleName : '', [Validators.required]]
    });

  }

  cretaeRole() {
    this.addRole = true;
    var regexp = new RegExp('^[A-Za-z0-9]*$');
    var specialChar = regexp.test(this.roleForm.get("roleName").value);

    if (this.roleForm.get("roleName").value === null || this.roleForm.get("roleName").value === '') {
      this.toastr.warning("Fields cannot be Empty")
    } else if (!specialChar) {
      this.toastr.warning("Special Character is not allowed");
    }
    else {
      if (this.editRow == true) {
        this.formData = {
          "roleName": this.roleForm.get("roleName").value,
          "roleId": this.editRowData.roleId
        }
      } else {
        this.formData = {
          "roleName": this.roleForm.get("roleName").value,
          //"roleId": this.tableData.roleId
        }
      }

      this.adminServ.addRoleData(this.formData)
        .subscribe(res => {
          //this.displayLoading = false;
          if (res[0]['message'] != null && res[0]['message'] == 'Success') {
            this.displaySuccessAlert();
          }
          else {
            this.displayFailureAlert();
          }
        }, error => {
          this.displayFailureAlert();
        });
      this.addRole = false;
    }
  }

  displaySuccessAlert() {
    sweetalert("Created", {
      title: "Role Data",
      text: "Role Data has been created successfully.",
      icon: "success",
    });

    let evt: any = { "tab": { "textLabel": "Role Management" }, "index": 1 };
    this.onTabChanged(evt);

    // this.displayLoading = false;
    // this.customerEvent.emit({ "tab": { "textLabel": "Role Management" }, "index": 1 });
  }

  displayFailureAlert() {
    sweetalert("Failed", {
      title: "Role Data",
      text: "Error in creating the Role Data. Please try again later.",
      icon: "warning",
    });
    //this.displayLoading = false;
  }

  cancelRole() {
    this.addRole = false;
  }

}
