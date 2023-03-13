
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Catalog, ActivitiesCatalog } from '../interfaces/pmcinterfaces';

@Injectable({
  providedIn: 'root',
})
export class catalogService {
  _CatalogMaintenanceURL: string;

  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._CatalogMaintenanceURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/CatalogMaintenance`;
    this.listen().subscribe((m:any)=>{    
    });
  }

  getCatalog() {
    return this.httpService
      .get<any>('assets/data/preventive-maintenance-catalog.json')
      .toPromise()
      .then(res => <Catalog[]>res.data)
      .then(data => {
        return data;
      });
  }

  ActivitiesCatalog() {
    return this.httpService
      .get<any>('assets/data/activities-catalog-mantenance.json')
      .toPromise()
      .then(res => <ActivitiesCatalog[]>res.data)
      .then(data => {
        return data;
      });
  }
  getAllCatalogs():Observable<any>{
    return this.httpService.get<any>(this._CatalogMaintenanceURL+"/GetAllCatalogMaintenances");
  }

  getSettingsToCreate():Observable<any>{
    return this.httpService.get<any>(this._CatalogMaintenanceURL+"/GetAllSettingsToCreate");
  }

  getSettingsToList():Observable<any>{
    return this.httpService.get<any>(this._CatalogMaintenanceURL+"/GetAllSettingsToList");
  }
  createCatalogMaintenance(catalogMaintenance:any):Observable<any>{
    return this.httpService.post(this._CatalogMaintenanceURL + "/CreateCatalogMaintenance",catalogMaintenance);
  }

  getCatalogMaintenanceById(id:string):Observable<any>{
    return this.httpService.get(`${`${this._CatalogMaintenanceURL}/GetByIdCatalogMaintenance`}/${id}`);
  }
  updateCatalogMaintenance(catalogMaintenance:any):Observable<any>{
    const command={
      UpdateCatalogMaintenanceDTO:catalogMaintenance
    }
    return this.httpService.put<any>(`${this._CatalogMaintenanceURL}/Update`, command);
  }

  cloneCatalogMaintenance(catalogMaintenance:any):Observable<any>{
    return this.httpService.post(this._CatalogMaintenanceURL +"/CloneCatalogMaintenance",catalogMaintenance);
  }

  filterCatalogMaintenances(filter:any):Observable<any>{
    return this.httpService.post<any>(this._CatalogMaintenanceURL+"/GetBySearch", filter);
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
