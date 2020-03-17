import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css'],
})
export class UserConfigComponent implements OnInit {
  @Output() customerEvent = new EventEmitter();
  @Input() rowData: any;
  @Input() updateRow: boolean;
  title: "User Details";
  userForm: FormGroup;
  displayLoading: boolean = false;
  formData: any;
  fieldsArr: any;
  userRoleList: SelectItem[];
  public dropdownData: any;
  public roleIdSelected: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.updateRow == false) {
      this.rowData = [];
    }
    this.initialiseDropdown();
    if (this.updateRow == true) {
      this.roleIdSelected = this.rowData.roleName;
    }
    this.createForm();
    this.fieldsArr = [
      { "label": "User Name", "type": "text", "control": "username" },
      { "label": "Email", "type": "text", "control": "email" },
      { "label": "Role", "type": "select", "control": "roleName", "options": this.userRoleList }
      // { "label": "User Role", "type": "select", "control": "roleName", options: [{ "label": "Select", "value": "0" }, {"label": "CSR", "value": 1 }, { "value": 2, "label": "Techinican" }, {  "label": "Engineer","value": 3 }, {  "label": "VSM", "value": 4 }, { "label": "Trainer" ,  "value": 7}, {  "label": "Trainer","value": 8 }, { "label": "Trainer2","value": 9 }, {  "label": "Trainer3" ,"value": 10}, { "label": "Trainer", "value": 14 }] },
    ]
  }

  initialiseDropdown() {
    this.userRoleList = [
      { label: "Select", value: "0" }
    ];

    this.adminService.getUserDropdown().subscribe(res => {
      console.log("check role " + JSON.stringify(res))
      this.dropdownData = res[0];
      this.dropdownData.roleList.forEach(item => {
        let userRole = {
          label: item.roleName,
          value: item.roleId
        };
        this.userRoleList.push(userRole);
      });
    });
  }

  createForm() {
    this.userForm = this.fb.group({
      username: [this.rowData ? this.rowData.username : '', [Validators.required, Validators.minLength(2)]],
      email: [this.rowData ? this.rowData.email : '', [Validators.required, Validators.email]],
      roleName: [this.rowData ? this.rowData.roleName : '', [Validators.required]],
    });
  }

  onSubmit() {
    var regexp = new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$');
    var regexSpecialChar = new RegExp('^[A-Za-z0-9]*$');
    var serchfind = regexp.test(this.userForm.get("email").value);
    var specialChar = (regexSpecialChar.test(this.userForm.get("username").value));
    console.log("check data " + this.userForm.get("roleName").value)
    if (this.userForm.get("username").value === null || this.userForm.get("username").value === '' ||
      this.userForm.get("email").value === null || this.userForm.get("email").value === '') {
      this.toastr.warning("Fields cannot be Empty")
    } else if (this.userForm.get("roleName").value === undefined || this.userForm.get("roleName").value == 0) {
      this.toastr.warning("Please Select Dropdown")
    } else if (!serchfind) {
      this.toastr.warning("Enter Valid email");
    } else if (!specialChar) {
      this.toastr.warning("Special Character is not allowed");
    }
    else {
      if (this.updateRow == true) {
        this.formData = {
          "userName": this.userForm.get("username").value,
          "userRole": {
            "roleId": this.userForm.get("roleName").value
          },
          "email": this.userForm.get("email").value,
          "roleName": this.rowData.roleName,
          "createdDate": this.rowData.createdDate,
          "modifiedDate": this.rowData.modifiedDate,
          "active": this.rowData.active,
          "userId": this.rowData.userId,
        }
      } else {
        this.formData =
        {
          "userName": this.userForm.get("username").value,
          "email": this.userForm.get("email").value,
          "userRole": {
            "roleId": this.userForm.get("roleName").value
          }
        }
      }
      console.log("check " + JSON.stringify(this.formData))

      this.adminService.addUserData(this.formData)
        .subscribe(res => {
          this.displayLoading = false;
          if (res[0]['message'] != null && res[0]['message'] == 'Success') {
            this.displaySuccessAlert();
          }
          else {
            this.displayFailureAlert();
          }
        }, error => {
          this.displayFailureAlert();
        });
    }
  }

  displaySuccessAlert() {
    sweetalert("Created", {
      title: "User Data",
      text: "User Data has been created successfully.",
      icon: "success",
    });
    this.displayLoading = false;
    this.customerEvent.emit({ "tab": { "textLabel": "User Management" }, "index": 0 });
  }

  displayFailureAlert() {
    sweetalert("Failed", {
      title: "User Data",
      text: "Error in creating the User Data. Please try again later.",
      icon: "warning",
    });
    this.displayLoading = false;
  }

  populateForm() {

  }

  createCustomer() {
    this.customerEvent.emit({ "tab": { "textLabel": "User Management" }, "index": 0 });
  }

  cancel() {
    this.customerEvent.emit({ "tab": { "textLabel": "User Management", "cancel": "true" }, "index": 0 });
  }

}
