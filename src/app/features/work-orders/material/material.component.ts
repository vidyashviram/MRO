import { Component, OnInit } from '@angular/core';
import { Materialitems } from '../../../../assets/constants/material-data';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  Materialitems = Materialitems;
  paramName: any = 'abc';

  constructor() { }

  ngOnInit() {
  }

}
