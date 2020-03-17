import { Component, OnInit } from '@angular/core';
import { workOrder } from 'src/app/shared/interfaces/work-order-table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-order-table',
  templateUrl: './work-order-table.component.html',
  styleUrls: ['./work-order-table.component.css']
})
export class WorkOrderTableComponent implements OnInit {
  items: workOrder[];

  cols: any[];
  public tableData: any;
  public rowGroupMetadata: any;
  public selectedRow: any;
  selectedCustomer: any;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.items = [
      { PartNumber: '2312345', CustomerName: 'US Airways', PartName: 'Tier', PO: 54657, SO: 8564665, Status: 'Pending release to shop', WarrantyRequested: 'yes', RedBag: 'yes', DueDate: '3/21/2020', },
      { PartNumber: '3454656', CustomerName: 'Emirates', PartName: 'Engine', PO: 76576, SO: 8654654, Status: 'Evaluation', WarrantyRequested: 'No', RedBag: 'No', DueDate: '3/17/2020', },
      { PartNumber: '5654654', CustomerName: 'Qater Airways', PartName: 'Tier', PO: 76677, SO: 5464556, Status: 'Eval complete unworkable', WarrantyRequested: 'yes', RedBag: 'Yes', DueDate: '2/15/2020', },
      { PartNumber: '7856786', CustomerName: 'Thai Airways', PartName: 'Engine', PO: 67867, SO: 4564545, Status: 'Repair/final/test/certification', WarrantyRequested: 'yes', RedBag: 'Yes', DueDate: '1/10/2020', },
      { PartNumber: '5654654', CustomerName: 'Emirates', PartName: 'Tier', PO: 67869, SO: 4564547, Status: 'TECO not shipped', WarrantyRequested: 'No', RedBag: 'Yes', DueDate: '1/9/2020', },
    ];
    this.cols = [
      { field: 'PartNumber', header: 'Part Number' },
      { field: 'CustomerName', header: 'Customer Name ' },
      { field: 'PartName', header: 'Part Name' },
      { field: 'PO', header: 'PO#' },
      { field: 'SO', header: 'SO#' },
      { field: 'WarrantyRequested', header: 'Warranty Requested' },
      { field: 'RedBag', header: 'Red Bag' },
      { field: 'DueDate', header: ' Due Date' },

    ]
  }

  onSelected($event){
    
    this.router.navigate(["home/workOrders/workorder-repair"]);  
  }

}
