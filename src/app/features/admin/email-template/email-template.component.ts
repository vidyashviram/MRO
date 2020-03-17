import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var require: any;
let sweetalert = require('sweetalert');


@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})
export class EmailTemplateComponent implements OnInit {
  mailForm: FormGroup;
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
      { "label": "Template Name", "type": "text", "control": "templateName" },
      { "label": "From", "type": "text", "control": "fromAddress" },
      { "label": "To", "type": "number", "control": "toAddress" },
      { "label": "Subject", "type": "email", "control": "subject" },
      { "label": "category", "type": "email", "control": "category" },
      { "label": "Body", "type": "textarea", "control": "emailBody" },
    ]
  }

  createForm() {
    this.mailForm = this.fb.group({
      templateName: [this.rowData ? this.rowData.templateName : '', [Validators.required, Validators.minLength(2)]],
      fromAddress: [this.rowData ? this.rowData.fromAddress : '', [Validators.required, Validators.minLength(10)]],
      toAddress: [this.rowData ? this.rowData.toAddress : '', [Validators.required, Validators.email]],
      subject: [this.rowData ? this.rowData.subject : '', [Validators.required, Validators.minLength(2)]],
      category: [this.rowData ? this.rowData.category : '', [Validators.required, Validators.minLength(2)]],
      emailBody: [this.rowData ? this.rowData.emailBody : '', [Validators.required, Validators.minLength(2)]],

    });
  }

  onSubmit() {
    var regexp = new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$');
    var serchfind = regexp.test(this.mailForm.get("toAddress").value) && regexp.test(this.mailForm.get("fromAddress").value);
    var regexSpecialChar = new RegExp('^[A-Za-z0-9]*$');
    var specialChar = (regexSpecialChar.test(this.mailForm.get("emailBody").value) &&
      regexSpecialChar.test(this.mailForm.get("category").value) && regexSpecialChar.test(this.mailForm.get("templateName").value)
      && regexSpecialChar.test(this.mailForm.get("subject").value));

    if (this.mailForm.get("templateName").value === null || this.mailForm.get("templateName").value === '' ||
      this.mailForm.get("subject").value === null || this.mailForm.get("subject").value === '' ||
      this.mailForm.get("toAddress").value === null || this.mailForm.get("toAddress").value === '' ||
      this.mailForm.get("fromAddress").value === null || this.mailForm.get("fromAddress").value === '' ||
      this.mailForm.get("emailBody").value === null || this.mailForm.get("emailBody").value === '' ||
      this.mailForm.get("category").value === null || this.mailForm.get("category").value === '') {
      this.toastr.warning("Fields cannot be Empty")
    } else if (!serchfind) {
      this.toastr.warning("Enter Valid email");
    } else if (!specialChar) {
      this.toastr.warning("Special Character is not allowed");
    }
    else {
      if (this.updateRow == true) {
        this.formData = {
          "templateName": this.mailForm.get("templateName").value,
          "subject": this.mailForm.get("subject").value,
          "toAddress": this.mailForm.get("toAddress").value,
          "fromAddress": this.mailForm.get("fromAddress").value,
          "emailBody": this.mailForm.get("emailBody").value,
          "category": this.mailForm.get("category").value,
          "templateId": this.rowData.templateId
        }
      } else {
        this.formData = {
          "templateName": this.mailForm.get("templateName").value,
          "subject": this.mailForm.get("subject").value,
          "toAddress": this.mailForm.get("toAddress").value,
          "fromAddress": this.mailForm.get("fromAddress").value,
          "emailBody": this.mailForm.get("emailBody").value,
          "category": this.mailForm.get("category").value,
        }
      }

      this.displayLoading = false
      this.adminService.addEMailData(this.formData)
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



  displayFailureAlert() {
    sweetalert("Failed", {
      title: "Mail Template",
      text: "Error in creating the Mail Template. Please try again later.",
      icon: "warning",
    });
    this.displayLoading = false;
  }
  displaySuccessAlert() {
    sweetalert("Created", {
      title: "Mail Template",
      text: "Mail Template  has been created successfully.",
      icon: "success",
    });

    if (this.rowData)
      this.customerEvent.emit({ "tab": { "textLabel": "Mail Template Configuration" }, "index": 6 });
    else
      this.router.navigate(['home/admin', this.route.snapshot.paramMap.get('id')]);
  }

  cancel() {
    this.mailForm.reset();
    this.customerEvent.emit({ "tab": { "textLabel": "Mail Template Configuration", "cancel": "true" }, "index": 6 });
  }
}
