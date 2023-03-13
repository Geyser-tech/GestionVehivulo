import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuelSupplyConsumptionService {
  _fuelSupplyConsumptionURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._fuelSupplyConsumptionURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/FuelSupplyConsumption`;
  }
  getAllFuelSupplyConsumption(): Observable<any> {
    return this.httpService.get(this._fuelSupplyConsumptionURL + '/GetAllFuelSupplyConsumption');
  }

  getAllFuelSupplyConsumptionSettings(): Observable<any> {
    return this.httpService.get<any>(this._fuelSupplyConsumptionURL + '/GetAllFuelSupplyConsumptionSettings');
  }

  getFuelSupplyConsumptionById(queryParams: string | QueryParams): Observable<any> {
    return this.httpService.get<any>(this._fuelSupplyConsumptionURL + '/GetFuelSupplyConsumptionById', {
      params: queryParams as any,
    });
  }

  getFuelSupplyConsumptionBySearch(filter): Observable<any> {
    return this.httpService.post<any>(this._fuelSupplyConsumptionURL + '/GetBySearch', filter);
  }
}
