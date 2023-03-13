import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanMaintenanceService {
  _planMaintenancesURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._planMaintenancesURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/PlanMaintenance`;
  }

  createPlanMaintenance(paramter:any):Observable<any>{
    return this.httpService.post(this._planMaintenancesURL+ "/Create",paramter );
  }
  getAllVehiclePlanMaintenanceActive():Observable<any>{
    return this.httpService.get(this._planMaintenancesURL+ "/GetAllPlanMaintenanceActiveTemplate" );
  }
  createMaintenancesByPlanMaintenance(parameter:any):Observable<any>{
    return this.httpService.post(this._planMaintenancesURL + "/CreateMaintenancesByPlan", parameter);
  }
  getAllVehicleMaintenance():Observable<any>{
    return this.httpService.get<any>(this._planMaintenancesURL + "/GetAllVehicleMaintenance");
  }
  ApprovePlanMaintenance(ApprovePlanMaintenanceParameter:any):Observable<any>{
    return this.httpService.post<any>(this._planMaintenancesURL + "/ApprovePlanMaintenance/",ApprovePlanMaintenanceParameter);
  }

  GetAllSettingsToList():Observable<any>{
    return this.httpService.get<any>(this._planMaintenancesURL+"/GetAllSettingsToList");
  }

  unsuscribeMaintenanceFromPlanMaintenance(maintenanceParameter):Observable<any>{
    return this.httpService.post<any>(this._planMaintenancesURL+"/UnsuscribeMaintenanceFromPlanMaintenance", maintenanceParameter);
  }


  getAllPlanMaintenancesToList():Observable<any>{
    return this.httpService.get<any>(this._planMaintenancesURL+ "/GetAllPlanMaintenancesToList");
  }
  GetAllVehicleMaintenanceBySearch(filter):Observable<any>{
    return this.httpService.post<any>(this._planMaintenancesURL + "/GetAllVehicleMaintenanceBySearch",filter );
  }

  getPlanMaintenanceByIdToShow(planMaintenanceId):Observable<any>{
    return this.httpService.get<any>(`${`${this._planMaintenancesURL}/GetPlanMaintenanceByIdToShow`}/${planMaintenanceId}`);
  }

  updatePlanMaintenance(planMaintenance:any):Observable<any>{
    return this.httpService.put<any>(`${this._planMaintenancesURL}/Update`, planMaintenance);
  }

  unsuscribePlanMaintenanceCommand(planMaintenance:any):Observable<any>{
    return this.httpService.put(this._planMaintenancesURL+'/Unsuscribe', planMaintenance);
  }

  getAllMaintenanceByPlanToExcel(planMaintenanceId):Observable<any>{
    return this.httpService.get(`${`${this._planMaintenancesURL}/GetAllMaintenanceByPlanToExcel`}/${planMaintenanceId}`,{observe:'response', responseType: 'arraybuffer'});
  }

  getAllMaintenanceByPlanToExcel2():Observable<any>{
    return this.httpService.get(`${`${this._planMaintenancesURL}/GetAllMaintenanceByPlanToExcel2`}`,{observe:'response', responseType: 'arraybuffer'});
  }

  
   /// region Reload
 private _listener = new Subject<any>();
 listen(): Observable<any> {
   return this._listener.asObservable();
 }

 filter(filterBy: string) {
   this._listener.next(filterBy);
 }
}
