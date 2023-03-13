import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';
import { DriverLicenses } from '../interfaces/driver-licenses.interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DriverLicenseService {
  _driverLicenseURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._driverLicenseURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/DriverLicense`;
  }

  add(driverLicense: DriverLicenses): Observable<DriverLicenses> {
    const createDriverLicense = {
      driverLicense: driverLicense,
    };
    return this.httpService.post<DriverLicenses>(`${this._driverLicenseURL}/Create`, createDriverLicense);
  }

  unSuscribe(driverLicense: any): Observable<any> {
    const UnSuscribDriverLicenseDTO = {
      unSuscribeDriverLicenseDTO: driverLicense,
    };
    return this.httpService.put(this._driverLicenseURL + '/UnSuscribre', UnSuscribDriverLicenseDTO);
  }

  private _listener = new Subject<any>();
  listen(): Observable<any> {
    return this._listener.asObservable();
  }
  filter(filterBy: string) {
    this._listener.next(filterBy);
  }
}
