import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
declare var require: any;
let sweetalert = require('sweetalert');
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-config',
  templateUrl: './customer-config.component.html',
  styleUrls: ['./customer-config.component.css'],
})
export class CustomerConfigComponent implements OnInit {
  @Output() customerEvent = new EventEmitter();
  @Input() rowData: any;
  @Input() updateRow: boolean;
  title: "Customer Details";
  customerForm: FormGroup;
  formData: any;
  fieldsArr: any;
  displayLoading: boolean = false;
  enableErrorText: boolean = true;
  enableErrorMsg: any;


  constructor(private fb: FormBuilder, private adminService: AdminService, private toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.updateRow == false) {
      this.rowData = [];
    }
    this.createForm();
    this.fieldsArr = [
      { "label": "Customer Name", "type": "text", "control": "custName" },
      { "label": "Customer #", "type": "number", "control": "custNum" },
      { "label": "Contact #", "type": "number", "control": "custPhone" },
      { "label": "Email", "type": "email", "control": "custEmail" },
      { "label": "Address", "type": "textarea", "control": "custAddress" },
      { "label": "Bill To", "type": "textarea", "control": "billTo" },
      { "label": "Ship To", "type": "textarea", "control": "shipTo" },
    ]
  }

  createForm() {
    this.customerForm = this.fb.group({
      custName: [this.rowData ? this.rowData.custName : '', [Validators.required, Validators.minLength(2)]],
      custNum: [this.rowData ? this.rowData.custNum : '', [Validators.required, Validators.minLength(2)]],
      custPhone: [this.rowData ? this.rowData.custPhone : '', [Validators.required, Validators.minLength(10)]],
      custEmail: [this.rowData ? this.rowData.custEmail : '', [Validators.required, Validators.email]],
      custAddress: [this.rowData ? this.rowData.custAddress : '', [Validators.required, Validators.minLength(2)]],
      billTo: [this.rowData ? this.rowData.billTo : '', [Validators.required, Validators.minLength(2)]],
      shipTo: [this.rowData ? this.rowData.shipTo : '', [Validators.required, Validators.minLength(2)]],
    });
  }

  populateForm() {

  }
  createCustomer() {
    var regexp = new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$');
    var regexSpecialChar = new RegExp('^[A-Za-z0-9]*$');
    var serchfind = regexp.test(this.customerForm.get("custEmail").value);
    var specialChar = (regexSpecialChar.test(this.customerForm.get("custName").value) && regexSpecialChar.test(this.customerForm.get("custAddress").value) &&
      regexSpecialChar.test(this.customerForm.get("billTo").value) && regexSpecialChar.test(this.customerForm.get("shipTo").value));
    if (this.customerForm.get("custName").value === null || this.customerForm.get("custName").value === '' ||
      this.customerForm.get("custNum").value === null || this.customerForm.get("custNum").value === '' ||
      this.customerForm.get("custPhone").value === null || this.customerForm.get("custPhone").value === '' ||
      this.customerForm.get("custEmail").value === null || this.customerForm.get("custEmail").value === '' ||
      this.customerForm.get("custAddress").value === null || this.customerForm.get("custAddress").value === '' ||
      this.customerForm.get("billTo").value === null || this.customerForm.get("billTo").value === '' ||
      this.customerForm.get("shipTo").value === null || this.customerForm.get("shipTo").value === '') {
      this.toastr.warning("Fields cannot be Empty")
    } else if (this.customerForm.get("custPhone").value.length < 10 || this.customerForm.get("custPhone").value.length > 10) {
      this.toastr.warning("Phone # must be 10 digits");
    } else if (!serchfind) {
      this.toastr.warning("Enter Valid email");
    } else if (!specialChar) {
      this.toastr.warning("Special Character is not allowed");
    }
    else {
      this.displayLoading = true;
      if (this.updateRow == true) {
        this.formData = {
          "custName": this.customerForm.get("custName").value,
          "custEmail": this.customerForm.get("custEmail").value,
          "custPhone": this.customerForm.get("custPhone").value,
          "custAddress": this.customerForm.get("custAddress").value,
          "custNum": this.customerForm.get("custNum").value,
          "billTo": this.customerForm.get("billTo").value,
          "shipTo": this.customerForm.get("shipTo").value,
          "custid": this.rowData.custid,
        }
      } else {
        this.formData = {
          "custName": this.customerForm.get("custName").value,
          "custEmail": this.customerForm.get("custEmail").value,
          "custPhone": this.customerForm.get("custPhone").value,
          "custAddress": this.customerForm.get("custAddress").value,
          "custNum": this.customerForm.get("custNum").value,
          "billTo": this.customerForm.get("billTo").value,
          "shipTo": this.customerForm.get("shipTo").value,
        }
      }

      this.adminService.addCustomerData(this.formData)
        .subscribe(res => {
          this.displayLoading = false;
          if (res[0]['message'] != null && res[0]['message'] == 'Success') {
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
      title: "Customer Configuration",
      text: "Error in creating the Plant Configuration. Please try again later.",
      icon: "warning",
    });
    this.displayLoading = false;
  }

  displaySuccessAlert() {
    sweetalert("Created", {
      title: "Customer Configuration",
      text: "Customer Configuration has been created successfully.",
      icon: "success",
    });
    this.customerEvent.emit({ "tab": { "textLabel": "Customer Management" }, "index": 2 });
  }

  cancel() {
    this.customerForm.reset();
    this.customerEvent.emit({ "tab": { "textLabel": "Customer Management", "cancel": "true" }, "index": 2 });
  }
}
