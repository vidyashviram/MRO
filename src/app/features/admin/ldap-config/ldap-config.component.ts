import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-ldap-config',
  templateUrl: './ldap-config.component.html',
  styleUrls: ['./ldap-config.component.css']
})
export class LdapConfigComponent implements OnInit {

  @Input() updateRow: boolean; @Input() rowData: any;
  @Output() customerEvent = new EventEmitter();
  activeDirectoryConfigForm: FormGroup;
  fieldsArr: any;
  displayLoading: boolean = false;
  formData: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private adminService: AdminService, private toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.updateRow == false) {
      this.rowData = [];
    }
    this.createForm();

    this.fieldsArr = [
      { "label": "User Name", "type": "text", "control": "serviceUserName" },
      { "label": "Password", "type": "text", "control": "servicePassword" },
      { "label": "Host Name", "type": "text", "control": "host" },
      { "label": "Protocol", "type": "text", "control": "protocol" },
      { "label": "Domain", "type": "text", "control": "domain" },
      { "label": "Domain Next", "type": "text", "control": "domaiNext" },
      { "label": "Domain Dir", "type": "text", "control": "domaIndir" },
      { "label": "Domain Group", "type": "text", "control": "domaIndirGroup" },
    ]
  }

  createForm() {
    this.activeDirectoryConfigForm = this.fb.group({
      host: [this.rowData ? this.rowData.host : '', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      protocol: [this.rowData ? this.rowData.protocol : '', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      domain: [this.rowData ? this.rowData.domain : '', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      domaiNext: [this.rowData ? this.rowData.domaiNext : '', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      domaIndir: [this.rowData ? this.rowData.domaIndir : '', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      domaIndirGroup: [this.rowData ? this.rowData.domaIndirGroup : '', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      serviceUserName: [this.rowData ? this.rowData.serviceUserName : '', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
      servicePassword: [this.rowData ? this.rowData.servicePassword : '', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
    });
  }

  onSubmit() {
    var regexp = new RegExp('^[A-Za-z0-9]*$');
    var specialChar = (regexp.test(this.activeDirectoryConfigForm.get("host").value) && regexp.test(this.activeDirectoryConfigForm.get("protocol").value)
      && regexp.test(this.activeDirectoryConfigForm.get("domain").value) &&
      regexp.test(this.activeDirectoryConfigForm.get("domaiNext").value) && regexp.test(this.activeDirectoryConfigForm.get("domaIndir").value) &&
      regexp.test(this.activeDirectoryConfigForm.get("domaIndirGroup").value) && regexp.test(this.activeDirectoryConfigForm.get("servicePassword").value)
      && regexp.test(this.activeDirectoryConfigForm.get("serviceUserName").value));
    if (this.activeDirectoryConfigForm.get("host").value === null || this.activeDirectoryConfigForm.get("host").value === '' ||
      this.activeDirectoryConfigForm.get("protocol").value === null || this.activeDirectoryConfigForm.get("protocol").value === '' ||
      this.activeDirectoryConfigForm.get("domain").value === null || this.activeDirectoryConfigForm.get("domain").value === '' ||
      this.activeDirectoryConfigForm.get("domaiNext").value === null || this.activeDirectoryConfigForm.get("domaiNext").value === '' ||
      this.activeDirectoryConfigForm.get("domaIndir").value === null || this.activeDirectoryConfigForm.get("domaIndir").value === '' ||
      this.activeDirectoryConfigForm.get("domaIndirGroup").value === null || this.activeDirectoryConfigForm.get("domaIndirGroup").value === '' ||
      this.activeDirectoryConfigForm.get("servicePassword").value === null || this.activeDirectoryConfigForm.get("servicePassword").value === '' ||
      this.activeDirectoryConfigForm.get("serviceUserName").value === null || this.activeDirectoryConfigForm.get("serviceUserName").value === '') {
      this.toastr.warning("Fields cannot be Empty")
    }
    else if (specialChar) {
      this.toastr.warning("Special Character is not allowed");
    }
    else {
      this.displayLoading = true;
      if (this.updateRow == true) {
        this.formData = {
          "protocol": this.activeDirectoryConfigForm.get("host").value,
          "host": this.activeDirectoryConfigForm.get("protocol").value,
          "domain": this.activeDirectoryConfigForm.get("domain").value,
          "domaiNext": this.activeDirectoryConfigForm.get("domaiNext").value,
          "domaIndir": this.activeDirectoryConfigForm.get("domaIndir").value,
          "domaIndirGroup": this.activeDirectoryConfigForm.get("domaIndirGroup").value,
          "serviceUserName": this.activeDirectoryConfigForm.get("serviceUserName").value,
          "servicePassword": this.activeDirectoryConfigForm.get("servicePassword").value,
          "id": this.rowData.id
        }
      } else {
        this.formData = {
          "protocol": this.activeDirectoryConfigForm.get("host").value,
          "host": this.activeDirectoryConfigForm.get("protocol").value,
          "domain": this.activeDirectoryConfigForm.get("domain").value,
          "domaiNext": this.activeDirectoryConfigForm.get("domaiNext").value,
          "domaIndir": this.activeDirectoryConfigForm.get("domaIndir").value,
          "domaIndirGroup": this.activeDirectoryConfigForm.get("domaIndirGroup").value,
          "serviceUserName": this.activeDirectoryConfigForm.get("serviceUserName").value,
          "servicePassword": this.activeDirectoryConfigForm.get("servicePassword").value
        }
      }

      this.adminService.addActiveDirectoryServerData(this.formData)
        .subscribe(res => {
          this.displayLoading = false;
          if (res) {
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

  displayFailureAlert() {
    sweetalert("Failed", {
      title: "Active Directory",
      text: "Error in creating the Active Directory Configuration. Please try again later.",
      icon: "warning",
    });
    this.displayLoading = false;
  }

  displaySuccessAlert() {
    sweetalert("Created", {
      title: "Active Directory Configuration",
      text: "Active Directory Configuration has been created successfully.",
      icon: "success",
    });
    this.customerEvent.emit({ "tab": { "textLabel": "Active Directory" }, "index": 2 });
    this.activeDirectoryConfigForm.reset();
  }

  cancel() {
    this.customerEvent.emit({ "tab": { "textLabel": "Active Directory", "cancel": "true" }, "index": 2 });
  }
}
