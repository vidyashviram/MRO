import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Component, Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Configuration } from '../../config/app-settings.config';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  constructor(private http: Http, private Configuration: Configuration) { }


  getdashboardGridData() {
    return this.http.get(this.Configuration.DashboardGridData)
      .pipe(map((response: Response) => {
        let res = response.json();
        return res;
      }));
  }

  getdashboardTableData(id) {
    let ip;
    if (id == 14) {
      ip = this.Configuration.DashboardSubGridHighPriority
    } else if (id == 13) {
      ip = this.Configuration.DashboardSubGridOpenworkOrder
    } else if (id == 12) {
      ip = this.Configuration.DashboardSubGridRepairdata
    } else if (id == 13) {
      ip = this.Configuration.DashboardSubGridCustomerdata
    }

    return this.http.get(ip)
      .pipe(map((response: Response) => {
        let res = response.json();
        return res;
      }));
  }
}