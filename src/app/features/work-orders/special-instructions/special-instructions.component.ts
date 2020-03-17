import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-special-instructions',
  templateUrl: './special-instructions.component.html',
  styleUrls: ['./special-instructions.component.css']
})
export class SpecialInstructionsComponent implements OnInit {
  SpecialForm:FormGroup;
  @Input() rowData: any;
  MaterialinstructionArray: any = [
    { "label": "Condition Of The Part", "type": "text", "control": "conditionofthePart" },
    { "label": "Shop Notes", "type": "text", "control": "shopNotes" },
    { "label": "Customer Instructions", "type": "text", "control": "customerInstructions" },
    { "label": "Special Instructions", "type": "text", "control": "specialInstructions" },
    { "label": "Waranty Information", "type": "text", "control": "warantyInform" },
    { "label": "Notes", "type": "text", "control": "warantyNotes" },
  ]
  

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

    specialForm(){
      this.SpecialForm=this.fb.group({
        conditionofthePart: [this.rowData ? this.rowData.conditionofthePart : ''],
        shopNotes: [this.rowData ? this.rowData.shopNotes : ''],
        customerInstructions: [this.rowData ? this.rowData.customerInstructions : ''],
        specialInstructions: [this.rowData ? this.rowData.specialInstructions : ''],
        warantyInform: [this.rowData ? this.rowData.warantyInform : ''],
        warantyNotes: [this.rowData ? this.rowData.warantyNotes : ''],
       
      })
    }

    submitSpecialForm(){
      this.router.navigate(["home/workOrders/workorder-table"])
    }

  ngOnInit() {
    this.specialForm();
  }

}
