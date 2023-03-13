import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { QueryParams } from '@ngrx/data';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllVehicles } from '../interfaces/get-all-vehicles.interface';
import { GetVehicleByIdQuery } from '../interfaces/get-vehicle-by-id-query.interface';
import { GetVehicleByLicensePlate } from '../interfaces/get-vehicle-by-license-plate.interface';
import { Vehicle } from '../interfaces/vechicle.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  _vehicleURL:string;
  constructor(private httpService:HttpClient, private _configService: ConfigService) {
    this._vehicleURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Vehicle`;

   }
  add(vehicle: Vehicle): Observable<Vehicle> {
    const createVehicleCommand={
      vehicle: vehicle
    };
    return this.httpService.post<Vehicle>(`${this._vehicleURL}/Create`, createVehicleCommand);
  }

  getAll(queryParams: string | QueryParams):Observable<GetAllVehicles[]>{
    return this.httpService.get<any>(this._vehicleURL, { params: queryParams as any }).pipe(map(response => response.items));
  }

  getAllvehicles():Observable<GetAllVehicles[]>{
    return this.httpService.get<any>(this._vehicleURL+"/GetAllVehicles").pipe(map(response => response.items));
  }
  getAllSettings():Observable<any>{
    return this.httpService.get<any>(this._vehicleURL+"/GetAllSettings");
  }
  getAllSettingsList():Observable<any>{
    return this.httpService.get<any>(this._vehicleURL+"/GetAllSettingsList");
  }
  getVehicleById(id:number):Observable<any>{
    return this.httpService.get<GetVehicleByIdQuery>(this._vehicleURL+"/"+id);
  }
  updateVehicle(vehicle:Vehicle):Observable<any>{
    const updateVehicleCommand={
      updateVehicleCommand: vehicle
    };
    return this.httpService.put(this._vehicleURL+'/Update', updateVehicleCommand);
  }
  unSuscribeVehicle(vehicle:any):Observable<any>{
    const UnSuscribeVehicleDTO={
      UnSuscribeVehicleDTO: vehicle
    };
    return this.httpService.put(this._vehicleURL+'/UnSuscribre', UnSuscribeVehicleDTO);
  }

  getVehicleByLicsensePlate(licensePlate:string):Observable<any>{
    return this.httpService.get<GetVehicleByLicensePlate>(this._vehicleURL+"/GetByLicensePlate/"+licensePlate);
  }
  getVehiclesBySearch(filter):Observable<any>{
    return this.httpService.post<any>(this._vehicleURL + "/GetBySearch",filter);
  }

  getSettingsUnsuscribe():Observable<any>{
    return this.httpService.get<any>(this._vehicleURL+"/GetSettingsToUnsuscribe");
  }

  ///region Reload
  private _listener = new Subject<any>();
  listen():Observable<any>{
    return this._listener.asObservable();
  }
  filter(filterBy:string){
    this._listener.next(filterBy);
  }

}
