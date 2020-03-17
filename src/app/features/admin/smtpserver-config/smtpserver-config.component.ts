import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-smtpserver-config',
  templateUrl: './smtpserver-config.component.html',
  styleUrls: ['./smtpserver-config.component.css'],

})
export class SmtpserverConfigComponent implements OnInit {
  @Output() customerEvent = new EventEmitter();
  @Input() updateRow: boolean;
  @Input() rowData: any;
  smtpserverConfigForm: FormGroup;
  fieldsArr: any;
  formData: any;
  displayLoading: boolean = false;


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private adminService: AdminService, private toastr: ToastrService) {

  }

  ngOnInit() {
    if (this.updateRow == false) {
      this.rowData = [];
    }
    this.createForm();

    this.fieldsArr = [
      { "label": "Username", "type": "text", "control": "userName" },
      { "label": "Password", "type": "text", "control": "password" },
      { "label": "Description", "type": "text", "control": "description" },
      { "label": "Server Name", "type": "text", "control": "smtpServer" },
      { "label": "Port", "type": "number", "control": "port" },
      { "label": "Connection Security", "type": "text", "control": "connectionSecurity" },
      { "label": "Authentication", "type": "text", "control": "authenticationMethod" },
    ]
  }

  createForm() {
    this.smtpserverConfigForm = this.fb.group({
      description: [this.rowData ? this.rowData.description : '', [Validators.required, Validators.minLength(2)]],
      smtpServer: [this.rowData ? this.rowData.smtpServer : '', [Validators.required, Validators.minLength(2)]],
      port: [this.rowData ? this.rowData.port : '', [Validators.required, Validators.minLength(2)]],
      connectionSecurity: [this.rowData ? this.rowData.connectionSecurity : '', [Validators.required, Validators.minLength(2)]],
      authenticationMethod: [this.rowData ? this.rowData.authenticationMethod : '', [Validators.required, Validators.minLength(2)]],
      userName: [this.rowData ? this.rowData.userName : '', [Validators.required, Validators.minLength(2)]],
      password: [this.rowData ? this.rowData.password : '', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit() {
    var regexSpecialChar = new RegExp('^[A-Za-z0-9]*$');
    var specialChar = (regexSpecialChar.test(this.smtpserverConfigForm.get("smtpServer").value) && regexSpecialChar.test(this.smtpserverConfigForm.get("authenticationMethod").value) &&
      regexSpecialChar.test(this.smtpserverConfigForm.get("userName").value) && regexSpecialChar.test(this.smtpserverConfigForm.get("description").value) && regexSpecialChar.test(this.smtpserverConfigForm.get("connectionSecurity").value)
      && regexSpecialChar.test(this.smtpserverConfigForm.get("password").value));

    if (this.smtpserverConfigForm.get("smtpServer").value === null || this.smtpserverConfigForm.get("smtpServer").value === '' ||
      this.smtpserverConfigForm.get("userName").value === null || this.smtpserverConfigForm.get("userName").value === '' ||
      this.smtpserverConfigForm.get("password").value === null || this.smtpserverConfigForm.get("password").value === '' ||
      this.smtpserverConfigForm.get("description").value === null || this.smtpserverConfigForm.get("description").value === '' ||
      this.smtpserverConfigForm.get("port").value === null || this.smtpserverConfigForm.get("port").value === '' ||
      this.smtpserverConfigForm.get("connectionSecurity").value === null || this.smtpserverConfigForm.get("connectionSecurity").value === '' ||
      this.smtpserverConfigForm.get("authenticationMethod").value === null || this.smtpserverConfigForm.get("authenticationMethod").value === '') {
      this.toastr.warning("Fields cannot be Empty")
    } else if (!specialChar) {
      this.toastr.warning("Special Character is not allowed");
    }
    else {
      this.displayLoading = true;
      if (this.updateRow == true) {
        this.formData = {
          "smtpServer": this.smtpserverConfigForm.get("smtpServer").value,
          "userName": this.smtpserverConfigForm.get("userName").value,
          "password": this.smtpserverConfigForm.get("password").value,
          "description": this.smtpserverConfigForm.get("description").value,
          "connectionSecurity": this.smtpserverConfigForm.get("connectionSecurity").value,
          "authenticationMethod": this.smtpserverConfigForm.get("authenticationMethod").value,
          "port": this.smtpserverConfigForm.get("port").value,
          "id": this.rowData.id
        }
      }
      else {
        this.formData = {
          "smtpServer": this.smtpserverConfigForm.get("smtpServer").value,
          "userName": this.smtpserverConfigForm.get("userName").value,
          "password": this.smtpserverConfigForm.get("password").value,
          "description": this.smtpserverConfigForm.get("description").value,
          "connectionSecurity": this.smtpserverConfigForm.get("connectionSecurity").value,
          "authenticationMethod": this.smtpserverConfigForm.get("authenticationMethod").value,
          "port": this.smtpserverConfigForm.get("port").value,
        }
      }

      this.adminService.addSMTPServerData(this.formData)
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
      title: "SMTP Server Configuration",
      text: "Error in creating the SMTP Server Configuration. Please try again later.",
      icon: "warning",
    });
    this.displayLoading = false;
  }

  displaySuccessAlert() {
    sweetalert("Created", {
      title: "SMTP Server Configuration",
      text: "SMTP Server Configuration has been created successfully.",
      icon: "success",
    });
    this.customerEvent.emit({ "tab": { "textLabel": "SMTP Server Config", "cancel": "true" }, "index": 1 });
    this.smtpserverConfigForm.reset();
  }


  cancel() {
    this.customerEvent.emit({ "tab": { "textLabel": "SMTP Server Config", "cancel": "true" }, "index": 1 });
  }
}
