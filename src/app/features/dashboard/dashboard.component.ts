import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Router } from '@angular/router';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardGridRequest: any[];
  tiles: any[];
  cardContents: any[];

  initialiseCardContents(count) {
    this.cardContents = [
      {
        icon: "/assets/dashboard/Status-of-each-Gate.png",
        title: 'Status of each Gate',
        count: '22',
        id: '1'
      },
      {
        icon: "/assets/dashboard/Critical-LRU.png",
        title: 'Crtical LRU',
        count: '154',
        id: '2'
      },
      {
        icon: "/assets/dashboard/Daily-Demand.png",
        title: 'Daily Demand',
        count: '',
        description: 'Progress',
        id: '3'
      },
      {
        icon: "/assets/dashboard/Daily-Output.png",
        title: 'Daily Output',
        count: '40',
        id: '4'
      },
      {
        icon: "/assets/dashboard/Delivery-Performance.png",
        title: 'Delivery Performance',
        count: '06',
        id: '5'
      },
      {
        icon: "/assets/dashboard/OC-PC.png",
        title: 'OC PC',
        description: 'NA',
        id: '6'
      },
      {
        icon: "/assets/dashboard/OTD.png",
        title: 'OTD',
        description: 'NA',
        id: '7'
      },
      {
        icon: "/assets/dashboard/WIP.png",
        title: 'WIP',
        // description: 'Not Enough Information',
        id: '8'
      },
      {
        icon: "/assets/dashboard/Customer-Data.png",
        title: 'Customer Data',
        count: count['customerCount'],
        id: '9'
      },
      {
        icon: "/assets/dashboard/Program-Data.png",
        title: 'Program Data',
        count: '09',
        id: '10'
      },
      {
        icon: "/assets/dashboard/LRU.png",
        title: 'LRU',
        // description: 'Configuration required',
        id: '11'
      },
      {
        icon: "/assets/dashboard/Repair.png",
        title: 'Repair',
        count: count['repairCount'],
        id: '12'
      },
      {
        icon: "/assets/dashboard/Open-Work-Orders.png",
        title: 'Open Work Orders',
        count: count['openWordorderCount'],
        id: '13'
      },
      {
        icon: "/assets/dashboard/High-Priority.png",
        title: 'High Priority',
        // description: 'Priority',
        id: '14',
        count: count['highPriority']
      },
      {
        icon: "/assets/dashboard/Closed-Work-Orders.png",
        title: 'Closed Work Orders',
        count: '15',
        id: '15'
      },
      {
        icon: "/assets/dashboard/Work-Request.png",
        title: 'Work Request',
        count: '52',
        id: '16'
      },
      {
        icon: "/assets/dashboard/All-Asset.png",
        title: 'All Asset',
        count: '08',
        id: '17'
      },
      {
        icon: "/assets/dashboard/Task.png",
        title: 'Tasks',
        count: '15',
        id: '18'
      },
      {
        icon: "/assets/dashboard/Red-Flag.png",
        title: 'Red Flag Customers',
        count: '22',
        id: '19' 
      },

    ]

  }



  constructor(private dashboardService: DashboardService,private router: Router) { }

  callDashboardApi() {
    this.dashboardService.getdashboardGridData().subscribe(res => {

      this.dashboardGridRequest = res;
      this.initialiseCardContents( this.dashboardGridRequest);
    }, error => {

      this.displayFailureAlert();
    });
  }

  displayFailureAlert() {
    sweetalert("Failed performing the operation", {
      icon: "warning",
    });
    //  this.displayLoading = false;
  }

  gridClick(getId, title) {
    sessionStorage.setItem("title", title);
    sessionStorage.setItem("id", getId);
    this.router.navigate(["home/dashboard/dashboardtable"]);
  }

  ngOnInit() {
     this.callDashboardApi();
  }

}
