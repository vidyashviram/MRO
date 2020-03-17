import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Component, Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Configuration } from '../../config/app-settings.config';

@Injectable({
    providedIn: 'root'
})

export class WorkOrderService {
    constructor(private http: Http, private Configuration: Configuration) { }


    searchByPartNum(partNum) {

        return this.http.get(this.Configuration.GetDataByPartNum + '?partNum=' + partNum + '&serialId=10012' )
        // return this.http.get(this.Configuration.GetDataByPartNum + '?partNum=' + partNum + '&serialId=10012' ).pipe(map((response: Response) => {
        //     return response.json();
        //   }));
            // catchError(this.handleError);
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