import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable } from 'rxjs';
import { MobilityRequest } from '../interfaces/mobility-request.interface';

@Injectable({
  providedIn: 'root'
})
export class MobilityRequestService {
  _vehicleURL:string;
  constructor(private httpService:HttpClient, private _configService: ConfigService) {
    this._vehicleURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Vehicle`;

   }

   getAll() {
    return this.httpService.get<any>('assets/data/customers-medium.json')
        .toPromise()
        .then(res => <MobilityRequest[]>res.data)
        .then(data => { return data; });
  }
  
}
