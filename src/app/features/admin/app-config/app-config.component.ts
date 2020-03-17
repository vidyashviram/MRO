import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { items } from 'src/assets/admin/data/appconfigData';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.css']
})
export class AppConfigComponent implements OnInit {

  alert = sweetalert;
  items = items;
  tableData: any;
  tableFrom: string;
  display: boolean = false;
  displayLoading: boolean = false;
  addDBServer: boolean = false;
  addLDAPServer: boolean = false;
  addSMTPServer: boolean = false;
  addDBBtn: boolean= false;
  addSMTPBtn: boolean = false;
  addLDAPBtn: boolean = false;
  loadTable: boolean = false;
  editDialog: any;
  editRowData: any;
  editRow: boolean;
  tabIndex = 0;
  formData: any;
 

  constructor(private adminServ: AdminService, private router: Router,
    private route: ActivatedRoute, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.tabIndex = Number(this.route.snapshot.paramMap.get('id'));
    if (this.tabIndex || this.tabIndex == 0) {
      let evt: any = { "tab": { "textLabel": items[this.tabIndex]['label'] } };
      this.onTabChanged(evt);
    }
  }

  onTabChanged(evt) {
    this.displayLoading = true;
    this.editDialog = false;
    this.addDBServer = false;
    this.addSMTPServer = false;
    this.addLDAPServer = false;
    if (evt.index)
      this.tabIndex = evt.index;
    if (evt.tab.textLabel == "DB Server Config") {
      this.addDBServer = false;
      this.getTabData('getDBServerData', 0);
    } else if (evt.tab.textLabel == "SMTP Server Config") {
      this.getTabData('getSMTPServerData',1);
      this.addSMTPServer = false;
    } else if (evt.tab.textLabel == "Active Directory") {
      this.getTabData('getActiveDirServerData',2);
      this.addLDAPServer = false;
    }
  }

  getTabData(funName,from) {
    this.loadTable = false;
    this.adminServ[funName]().subscribe(data => {
      this.displayLoading = false;
      this.tableData = data;
      this.tableFrom = funName;

      if(from == 0){
        this.addDBBtn = true;
      }else if(from == 1){
        this.addSMTPBtn = true;
      }else if(from == 2){
        this.addLDAPBtn = true;
      }
    },
      error => {
        console.log(error);
        this.displayLoading = false;
        this.alert("Failed performing the operation", {
          icon: "warning",
        });

        if(from == 0){
          this.addDBBtn = false;
        }else if(from == 1){
          this.addSMTPBtn = false;
        }else if(from == 2){
          this.addLDAPBtn = false;
        }
      },
      () => {
        this.loadTable = true;
      }
    )
  }

  showDialog(action) {
    this.editRow = false;
    if (action == "addDBServer") {
      this.addDBServer = true;
    }
    else if (action == "addSMTPServer") {
      this.addSMTPServer = true;
    }
    else if (action == "addLDAPServer") {
      this.addLDAPServer = true;
    }
  }

 
  showEditDialog(data){
    this.editRow = true;
    if(!this.addLDAPServer && this.tabIndex==2){
    this.editRowData=data; 
    this.addLDAPServer=true;
    }else if(!this.addSMTPServer && this.tabIndex==1){
     this.editRowData=data; 
     this.addSMTPServer=true;
    }else if(!this.addDBServer && this.tabIndex==0){
     this.editRowData=data; 
     this.addDBServer=true;
    }  
  }   

}
