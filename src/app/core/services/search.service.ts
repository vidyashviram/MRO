import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Component, Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Configuration } from '../../config/app-settings.config';

@Injectable({
    providedIn: 'root'
})

export class SearchService {
    constructor(private http: Http, private Configuration: Configuration) { }


    getDropdownWorkorder() {
        return this.http.get(this.Configuration.DropdownWorkorder, { withCredentials: true }).pipe(map((response: Response) => {
            return response.json();
        }),
            catchError(this.handleError));
    }

    getDropdownCustomer() {
        return this.http.get(this.Configuration.DropdownCustomer, { withCredentials: true }).pipe(map((response: Response) => {
            return response.json();
        }),
            catchError(this.handleError));
    }
 
    getDropdownPartName() {
        return this.http.get(this.Configuration.DropdownPartname, { withCredentials: true }).pipe(map((response: Response) => {
            return response.json();
        }),
            catchError(this.handleError));
    }

    getDropdownPartNumber() {
        return this.http.get(this.Configuration.DropdownPartnum, { withCredentials: true }).pipe(map((response: Response) => {
            return response.json();
        }),
            catchError(this.handleError));
    }

    getDropdownStatus() {
        return this.http.get(this.Configuration.DropdownStatus, { withCredentials: true }).pipe(map((response: Response) => {
            return response.json();
        }),
            catchError(this.handleError));
    }

    getDropdownMaterial() {
        return this.http.get(this.Configuration.DropdownMaterial, { withCredentials: true }).pipe(map((response: Response) => {
            return response.json();
        }),
            catchError(this.handleError));
    }

    getDropdownDistributionChannel() {
        return this.http.get(this.Configuration.DropdownDistribution, { withCredentials: true }).pipe(map((response: Response) => {
          return response.json();
        }),
          catchError(this.handleError));
      }

      getdashboardSearchData(requestData) {
        return this.http.post(this.Configuration.DashboardRequestSearchData, requestData, { withCredentials: true })
          .pipe(map((response: Response) => {
            let res = response.json();
            return res;
          }));
      }







    private handleError(error: Response) {
        try {
            console.error(error);
            let errorO = {
                msg: (<any>error)._body,
                status: error.status,
                code: error.status
            };
            return observableThrowError(errorO);
        } catch (error) {
        }
    }

}