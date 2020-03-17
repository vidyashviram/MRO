import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkOrderService } from '../../core/services/workorder.service';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.css']
})
export class WorkOrdersComponent implements OnInit {

  reqData:any
  pageTitle = "WorkOrders";
  workorderForm: FormGroup;
  Data: Array<any> = [
    { name: 'Check Part No', value: 'checkpartnumber'  },
    { name: 'Facility Capability', value: 'facilitycapability' },
    { name: 'Engineering Check', value: 'Engineering' },
  ];

  constructor(private fb: FormBuilder, private router: Router, private workorderService: WorkOrderService) { }

  createForm() {
    this.workorderForm = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })

  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.workorderForm.get('checkArray') as FormArray;
   
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      }); 
    }
  }

  searchByPartNum(partNum){
    this.workorderService.searchByPartNum(partNum).subscribe(res => {
     console.log((res)) 
    });

  } 


  submitForm() {
  
    this.router.navigate(["home/workOrders/workorder-details"]);

  }

  ngOnInit() {
    this.createForm();
  }

}
