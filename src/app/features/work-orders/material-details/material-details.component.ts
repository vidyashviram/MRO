import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { repairCard } from '../../interfaces/repair-card-table';


@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.css']
})
export class MaterialDetailsComponent implements OnInit {
  MaterialForm: FormGroup;
  @Input() rowData: any;
  MaterialArray: any = [
    { "label": "Part Number", "type": "text", "control": "partNumber" },
    { "label": " Removal Reason", "type": "text", "control": "removalReason" },
    { "label": "Customer Part Number", "type": "text", "control": "customerpartNum" },
    { "label": "CSN", "type": "text", "control": "CSN" },
    { "label": "Serial Number", "type": "text", "control": "serialNum" },
    { "label": "CSO", "type": "text", "control": "CSO" },
    { "label": "Customer Serial", "type": "text", "control": "customerSerial" },
    { "label": "CSR", "type": "text", "control": "CSR" },
    { "label": "Equipment Number", "type": "text", "control": "equipmentNum" },
    { "label": "Measurment Date", "type": "date", "control": "MeasurementDate" },
    { "label": "NATO Number", "type": "text", "control": "NATONumber" },
    { "label": "TSN", "type": "text", "control": "TSN" },
    { "label": "Install Date", "type": "date", "control": "installDate" },
    { "label": "TSO", "type": "text", "control": "TSO" },
    { "label": "Failure Date", "type": "date", "control": "failureDate" },
    { "label": "TSR", "type": "text", "control": "TSR" },
    { "label": "Removal Date", "type": "date", "control": "removalDate" },
    { "label": "Measurement Time", "type": "text", "control": "measurementTime" },

  ]
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

  materialsForm() {
    this.MaterialForm = this.fb.group({
      partNumber: [this.rowData ? this.rowData.partNumber : ''],
      removalReason: [this.rowData ? this.rowData.removalReason : ''],
      customerpartNum: [this.rowData ? this.rowData.customerpartNum : ''],
      CSN: [this.rowData ? this.rowData.CSN : ''],
      serialNum: [this.rowData ? this.rowData.serialNum : ''],
      CSO: [this.rowData ? this.rowData.CSO : ''],
      customerSerial: [this.rowData ? this.rowData.CSR : ''],
      CSR: [this.rowData ? this.rowData.CSR : ''],
      equipmentNum: [this.rowData ? this.rowData.equipmentNum : ''],
      MeasurementDate: [this.rowData ? this.rowData.MeasurementDate : ''],
      NATONumber: [this.rowData ? this.rowData.NATONumber : ''],
      TSN: [this.rowData ? this.rowData.TSN : ''],
      installDate: [this.rowData ? this.rowData.installDate : ''],
      TSO: [this.rowData ? this.rowData.TSO : ''],
      failureDate: [this.rowData ? this.rowData.failureDate : ''],
      TSR: [this.rowData ? this.rowData.TSR : ''],
      removalDate: [this.rowData ? this.rowData.removalDate : ''],
      measurementTime: [this.rowData ? this.rowData.measurementTime : ''],

    });
  }
  submitMaterialForm(){
    
  }


  ngOnInit() { 
    this.materialsForm();
  }
}
