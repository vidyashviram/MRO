import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Configuration } from 'src/app/config/app-settings.config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  headData: any;

  private templateChange: BehaviorSubject<null> = new BehaviorSubject(null);
  constructor(private http: HttpClient, private Configuration: Configuration) { }

  
  public getDashboardData() {
    return this.http.get("assets/constants/dashboarddata.json");
  }

  public getListData() {
    return this.templateChange.asObservable();

  }
  public setListData(data) {
    return this.templateChange.next(data)
  }

  //User Config Api's
  public getUsersData() {
    return this.http.get(this.Configuration.GetUserData)
  }

  public getUserDropdown() {
    return this.http.get("../../../assets/admin/data/dropdownData.json");

      // return this.http.get(this.Configuration.DropdownUser, { withCredentials: true }).pipe(map((response: Response) => {
      //   return response;
      // }),
      //   catchError(this.handleError));
  }
  

  public addUserData(requestData) {
    return this.http.post(this.Configuration.AddUserData, requestData, { withCredentials: true })
      .pipe(map((response: Response) => {
        return response;
      }));
  }

  public deleteUserData(userId: any, userStatus) {
    return this.http.get(this.Configuration.DeleteUserData + '?userId=' + userId + '&status=' + userStatus)
  }
  //User Config Api's ends

  //Role config  Api's
  public getRoleData() {
    //return this.http.get("assets/constants/roleData.json");
    return this.http.get(this.Configuration.GetRoleData)
  }

  public addRoleData(requestData) {
    return this.http.post(this.Configuration.AddRoleData, requestData, { withCredentials: true })
      .pipe(map((response: Response) => {
        return response;
      }));
  }

  public deleteRoleData(userId: any, userStatus) {
    return this.http.get(this.Configuration.DeleteRoleData + '?roleId=' + userId + '&status=' + userStatus)
  }
  //Role config Ends

  //Supplier Config api's
  public getSupplierData() {
    //return this.http.get("assets/constants/supplierData.json");
    return this.http.get(this.Configuration.GetSupplierData)
  }

  public addSupplierData(requestData) {
    return this.http.post(this.Configuration.AddSupplierData, requestData);;
  }

  public deleteSupplierData(custId: any) {
    return this.http.get(this.Configuration.DeleteSupplierData + '?supplierID=' + custId)
  }

  public updateSupplierData(custId: any) {
    return this.http.get(this.Configuration.UpdateSupplierData + '?supplierID=' + custId)
  }


  //Customer Config api's STARTS
  public getCustomersData() {
    //return this.http.get("assets/constants/customerData.json");
    return this.http.get(this.Configuration.GetCustomerData)
  }

  public addCustomerData(requestData) {
    return this.http.post(this.Configuration.AddCustomerData, requestData);;
  }

  public deleteCustomerData(custId: any) {
    return this.http.get(this.Configuration.DeleteCustomerData + '?customerID=' + custId)
  }

  public updateCustomerData(custId: any) {
    return this.http.get(this.Configuration.UpdateSupplierData + '?customerID=' + custId)
  }

  public inactiveConfigData(custId: any) {
    return this.http.get(this.Configuration.DeleteCustomerData + '?customerID=' + custId)
  }
  //Customer Config api's ENDS


  //Plant Config api's Starts
  public getPlantData() {
    // return this.http.get("assets/constants/plantData.json")
    return this.http.get(this.Configuration.GetPlantData)

    //  .pipe(map((response: Response) => {
    //    let res={};
    //    res['data'] = response['data'];
    //    res['headData'] = this.headData;
    //    return res;
    //}));
  }

  public addPlantData(requestData) {
    return this.http.post(this.Configuration.AddPlantData, requestData, { withCredentials: true })
      .pipe(map((response: Response) => {
        return response;
      }));
  }

  public getPlantDropdown() {
    return this.http.get(this.Configuration.DropdownDistribution, { withCredentials: true }).pipe(map((response: Response) => {
      return response;
    }),
      catchError(this.handleError));
  }

  public deletePlantData(plantId: any, custStatus) {
    return this.http.get(this.Configuration.DeletePlantData + '?plantId=' + plantId + '&isActive=' + custStatus);
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
  //Plant Config api's ends

  //Application Configuration
  //DB server config
  public getDBServerData() {
    return this.http.get(this.Configuration.GetdbserverData)
  }
  public addDBServerData(requestData) {
    return this.http.post(this.Configuration.AdddbserverData, requestData);;
  }

  //SMTP server config
  public getSMTPServerData() {
    return this.http.get(this.Configuration.GetsmtpserverData)
  }

  public addSMTPServerData(requestData) {
    return this.http.post(this.Configuration.AddsmtpserverData, requestData);;
  }

  //Active Directory server config
  public getActiveDirServerData() {
    return this.http.get(this.Configuration.GetldapserverData)
  }

  public addActiveDirectoryServerData(requestData) {
    return this.http.post(this.Configuration.AddldapserverData, requestData);;
  }

   //Mail Template api's STARTS
   public getEmailData() {
    return this.http.get(this.Configuration.GetEmailTemplateData)
  }

  public addEMailData(requestData) {
    return this.http.post(this.Configuration.AddEmailTemplateData, requestData);;
  }

  public deleteMailData(custId: any) {
    return this.http.get(this.Configuration.DeleteCustomerData + '?customerID=' + custId)
  }
  //Mail Template api's ENDS
}
