import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-dbserver-config',
  templateUrl: './dbserver-config.component.html',
  styleUrls: ['./dbserver-config.component.css'],
})
export class DbserverConfigComponent implements OnInit {

  @Output() customerEvent = new EventEmitter();
  @Input() updateRow: boolean;
  @Input() rowData: any;
  dbserverConfigForm: FormGroup;
  fieldsArr: any;
  displayLoading: boolean = false;
  formData: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private adminService: AdminService, private toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.updateRow == false) {
      this.rowData = [];
    }
    this.createForm();

    this.fieldsArr = [
      { "label": "User Name", "type": "text", "control": "userName" },
      { "label": "Password", "type": "text", "control": "password" },
      { "label": "DataBase Name", "type": "text", "control": "dataBaseName" },
      { "label": "DB Url", "type": "text", "control": "dbUrl" },
    ]
  }

  createForm() {
    this.dbserverConfigForm = this.fb.group({
      dbUrl: [this.rowData ? this.rowData.dbUrl : '', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      dataBaseName: [this.rowData ? this.rowData.dataBaseName : '', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      userName: [this.rowData ? this.rowData.userName : '', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      password: [this.rowData ? this.rowData.password : '', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    });
  }

  onSubmit() {
    var regexSpecialChar = new RegExp('^[A-Za-z0-9]*$');
    var specialChar = (regexSpecialChar.test(this.dbserverConfigForm.get("userName").value) && regexSpecialChar.test(this.dbserverConfigForm.get("password").value) &&
      regexSpecialChar.test(this.dbserverConfigForm.get("dataBaseName").value) && regexSpecialChar.test(this.dbserverConfigForm.get("dbUrl").value));
    if (this.dbserverConfigForm.get("userName").value === null || this.dbserverConfigForm.get("userName").value === '' ||
      this.dbserverConfigForm.get("password").value === null || this.dbserverConfigForm.get("password").value === '' ||
      this.dbserverConfigForm.get("dataBaseName").value === null || this.dbserverConfigForm.get("dataBaseName").value === '' ||
      this.dbserverConfigForm.get("dbUrl").value === null || this.dbserverConfigForm.get("dbUrl").value === '') {
      this.toastr.warning("Fields cannot be Empty")
    } else if (!specialChar) {
      this.toastr.warning("Special Character is not allowed");
    }
    else {
      this.displayLoading = true;
      if (this.updateRow == true) {
        this.formData = {
          "dbUrl": this.dbserverConfigForm.get("dbUrl").value,
          "dataBaseName": this.dbserverConfigForm.get("dataBaseName").value,
          "userName": this.dbserverConfigForm.get("userName").value,
          "password": this.dbserverConfigForm.get("password").value,
          "id": this.rowData.id
        }
      } else {
        this.formData = {
          "dbUrl": this.dbserverConfigForm.get("dbUrl").value,
          "dataBaseName": this.dbserverConfigForm.get("dataBaseName").value,
          "userName": this.dbserverConfigForm.get("userName").value,
          "password": this.dbserverConfigForm.get("password").value,
        }
      }

      this.adminService.addDBServerData(this.formData)
        .subscribe(res => {
          this.displayLoading = false;
          if (res) {
            this.displaySuccessAlert();
          }
          else {
            this.displayFailureAlert();
          }
        }, error => {
          this.displayLoading = false;
          this.displayFailureAlert();
        });
    }
  }

  displayFailureAlert() {
    sweetalert("Failed", {
      title: "DB Server Configuration",
      text: "Error in creating the DB Server Configuration. Please try again later.",
      icon: "warning",
    });
    this.displayLoading = false;
  }
  displaySuccessAlert() {
    sweetalert("Created", {
      title: "DB Server Configuration",
      text: "DB Server Configuration has been created successfully.",
      icon: "success",
    });
    this.customerEvent.emit({ "tab": { "textLabel": "DB Server Config", "cancel": "true" }, "index": 0 });
    this.dbserverConfigForm.reset();
  }

  cancel() {
    this.customerEvent.emit({ "tab": { "textLabel": "DB Server Config", "cancel": "true" }, "index": 0 });
  }
}