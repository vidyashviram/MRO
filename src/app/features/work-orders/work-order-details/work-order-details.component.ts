import { Component, OnInit } from '@angular/core';
import { workorderitems } from '../../../../assets/constants/work-order-data';

@Component({
  selector: 'app-work-order-details',
  templateUrl: './work-order-details.component.html',
  styleUrls: ['./work-order-details.component.css']
})
export class WorkOrderDetailsComponent implements OnInit {

  pageTitle = "Workorders";
  workorderitems = workorderitems;

  constructor() { }

  ngOnInit() {
  }

}
