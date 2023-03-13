import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportFuelSupplyService {
  _fuelSuppliesURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) { 
    this._fuelSuppliesURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/FuelSupplyReport`;
  }

  getReportValorizationTypeA(parameter:any): Observable<any> {
    return this.httpService.post<any>(this._fuelSuppliesURL + '/GetReportValorizationTypeA',parameter);
  }

  getReportValorizationSettings():Observable<any>{
    return this.httpService.get<any>(this._fuelSuppliesURL +'/GetSettingsToReportValorization');
  }

  getReportControlFuelSupply(parameter:any):Observable<any> {
    return this.httpService.post<any>(this._fuelSuppliesURL + '/GetReportControlFuelSupply',parameter);
  }
}
