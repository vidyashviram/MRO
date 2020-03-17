import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  copyRightVersion :any;
  year:any;
  constructor() { }

  ngOnInit() {
    let today = new Date();
    let year = today.getUTCFullYear();
    this.copyRightVersion = year;

  }

}
