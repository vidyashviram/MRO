import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-work-order-common-form',
  templateUrl: './work-order-common-form.component.html',
  styleUrls: ['./work-order-common-form.component.css']
})
export class WorkOrderCommonFormComponent implements OnInit {

  commonForm: FormGroup;
  @Input() paramName: any = 'Test';
  @Input() rowData: any;
  fieldsArr: any = [
    { "label": " Customer PO Number", "type": "text", "control": "customerpoNumber" },
    { "label": "Plant Number", "type": "text", "control": "plantNumber" },
    { "label": "Sales Org", "type": "text", "control": "salesorg" },
    { "label": "Customer Sold To", "type": "text", "control": "customerSoldTo" },
    { "label": "Dock Date", "type": "date", "control": "Date" },
    { "label": "Part Number", "type": "text", "control": "partNumber" },
    { "label": "Service Notification Number", "type": "text", "control": "serviceNumber" },
    { "label": "Serial Number", "type": "text", "control": "serialNumber" },

  ]

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  createForm() {
    this.commonForm = this.fb.group({
      plantNumber: [this.rowData ? this.rowData.plantNumber : ''],
      customerpoNumber: [this.rowData ? this.rowData.customerpoNumber : ''],
      salesorg: [this.rowData ? this.rowData.salesorg : ''],
      customerSoldTo: [this.rowData ? this.rowData.Date : ''],
      Date: [this.rowData ? this.rowData.serviceNumber : ''],
      partNumber: [this.rowData ? this.rowData.partNumber : ''],
      serviceNumber: [this.rowData ? this.rowData.serviceNumber : ''],
      serialNumber: [this.rowData ? this.rowData.serviceNumber : ''],
    });
  }

  ngOnInit() {
    this.createForm()
  }

}
