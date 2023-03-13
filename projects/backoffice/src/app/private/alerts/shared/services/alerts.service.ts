import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  _alertURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._alertURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Alert`;
  }

  getAllDriverLicense(): Observable<any> {
    return this.httpService.get<any>(this._alertURL + '/GetAllDriverLicense').pipe(map(response => response.items));
  }

  getAllVehicleInspection(): Observable<any> {
    return this.httpService.get<any>(this._alertURL + '/GetAllVehicleInspection').pipe(map(response => response.items));
  }

  getAllPip(): Observable<any> {
    return this.httpService.get<any>(this._alertURL + '/GetAllPip').pipe(map(response => response.items));
  }

  private _listener = new Subject<any>();
  listen(): Observable<any> {
    return this._listener.asObservable();
  }
  filter(filterBy: string) {
    this._listener.next(filterBy);
  }
}
