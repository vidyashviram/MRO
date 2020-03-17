import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
declare var require: any;
let sweetalert = require('sweetalert');

@Component({
  selector: 'app-email-config',
  templateUrl: './email-config.component.html',
  styleUrls: ['./email-config.component.css']
})
export class EmailConfigComponent implements OnInit {
  showTemplate: any = false;
  dataUpdated: boolean = false;
  fileName: string;
  fileInfo: any;
  fileData: any;
  file: File;
  displayLoading: boolean = false;
  getdata: any;

  @Input() tableData: {
    data: [],
    headData: []
  }[];
  @Input() tableFrom: string;
  @Output() showEdit = new EventEmitter();
  @Input() editable: boolean;
  @Input() deletable: boolean;
  @Input() updateRow: boolean;
  @Output() customerEvent = new EventEmitter();
  getPage: any;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadMailTemplate(this.tableData, this.tableFrom);
    this.getPage = this.tableFrom;
  }

  loadMailTemplate(obj, from) {
    this.displayLoading = false;
    this.getdata = obj
  }

  displayFailureAlert() {
    sweetalert("Failed", {
      title: "Plant Configuration",
      text: "Error in creating the Plant Configuration. Please try again later.",
      icon: "warning",
    });
    this.displayLoading = false;
  }

  addMailTemplate() {
  }

  editRow(data) {
    console.log("check edit data " + JSON.stringify(data))
    this.showEdit.emit(data);
  }


}
