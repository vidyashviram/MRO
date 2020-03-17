import { Component, OnInit, Input } from '@angular/core';
import { repairCard } from '../../interfaces/repair-card-table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-work-order-repair',
  templateUrl: './work-order-repair.component.html',
  styleUrls: ['./work-order-repair.component.css']
})
export class WorkOrderRepairComponent implements OnInit {

  commonForm: FormGroup;
 
  items: repairCard[];
  @Input() rowData: any;

  fieldsArr: any = [
    { "label": "Sales Order Number", "type": "text", "control": "salesorderNumber" },
    { "label": " Part No. In", "type": "text", "control": "partnoIn" },
    { "label": "Date Received", "type": "text", "control": "dateReceived" },
    { "label": "Service Notification No.", "type": "text", "control": "servicenotificationNo" },
    { "label": "Part Description.", "type": "text", "control": "partdesc" },
    { "label": "Due Date.", "type": "text", "control": "duedate" },
    { "label": "Cust No.", "type": "text", "control": "custNo" },
    { "label": "Serial No. In.", "type": "datextte", "control": "serialnoIn" },
    { "label": "Qty Received", "type": "text", "control": "qtyReceived" },
    { "label": "Cust. Name", "type": "text", "control": "custName" },
    { "label": "Status/Work", "type": "text", "control": "StatusWork" },
    { "label": "Order Type", "type": "text", "control": "orderType" },
    { "label": "Cust PO", "type": "text", "control": "custPO" },
    { "label": "Rsn for Removal", "type": "text", "control": "rsnforRemoval" },
    { "label": "Category", "type": "text", "control": "Category" },
    { "label": "Operator", "type": "text", "control": "Operator" },
    { "label": "Cust Part No.", "type": "text", "control": "custpartNo" },
    { "label": "Workscope", "type": "text", "control": "Workscope" },
    { "label": "Warranty Requested", "type": "text", "control": "warrantyRequested" },
    { "label": "Work SN", "type": "text", "control": "workSN" },
    { "label": "MWC", "type": "text", "control": "MWC" },
    { "label": "Warranty", "type": "text", "control": "Warranty" },
    { "label": "Engine Type", "type": "text", "control": "engineType" },
    { "label": "Reusable Container", "type": "text", "control": "reusableContainer" },
    { "label": "Aircraft Type", "type": "text", "control": "aircraftType" },
    { "label": "Engine Serial No.", "type": "text", "control": "engineserialNo" },
    { "label": "NATO No.", "type": "text", "control": "NATONo" },
    { "label": "Tail No.", "type": "text", "control": "tailNo" },
    { "label": "Manufacture Date", "type": "text", "control": "manufactureDate" },
    { "label": "Removal Date", "type": "text", "control": "removalDate" },
    { "label": "Release Type", "type": "text", "control": "releaseType" },
    { "label": "Net Wt.", "type": "text", "control": "netWt" },
    { "label": "Sales office", "type": "text", "control": "salesOffice" },
   

  ]

  cols: any[];
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.items = [
      {CSN: 8654654,TSN: 67868, CSO: 4564547,CSR: 54657, TSO: 8564665, TSR: 4564547, TSI: 67868, CSI: 4564547 },
     
    ];
    this.cols = [
      { field: 'CSN', header: 'CSN' },
      { field: 'TSN', header: 'TSN' },
      { field: 'CSO', header: 'CSO' },
      { field: 'CSR', header: 'CSR' },
      { field: 'TSO', header: 'TSO' },
      { field: 'TSR', header: 'TSR' },
      { field: 'TSI', header: 'TSI' },
      { field: 'CSI', header: 'CSI' },

    ];
   this. createForm()
  }

  createForm() {
    this.commonForm = this.fb.group({
      salesorderNumber: [this.rowData ? this.rowData.salesorderNumber : ''],
      partnoIn: [this.rowData ? this.rowData.partnoIn : ''],
      dateReceived: [this.rowData ? this.rowData.dateReceived : ''],
      servicenotificationNo: [this.rowData ? this.rowData.servicenotificationNo : ''],
      partdesc: [this.rowData ? this.rowData.partdesc : ''],
      duedate: [this.rowData ? this.rowData.duedate : ''],
      custNo: [this.rowData ? this.rowData.custNo : ''],
      serialnoIn: [this.rowData ? this.rowData.serialnoIn : ''],
      qtyReceived: [this.rowData ? this.rowData.qtyReceived : ''],
      custName: [this.rowData ? this.rowData.custName : ''],
      StatusWork: [this.rowData ? this.rowData.StatusWork : ''],
      orderType: [this.rowData ? this.rowData.orderType : ''],
      custPO: [this.rowData ? this.rowData.custPO : ''],
      rsnforRemoval: [this.rowData ? this.rowData.rsnforRemoval : ''],
      Category: [this.rowData ? this.rowData.Category : ''],

      Operator: [this.rowData ? this.rowData.Operator : ''],
      custpartNo: [this.rowData ? this.rowData.custpartNo : ''],
      Workscope: [this.rowData ? this.rowData.Workscope : ''],
      warrantyRequested: [this.rowData ? this.rowData.warrantyRequested : ''],
      workSN: [this.rowData ? this.rowData.workSN : ''],

      MWC: [this.rowData ? this.rowData.MWC : ''],
      Warranty: [this.rowData ? this.rowData.Warranty : ''],
      engineType: [this.rowData ? this.rowData.engineType : ''],
      reusableContainer: [this.rowData ? this.rowData.reusableContainer : ''],
      aircraftType: [this.rowData ? this.rowData.aircraftType : ''],
      engineserialNo: [this.rowData ? this.rowData.engineserialNo : ''],
      NATONo: [this.rowData ? this.rowData.NATONo : ''],
      tailNo: [this.rowData ? this.rowData.tailNo : ''],
      manufactureDate: [this.rowData ? this.rowData.manufactureDate : ''],
      removalDate: [this.rowData ? this.rowData.removalDate : ''],
      releaseType: [this.rowData ? this.rowData.releaseType : ''],
      netWt: [this.rowData ? this.rowData.netWt : ''],
      salesOffice: [this.rowData ? this.rowData.salesOffice : ''],
    

    });
  }

  back(){
    this.router.navigate(["home/dynamic-workorder"]);  
   }

}
