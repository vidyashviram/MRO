import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-aircraft-disposition',
  templateUrl: './aircraft-disposition.component.html',
  styleUrls: ['./aircraft-disposition.component.css']
})
export class AircraftDispositionComponent implements OnInit {
  AircraftForm:FormGroup;
  @Input() rowData: any;
  MaterialsArray: any = [
    { "label": "Air Craft Type", "type": "text", "control": "aircraftType" },
    { "label": "Engine Type", "type": "text", "control": "engineType" },
    { "label": "Air Craft Serial Number", "type": "text", "control": "aircraftserialNum" },
    { "label": "Engine Serial Number", "type": "text", "control": "engineserialNum" },
    { "label": "Removal Tail Number", "type": "text", "control": "removaltailNum" },
    { "label": "Service Cycles", "type": "text", "control": "serviceCycles" },
    { "label": "Original Tail Number", "type": "text", "control": "originaltailNum" },
    { "label": "Tail Number Verification (check box)", "type": "text", "control": "tailnumberVerification" },
  ]

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

  aircraftForm(){
    this.AircraftForm=this.fb.group({
      aircraftType: [this.rowData ? this.rowData.aircraftType : ''],
           engineType: [this.rowData ? this.rowData.engineType : ''],
      aircraftserialNum: [this.rowData ? this.rowData.aircraftserialNum : ''],
      engineserialNum: [this.rowData ? this.rowData.engineserialNum : ''],
      removaltailNum: [this.rowData ? this.rowData.removaltailNum : ''],
      serviceCycles: [this.rowData ? this.rowData.serviceCycles : ''],
      originaltailNum: [this.rowData ? this.rowData.originaltailNum : ''],
      tailnumberVerification: [this.rowData ? this.rowData.tailnumberVerification : ''],
      // conditionofthePart: [this.rowData ? this.rowData.conditionofthePart : ''],
      // shopNotes: [this.rowData ? this.rowData.shopNotes : ''],
        })
      }

  ngOnInit() {
    this.aircraftForm();
  }

}
