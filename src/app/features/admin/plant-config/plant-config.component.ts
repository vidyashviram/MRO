import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-plant-config',
  templateUrl: './plant-config.component.html',
  styleUrls: ['./plant-config.component.css'],
})
export class PlantConfigComponent implements OnInit {
  plantForm: FormGroup;
  @Output() customerEvent = new EventEmitter();
  @Input() rowData: any;
  @Input() updateRow: boolean;
  pageTitle = "Plant Details";
  displayLoading: boolean = false;
  formData: any;
  DistributionList: any;
  fieldsArr: any;
  public dropdownData: any;
  distChannelSelected: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private adminService: AdminService, private toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.updateRow == false) {
      this.rowData = [];
    }
    this.initialiseDropdown();
    if (this.updateRow == true) {
      this.distChannelSelected = this.rowData.distributionchannel;
    }

    this.createForm();

    this.fieldsArr = [
      { "label": "Plant Name", "type": "text", "control": "plantName" },
      { "label": "Location", "type": "text", "control": "location" },
      { "label": "Plant #", "type": "text", "control": "plantNum" },
      { "label": "Classification", "type": "select", "control": "distributionchannel", options: this.DistributionList },
      { "label": "Sales Organization", "type": "email", "control": "salesorg" },
      { "label": "Division", "type": "text", "control": "division" },
      { "label": "Template", "type": "text", "control": "template" },
      { "label": "Plant Type", "type": "text", "control": "type" }
    ]

  }

  initialiseDropdown() {
    this.DistributionList = [
      { label: 'Select', value: '0' }
    ];

    this.adminService.getPlantDropdown().subscribe(res => {
      this.dropdownData = res;
      this.dropdownData.distChannelList.forEach(item => {
        let classification = {
          label: item.distributionChannel,
          value: item.distributionChannel
        };
        this.DistributionList.push(classification);
      });
    });
  }

  createForm() {
    this.plantForm = this.fb.group({
      plantName: [this.rowData ? this.rowData.plantName : '', [Validators.required, Validators.minLength(2)]],
      location: [this.rowData ? this.rowData.location : '', [Validators.required, Validators.minLength(2)]],
      distributionchannel: [this.rowData ? this.rowData.distributionchannel : '', [Validators.required]],
      plantNum: [this.rowData ? this.rowData.plantNum : '', [Validators.required, Validators.minLength(2)]],
      salesorg: [this.rowData ? this.rowData.salesorg : '', [Validators.required, Validators.minLength(2)]],
      division: [this.rowData ? this.rowData.division : '', [Validators.required, Validators.minLength(2)]],
      template: [this.rowData ? this.rowData.template : '', [Validators.required, Validators.minLength(2)]],
      type: [this.rowData ? this.rowData.type : '', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    var regexSpecialChar = new RegExp('^[A-Za-z0-9]*$');
    var specialChar = (regexSpecialChar.test(this.plantForm.get("plantName").value) && regexSpecialChar.test(this.plantForm.get("location").value) &&
      regexSpecialChar.test(this.plantForm.get("salesorg").value) && regexSpecialChar.test(this.plantForm.get("division").value) && regexSpecialChar.test(this.plantForm.get("type").value)
      && regexSpecialChar.test(this.plantForm.get("template").value));
    if (this.plantForm.get("plantName").value === null || this.plantForm.get("plantName").value === '' ||
      this.plantForm.get("location").value === null || this.plantForm.get("location").value === '' ||
      this.plantForm.get("plantNum").value === null || this.plantForm.get("plantNum").value === '' ||
      this.plantForm.get("salesorg").value === null || this.plantForm.get("salesorg").value === '' ||
      this.plantForm.get("division").value === null || this.plantForm.get("division").value === '' ||
      this.plantForm.get("template").value === null || this.plantForm.get("template").value === '' ||
      this.plantForm.get("type").value === null || this.plantForm.get("type").value === '') {
      this.toastr.warning("Fields cannot be Empty")
    } else if (this.plantForm.get("distributionchannel").value === undefined || this.plantForm.get("distributionchannel").value == 0) {
      this.toastr.warning("Please Select Dropdown")
    } else if (!specialChar) {
      this.toastr.warning("Special Character is not allowed");
    }
    else {
      this.displayLoading = true;
      if (this.updateRow == true) {
        this.formData = {
          "plantName": this.plantForm.get("plantName").value,
          "location": this.plantForm.get("location").value,
          "distributionchannel": this.plantForm.get("distributionchannel").value,
          "salesorg": this.plantForm.get("salesorg").value,
          "division": this.plantForm.get("division").value,
          "template": this.plantForm.get("template").value,
          "type": this.plantForm.get("type").value,
          "plantNum": this.plantForm.get("plantNum").value,
          "plantId": this.rowData.plantId,
          "receiveddate": this.rowData.receiveddate,
          "modifiedDate": this.rowData.modifiedDate,
          "active": this.rowData.active
        }
      } else {
        this.formData = {
          "plantName": this.plantForm.get("plantName").value,
          "location": this.plantForm.get("location").value,
          "distributionchannel": this.plantForm.get("distributionchannel").value,
          "salesorg": this.plantForm.get("salesorg").value,
          "division": this.plantForm.get("division").value,
          "template": this.plantForm.get("template").value,
          "type": this.plantForm.get("type").value,
          "plantNum": this.plantForm.get("plantNum").value,
        }
      }

      this.adminService.addPlantData(this.formData)
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

  displaySuccessAlert() {
    sweetalert("Created", {
      title: "Plant Configuration",
      text: "Plant Configuration has been created successfully.",
      icon: "success",
    });
    this.displayLoading = false;
    this.customerEvent.emit({ "tab": { "textLabel": "Plant Configuration" }, "index": 5 });
  }

  displayFailureAlert() {
    sweetalert("Failed", {
      title: "Plant Configuration",
      text: "Error in creating the Plant Configuration. Please try again later.",
      icon: "warning",
    });
    this.displayLoading = false;
  }

  cancel() {
    this.customerEvent.emit({ "tab": { "textLabel": "Plant Configuration", "cancel": "true" }, "index": 5 });
  }

}
