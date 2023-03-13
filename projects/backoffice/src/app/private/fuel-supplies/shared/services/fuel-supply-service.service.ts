import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuelSupplies } from '../interfaces/fuel-supplies.interface';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { getFuelSupplyById } from '../interfaces/get-fuelsupply-byId.interface';
import { QueryParams } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class FuelSupplyService {
  _fuelSuppliesURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._fuelSuppliesURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/FuelSupply`;
  }

  getAllSettingsList(vehicleId:number): Observable<any> {
    return this.httpService.get<any>(this._fuelSuppliesURL + '/GetAllSettingsCreate'+ '/' + vehicleId);
  }

  GetAllSettingToFilter(): Observable<any> {
    return this.httpService.get<any>(this._fuelSuppliesURL + '/GetAllSettingToFilter');
  }

  getAll(): Observable<any[]> {
    return this.httpService.get<any>(this._fuelSuppliesURL + '/GetAll').pipe(map(response => response.items));
  }

  add(fuelSupplies: any): Observable<any> {
    const fuelSupply = {
      fuelSupply: fuelSupplies,
    };
    return this.httpService.post<any>(`${this._fuelSuppliesURL}/Create`, fuelSupply);
  }

  getFuelSupplyById(fuelSupplyId:number): Observable<any> {
    return this.httpService.get<getFuelSupplyById>(this._fuelSuppliesURL + '/GetFuelSupplyById/'+fuelSupplyId);
  }

  updateFuelSupplyById(fuelSupply:any):Observable<any>{
    return this.httpService.put<any>(this._fuelSuppliesURL+'/Update', fuelSupply); 
  }

  unsuscribeFuelSupply(fuelSuppy:any):Observable<any>{
    return this.httpService.put<any>(`${this._fuelSuppliesURL}/Unsuscribe`, fuelSuppy);
  }
  filterFuelSupplies(filter:any):Observable<any>{
    return this.httpService.post<any>(this._fuelSuppliesURL+"/GetBySearch", filter);
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
