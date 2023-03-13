import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable } from 'rxjs';
import { Maintenance } from '../interfaces/maintenances.interface';
import { map } from 'rxjs/operators';
import { QueryParams } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class MaintenancesService {
  _maintenancesURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._maintenancesURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Maintenance`;
  }

  // getAll(queryParams: string | QueryParams): Observable<Maintenance[]> {
  //   return this.httpService.get<any>(this._maintenancesURL, { params: queryParams as any }).pipe(map(response => response.items));
  // }

  getAll(queryParams: string | QueryParams): Observable<Maintenance[]> {
    return this.httpService
      .get<any>(this._maintenancesURL + '/GetAllMaitenances', { params: queryParams as any })
      .pipe(map(response => response.items));
  }

  getAllSettingsToList(): Observable<any> {
    return this.httpService.get<any>(this._maintenancesURL + '/GetAllSettingToListMaintenance');
  }

  GetSettingToCreate(filter): Observable<any> {
    return this.httpService.post<any>(this._maintenancesURL + '/GetSettingToCreate', filter);
  }

  add(data: any): Observable<any> {
    const maintenance = {
      maintenance: data,
    };
    return this.httpService.post<any>(`${this._maintenancesURL}/Create`, maintenance);
  }

  getMaintenanceById(idMaintenance: number): Observable<any> {
    return this.httpService.get<any>(this._maintenancesURL + '/GetMasterDetailByMasterId/' + idMaintenance);
  }

  updateMaintenance(data: any): Observable<any> {
    const updateMaintenance = {
      updateMaintenance: data,
    };
    return this.httpService.put(this._maintenancesURL + '/Update', updateMaintenance);
  }

  getMaintenancesBySearch(filter): Observable<any> {
    return this.httpService.post<any>(this._maintenancesURL + '/GetBySearch', filter);
  }

  getHistoryMaintenanceById(vehicleId: number): Observable<any> {
    return this.httpService.get<any>(this._maintenancesURL + '/GetHistory/' + vehicleId);
  }
}
