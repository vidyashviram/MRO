import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

    // public LkUpServer = 'http://192.168.34.114:8083/'
    // public DomainServerApi = 'http://192.168.34.114:8082/'
    // public DashboardServerApi = 'http://192.168.34.114:8081/'
    // public UserMgntServerApi = 'http://192.168.34.114:8085/'
    // public AdminServerApi = 'http://192.168.34.114:8086/'
    // public SearchServerApi =  'http://192.168.34.162:8081/'



    public LkUpServer = 'http://192.168.34.114:8083/'
    public DomainServerApi = 'http://192.168.34.114:8082/'
    public DashboardServerApi = 'http://192.168.34.114:8081/'
    public UserMgntServerApi = 'http://192.168.34.114:8085/'
    public AdminServerApi = 'http://192.168.34.114:8086/'
    public SearchServerApi = 'http://192.168.34.114:8087/'
    public emailServerApi = 'http://192.168.34.114:8086/'
    public workOrderServerApi = 'http://192.168.37.168:9099/'


    //Dropdown api's
    public DropdownCustomer = this.LkUpServer + 'getLkupCustomers';
    public DropdownDistribution = this.DomainServerApi + 'getDistChannelList';
    public DropdownStatus = this.DomainServerApi + 'getWorkStatusList';
    public DropdownWorkorder = this.SearchServerApi + 'getWorkOrderSearchList';
    public DropdownMaterial = this.DomainServerApi + 'getMaterialList';
    public DropdownPartname = this.DomainServerApi + 'getPartNameList';
    public DropdownPartnum = this.DomainServerApi + 'getPartNumList?partName=Engine';

    public DashboardRequestSearchData = this.SearchServerApi + 'getSearchResponse';


    //Dashboard api's
    public DashboardGridData = this.DashboardServerApi + 'dashboardCount';
    public DashboardSubGridHighPriority = this.DashboardServerApi + 'highPriorityData';
    public DashboardSubGridOpenworkOrder = this.DashboardServerApi + 'openWorkOrdersData';
    public DashboardSubGridRepairdata = this.DashboardServerApi + 'repairData';
    public DashboardSubGridCustomerdata = this.DashboardServerApi + 'customerData';
    public DashboardTableRequests = this.DashboardServerApi + 'DashBoard/FetchMyRequests';

    public GetDataByPartNum = this.workOrderServerApi + 'workOrders/searchPartNumber';

    //User Config
    public GetUserData = this.UserMgntServerApi + 'admin/getUserData';
    public AddUserData = this.UserMgntServerApi + 'admin/saveUserData';
    public DeleteUserData = this.UserMgntServerApi + 'admin/deleteUserData';
    public DropdownUser = this.UserMgntServerApi + 'admin/roleDropDown'

    //Role Config
    public GetRoleData = this.UserMgntServerApi + 'admin/getRoleData';
    public AddRoleData = this.UserMgntServerApi + 'admin/saveRoleData';
    public DeleteRoleData = this.UserMgntServerApi + 'admin/deleteRoleData';

    //Admin Plant Config
    public GetPlantData = this.AdminServerApi + 'admin/plantConfigListPage';
    public AddPlantData = this.AdminServerApi + 'admin/savePlantConfig';
    public DeletePlantData = this.AdminServerApi + 'admin/deactivePlantConfig';


    //Admin Customer Config
    public GetCustomerData = this.AdminServerApi + 'admin/customerList';
    public AddCustomerData = this.AdminServerApi + 'admin/addCustomerDetails';
    public UpdateCustomerData = this.AdminServerApi + 'admin/editCustomerDetails';
    public DeleteCustomerData = this.AdminServerApi + 'admin/deleteCustomerDetails';

    //Admin Supplier Config
    public GetSupplierData = this.AdminServerApi + 'admin/supplierList';
    public AddSupplierData = this.AdminServerApi + 'admin/addSupplierDetails';
    public UpdateSupplierData = this.AdminServerApi + 'admin/updateSupplierDetails';
    public DeleteSupplierData = this.AdminServerApi + 'admin/deleteSupplierDetails';


    //Application Configuration
    public GetdbserverData = this.AdminServerApi + 'admin/getDBServerConfigList';
    public AdddbserverData = this.AdminServerApi + 'admin/addDbServerDetails';
    public GetsmtpserverData = this.AdminServerApi + 'admin/getSMTPServerList';
    public AddsmtpserverData = this.AdminServerApi + 'admin/addSmtpServerDetails';
    public GetldapserverData = this.AdminServerApi + 'admin/getLdapList';
    public AddldapserverData = this.AdminServerApi + 'admin/addLdapServerDetails';

    //Mail Template
    public GetEmailTemplateData = this.emailServerApi + 'admin/emailTemplateList';
    public AddEmailTemplateData = this.emailServerApi + 'admin/saveEmailTemplate';
    public EditEmailTemplateData = this.emailServerApi + 'admin/editEmailTemplate?templateId=1';


    //String Constants User Config
    public userName = "User Name";
    public roleName = "Role Name";
    public userRole = "User Role";
    public userCreateddate = "Active Date";
    public userEmail = "Email";

    //String Constants Plant Config
    public plantId = "Plant Id";
    public plantName = "Plant Name";
    public plocation = "Location";
    public plantNum = "Plant #";
    public preceiveddate = "Active Date";
    public ptype = "Plant Type";
    public pdistributionchannel = "Distribution Channel";
    public pTemplate = "Template";
    public pDivision = "Division";
    public pSalesOrg = "Sales Organisation"

    //String Constants Customer Config
    public custid = "Customer Id";
    public custName = "Customer Name";
    public custPhone = "Contact #";
    public cpartNo = "Part #";
    public createdDate = "Active Date";
    public custAddress = "Address";
    public custEmail = "Email";
    public custPo = "Customer #";
    public shipTo = "Ship To";
    public billTo = "Bill To"

    //String Constants Supplier Config
    public supplierName = "Supplier/Company Name";
    public supplierPhone = "Contact #";
    public screatedDate = "Active Date";
    public supplierAddress = "Address";
    public supplierEmail = "Email";

    //String Constants SMTP Server Config
    public smtpuserName = "User Name";
    public smtpsmtpServer = "Server Name";
    public smtpconnectionSecurity = "Connection Security";
    public smtpauthenticationMethod = "Authentication Method";
    public smtpport = "Port";

    //String Constants DB Server Config
    public dbuserName = "User Name";
    public dbdbUrl = "DB URL";
    public dbdataBaseName = "Database Name";

    //String Constants LDAP Server Config
    public ldapuserName = "User Name";
    public ldapProtocol = "Protocol";
    public ldapDomain = "Domain";
    public ldapHost = "Host Name";
}