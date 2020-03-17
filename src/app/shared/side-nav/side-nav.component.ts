import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  
  private menuItem = [
    {
      link:"home/dashboard",
      icon:'/assets/side-navigation/dashboard_icon.png',
      selected:'/assets/side-navigation/dashboard_icon_selected.png',
      label:'Dashboard'
    },
    {
      link:"home/workOrders/workorder",
      icon:'/assets/side-navigation/workorder_icon.png',
      selected:'/assets/side-navigation/workorder_icon_selected.png',
      label:'Work Orders'
    },
    {
      link:"home/workOrders",
      icon:'/assets/side-navigation/sec&Planing_icon.png',
      selected:'/assets/side-navigation/sec&Planing_icon_selected.png',
      label:'Scheduling & Planning'
    },
    {
      link:"home/workOrders",
      icon:'/assets/side-navigation/digitalForm_icon.png',
      selected:'/assets/side-navigation/digitalForm_icon_selected.png',
      label:'Digital Forms'
    },
    {
      link:"home/workOrders",
      icon:'/assets/side-navigation/repair_icon.png',
      selected:'/assets/side-navigation/repair_icon_selected.png',
      label:'Repair'
    },
    {
      link:"home/warranty",
      icon:'/assets/side-navigation/quot_icon.png',
      selected:'/assets/side-navigation/quot_icon_selected.png',
      label:'Warranty'
    },
    {
      link:"home/workOrders",
      icon:'/assets/side-navigation/cmm_icon.png',
      selected:'/assets/side-navigation/cmm_icon_selected.png',
      label:'CMM'
    },
    {
      link:"home/workOrders",
      icon:'/assets/side-navigation/qualitycheck_icon.png',
      selected:'/assets/side-navigation/qualitycheck_icon_selected.png',
      label:'Quality Checks'
    },
    {
      link:"home/workOrders",
      icon:'/assets/side-navigation/invoice&reports_icon.png',
      selected:'/assets/side-navigation/invoice&reports_icon_selected.png',
      label:'Invoice & Reports'
    },
    {
      link:"home/search",
      icon:'/assets/side-navigation/search_icon.png',
      selected:'/assets/side-navigation/admin_icon_selected.png',
      label:'Search'
    },
    {
      link:"home/admin",
      icon:'/assets/side-navigation/admin_icon.png',
      selected:'/assets/side-navigation/admin_icon_selected.png',
      label:'Administrator'
    }

  ]
  // @ViewChild('drawer',{static: false}) public drawer: MatDrawer;
  constructor() { }

  ngOnInit() {
  }

}
