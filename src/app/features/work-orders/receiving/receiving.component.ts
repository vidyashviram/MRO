import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.css']
})
export class ReceivingComponent implements OnInit {
  receivingForm: FormGroup;
  @Input() rowData: any;
  formData: any;
  paramName: any = 'abc';
  fieldsArray: any = [
    { "label": "Staus Work", "type": "select", "control": "Statuswork", options: [{ "label": "01- Normal Pair", "value": "01-Normal Pair" }, { "label": "02-MRO Lease", "value": "02-MRO Lease" }, { "label": "03-MRO Exchange", "value": "03-MRO Exchange" }, { "label": "04-MRO Advanced Exchange", "value": "04-MRO Advanced Exchange" }] },
    { "label": " Distribution Channel", "type": "select", "control": "distributionChannel", options: [{ "label": "01-CommercialAeroSpace", "value": "01-CommercialAeroSpace" }, { "label": "01-CommercialAeroSpace", "value": "01-CommercialAeroSpace" }, { "label": "02-MilitaryNon-US", "value": "02-MilitaryNon-US" }, { "label": "02-Military-US", "value": "02-Military-US" }] },
    { "label": "Warrant Requested", "type": "select", "control": "warrantRequested", options: [{ "label": "yes", "value": "Yes" }, { "label": "No", "value": "No" }] },
    { "label": "Job Category", "type": "text", "control": "jobCategory" },
    { "label": "Container Reusable", "type": "select", "control": "containerReusable", options: [{ "label": "Yes", value: "Yes" }, { "label": "No", "value": "No" }] },
    { "label": "Work Scope", "type": "text", "control": "workScope" },
    { "label": "Unit Damaged", "type": "select", "control": "unitDamaged", options: [{ "label": "Yes", value: "Yes" }, { "label": "No", value: "No" }] },
    { "label": "Notes", "type": "text", "control": "materialNotes" },

  ]


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

    createForm() {

      this.receivingForm = this.fb.group({
        Statuswork: [this.rowData ? this.rowData.Statuswork : ''],
        distributionChannel: [this.rowData ? this.rowData.distributionChannel : ''],
        warrantRequested: [this.rowData ? this.rowData.warrantRequested : ''],
        jobCategory: [this.rowData ? this.rowData.jobCategory : ''],
        containerReusable: [this.rowData ? this.rowData.containerReusable : ''],
        workScope: [this.rowData ? this.rowData.workScope : ''],
        unitDamaged: [this.rowData ? this.rowData.unitDamaged : ''],
        materialNotes: [this.rowData ? this.rowData.materialNotes : ''],
      });
  
    }

    submitForm() {
      this.formData = {
        "Statuswork": this.receivingForm.get("Statuswork").value,
        "distributionChannel": this.receivingForm.get("distributionChannel").value,
        "warrantRequested": this.receivingForm.get("warrantRequested").value,
        "jobCategory": this.receivingForm.get("jobCategory").value,
        "containerReusable": this.receivingForm.get("containerReusable").value,
        "workScope": this.receivingForm.get("workScope").value,
        "unitDamaged": this.receivingForm.get("unitDamaged").value,
        "materialNotes": this.receivingForm.get("materialNotes").value,
  
  
      }
     
    }

  ngOnInit() {
    this.createForm()
  }

}
