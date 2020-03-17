import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-supplier-config',
  templateUrl: './supplier-config.component.html',
  styleUrls: ['./supplier-config.component.css'],
})
export class SupplierConfigComponent implements OnInit {

  supplierForm: FormGroup;
  @Output() customerEvent = new EventEmitter();
  @Input() rowData: any;
  @Input() updateRow: boolean;
  fieldsArr: any;
  formData: any;
  displayLoading: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.updateRow == false) {
      this.rowData = [];
    }
    this.createForm();
    this.fieldsArr = [
      { "label": "Supplier/Company Name", "type": "text", "control": "supplierName" },
      { "label": "Contact #", "type": "number", "control": "supplierPhone" },
      { "label": "Email", "type": "email", "control": "supplierEmail" },
      { "label": "Address", "type": "textarea", "control": "supplierAddress" },
    ]
  }


  createForm() {
    this.supplierForm = this.fb.group({
      supplierName: [this.rowData ? this.rowData.supplierName : '', [Validators.required, Validators.minLength(2)]],
      supplierPhone: [this.rowData ? this.rowData.supplierPhone : '', [Validators.required, Validators.minLength(10)]],
      supplierEmail: [this.rowData ? this.rowData.supplierEmail : '', [Validators.required, Validators.email]],
      supplierAddress: [this.rowData ? this.rowData.supplierAddress : '', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit() {
    var regexp = new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$');
    var serchfind = regexp.test(this.supplierForm.get("supplierEmail").value);
    var regexSpecialChar = new RegExp('^[A-Za-z0-9]*$');
    var specialChar = (regexSpecialChar.test(this.supplierForm.get("supplierName").value) && regexSpecialChar.test(this.supplierForm.get("supplierAddress").value));

    if (this.supplierForm.get("supplierName").value === null || this.supplierForm.get("supplierName").value === '' ||
      this.supplierForm.get("supplierPhone").value === null || this.supplierForm.get("supplierPhone").value === '' ||
      this.supplierForm.get("supplierEmail").value === null || this.supplierForm.get("supplierEmail").value === '' ||
      this.supplierForm.get("supplierAddress").value === null || this.supplierForm.get("supplierAddress").value === '') {
      this.toastr.warning("Fields cannot be Empty")
    } else if (this.supplierForm.get("supplierPhone").value.length < 10 || this.supplierForm.get("supplierPhone").value.length > 10) {
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
          "supplierName": this.supplierForm.get("supplierName").value,
          "supplierEmail": this.supplierForm.get("supplierEmail").value,
          "supplierPhone": this.supplierForm.get("supplierPhone").value,
          "supplierAddress": this.supplierForm.get("supplierAddress").value,
          "supplierId": this.rowData.supplierId
        }
      } else {
        this.formData = {
          "supplierName": this.supplierForm.get("supplierName").value,
          "supplierEmail": this.supplierForm.get("supplierEmail").value,
          "supplierPhone": this.supplierForm.get("supplierPhone").value,
          "supplierAddress": this.supplierForm.get("supplierAddress").value,
        }
      }

      this.adminService.addSupplierData(this.formData)
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
      title: "Supplier Configuration",
      text: "Error in creating the Supplier Configuration. Please try again later.",
      icon: "warning",
    });
    this.displayLoading = false;
  }
  displaySuccessAlert() {
    sweetalert("Created", {
      title: "Supplier Configuration",
      text: "Supplier Configuration has been created successfully.",
      icon: "success",
    });

    if (this.rowData)
      this.customerEvent.emit({ "tab": { "textLabel": "Supplier Management" }, "index": 3 });
    else
      this.router.navigate(['home/admin', this.route.snapshot.paramMap.get('id')]);
  }

  cancel() {
    this.supplierForm.reset();
    this.customerEvent.emit({ "tab": { "textLabel": "Customer Management", "cancel": "true" }, "index": 3 });
  }

}
