import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  Titles = "Customer Requirements";

  CustomerForm: FormGroup;

  formData: any;
  paramName: any = 'abc';
  @Input() rowData: any;
  CustomerArray: any = [
    { "label": "Sold To", "type": "text", "control": "soldTo" },
    { "label": " Routing Instructions", "type": "text", "control": "routingInstructions" },
    { "label": "Bill To Payer", "type": "text", "control": "billtoPayer" },
    { "label": "Other(Y1)", "type": "text", "control": "Other" },
    { "label": "Ship To", "type": "text", "control": "shipTo" },
    { "label": "Shipping/Freight Forwarder", "type": "select", "control": "shipping", options: [{ "label": "Customer Shipping", value: "Customershipping" }, { "label": "Requirements", value: "Requirements" }, { "label": "Billing Note External", value: "Billing Note External" }, { "label": "Delivery Note Internal", value: "Delivery Note Internal" }, { "label": "Delivery Note External", value: "Delivery Note External" }] },
    { "label": "Attachments", "type": "file", "control": "attachments", options: [{ "label": "pdf", value: "pdf" }, { "label": "doc", value: "doc" }, { "label": "ppt", value: "ppt" }] },
    { "label": "Notes", "type": "text", "control": "customerNotes" },

  ]
  MaterialscustomerArray: any = [
    { "label": "Customer Request", "type": "text", "control": "customerRequest" },
    { "label": "Priority Code", "type": "text", "control": "priorityCode" },
    { "label": "TAT Required", "type": "text", "control": "tatRequired" },
    { "label": "End User Operator Information", "type": "text", "control": "enduseroperatorInform" },
    { "label": "TAT Type", "type": "text", "control": "tatType" },
    { "label": "Information", "type": "text", "control": "Information" },
    { "label": "SAP Contract Number", "type": "text", "control": "sapcontractNum" },
    { "label": "MK Denial Verification", "type": "text", "control": "mkVerification" },
    { "label": "Certification Required", "type": "text", "control": "certificationRequired" },
    { "label": "Export Compliance Verification", "type": "text", "control": "exportVerification" },
    { "label": "Service Bulletins Requested", "type": "text", "control": "bulletinsRequested" },
    { "label": "Maintain/Exchange Requirements", "type": "text", "control": "maintainRequirements" },
    { "label": "Outgoing Part Number", "type": "text", "control": "outgoingpartNum" },
  ]
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.customersForm();
  }
  customersForm() {
    this.CustomerForm = this.fb.group({
      soldTo: [this.rowData ? this.rowData.soldTo : ''],
      routingInstructions: [this.rowData ? this.rowData.routingInstructions : ''],
      billtoPayer: [this.rowData ? this.rowData.billtoPayer : ''],
      Other: [this.rowData ? this.rowData.Other : ''],
      shipTo: [this.rowData ? this.rowData.shipTo : ''],
      shipping: [this.rowData ? this.rowData.shipping : ''],
      attachments: [this.rowData ? this.rowData.attachments : ''],
      customerNotes: [this.rowData ? this.rowData.customerNotes : ''],
      customerRequest: [this.rowData ? this.rowData.customerRequest : ''],
      priorityCode: [this.rowData ? this.rowData.priorityCode : ''],
      tatRequired: [this.rowData ? this.rowData.tatRequired : ''],
      enduseroperatorInform: [this.rowData ? this.rowData.enduseroperatorInform : ''],
      tatType: [this.rowData ? this.rowData.tatType : ''],
      Information: [this.rowData ? this.rowData.Information : ''],
      sapcontractNum: [this.rowData ? this.rowData.sapcontractNum : ''],
      mkVerification: [this.rowData ? this.rowData.mkVerification : ''],
      certificationRequired: [this.rowData ? this.rowData.certificationRequired : ''],
      exportVerification: [this.rowData ? this.rowData.exportVerification : ''],
      bulletinsRequested: [this.rowData ? this.rowData.bulletinsRequested : ''],
      maintainRequirements: [this.rowData ? this.rowData.maintainRequirements : ''],
      outgoingpartNum: [this.rowData ? this.rowData.outgoingpartNum : ''],
    });
  }
  customerForm() {
    this.formData = {
      "soldTo": this.CustomerForm.get("soldTo").value,
      "routingInstructions": this.CustomerForm.get("routingInstructions").value,
      "billtoPayer": this.CustomerForm.get("billtoPayer").value,
      "Other": this.CustomerForm.get("Other").value,
      "shipTo": this.CustomerForm.get("shipTo").value,
      "shipping": this.CustomerForm.get("shipping").value,
      "attachments": this.CustomerForm.get("attachments").value,
      "customerNotes": this.CustomerForm.get("customerNotes").value,
      "customerRequest": this.CustomerForm.get("customerRequest").value,
      "priorityCode": this.CustomerForm.get("priorityCode").value,
      "tatRequired": this.CustomerForm.get("tatRequired").value,
      "enduseroperatorInform": this.CustomerForm.get("enduseroperatorInform").value,
      "tatType": this.CustomerForm.get("tatType").value,
      "Information": this.CustomerForm.get("Information").value,
      "sapcontractNum": this.CustomerForm.get("sapcontractNum").value,
      "mkVerification": this.CustomerForm.get("mkVerification").value,
      "certificationRequired": this.CustomerForm.get("certificationRequired").value,
      "exportVerification": this.CustomerForm.get("exportVerification").value,
      "bulletinsRequested": this.CustomerForm.get("bulletinsRequested").value,
      "maintainRequirements": this.CustomerForm.get("maintainRequirements").value,
      "outgoingpartNum": this.CustomerForm.get("outgoingpartNum").value,


    }
    console.log("check form data " + JSON.stringify(this.formData))
  }


}
