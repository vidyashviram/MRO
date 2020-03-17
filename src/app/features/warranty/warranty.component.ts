import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.css']
})
export class WarrantyComponent implements OnInit {

  pageTitle = "Warranty";
  paramName: any = 'abc';
  WarantyForm: FormGroup;
  @Input() rowData: any;
  Data: Array<any> = [
    { name: 'Warranty Requested', value: 'warrantyRequested' },
    { name: 'Warranty Eligible', value: 'warrantyEligible' },
    { name: 'OEM Warranty(Yrs)', value: 'oemWarranty' },
  ];
  WarantyArray: any = [
    { "label": "Manufacture Date", "type": "date", "control": "manufactureDate" },
    { "label": "Elapsed Time Since Last Return", "type": "text", "control": "elapsedtime" },
    { "label": "Original Delivery Date", "type": "date", "control": "originaldeliveryDate" },
    { "label": "Elapsed Time Since Last Delivery", "type": "text", "control": "elapsedlastDelivery" },
    { "label": "Installed Date", "type": "date", "control": "installedDate" },
    { "label": "Spares Ship Date (if applicable)", "type": "date", "control": "sparesshipDate" },
    { "label": "Removal Date", "type": "date", "control": "removalDate" },
    { "label": "TSO (since last activity)", "type": "text", "control": "TSO" },
    { "label": "Workscope", "type": "text", "control": "workScope" },
    { "label": "CSO (since last activity)", "type": "text", "control": "CSOLastactivity" },
    { "label": "Ship Date", "type": "date", "control": "shipDate" },
    { "label": "TSR (since last activity)", "type": "text", "control": "TSRLastactivity" },
    { "label": "Original Tail Number", "type": "text", "control": "originaltailNum" },
    { "label": "CSR (since last activity)", "type": "text", "control": "CSRLastactivity" },
    { "label": "Original Engine Number", "type": "text", "control": "originalengineNum" },
    { "label": "Exchange Serial Number", "type": "text", "control": "exchangeserialNum" },
    { "label": "Prior Returns (drives MRU flag)", "type": "text", "control": "priorReturns" },
    { "label": "Retrofit Date", "type": "date", "control": "retrofitDate" },
    { "label": "ECR Flag", "type": "text", "control": "ecrFlag" },
    { "label": "MRU Flag", "type": "text", "control": "mruFlag" },
    { "label": "Notes", "type": "text", "control": "warrantyNotes" },
  ]
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  WarrantyForm() {
    this.WarantyForm = this.fb.group({
      manufactureDate: [this.rowData ? this.rowData.manufactureDate : ''],
      elapsedtime: [this.rowData ? this.rowData.elapsedtime : ''],
      originaldeliveryDate: [this.rowData ? this.rowData.originaldeliveryDate : ''],
      elapsedlastDelivery: [this.rowData ? this.rowData.elapsedlastDelivery : ''],
      installedDate: [this.rowData ? this.rowData.installedDate : ''],
      sparesshipDate: [this.rowData ? this.rowData.sparesshipDate : ''],
      removalDate: [this.rowData ? this.rowData.removalDate : ''],
      TSO: [this.rowData ? this.rowData.TSO : ''],
      workScope: [this.rowData ? this.rowData.workScope : ''],
      CSOLastactivity: [this.rowData ? this.rowData.CSOLastactivity : ''],
      shipDate: [this.rowData ? this.rowData.shipDate : ''],
      TSRLastactivity: [this.rowData ? this.rowData.TSRLastactivity : ''],
      originaltailNum: [this.rowData ? this.rowData.originaltailNum : ''],
      CSRLastactivity: [this.rowData ? this.rowData.CSRLastactivity : ''],
      originalengineNum: [this.rowData ? this.rowData.originalengineNum : ''],
      exchangeserialNum: [this.rowData ? this.rowData.exchangeserialNum : ''],
      priorReturns: [this.rowData ? this.rowData.priorReturns : ''],
      retrofitDate: [this.rowData ? this.rowData.retrofitDate : ''],
      ecrFlag: [this.rowData ? this.rowData.ecrFlag : ''],
      mruFlag: [this.rowData ? this.rowData.mruFlag : ''],
      warrantyNotes: [this.rowData ? this.rowData.warrantyNotes : ''],
      checkArray: this.fb.array([]),
      // checkArray:this.rowData?this.rowData.fb.Array([],),
      // warrantyNotes: [this.rowData ? this.rowData.warrantyNotes : ''],
      // warrantyRequested:[this.rowData?this.rowData.warrantyRequested:''],
      // warrantyEligible:[this.rowData?this.rowData.warrantyEligible:''],
      // oemWarranty:[this.rowData?this.rowData.oemWarranty:''],
    })
  }

  ngOnInit() {
    this.WarrantyForm()
  }

}
