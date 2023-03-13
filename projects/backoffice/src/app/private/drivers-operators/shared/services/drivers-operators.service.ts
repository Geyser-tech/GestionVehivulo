import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';
import { DriverOperators, ShowDriversOperators } from '../interfaces/drivers-operators.interfaces';
import { Drivers } from '../interfaces/drivers.interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataDriverOperators {
  _driverURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._driverURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Driver`;
  }

  getAllSettings(): Observable<any> {
    return this.httpService.get<any>(this._driverURL + '/GetAllSettingsList');
  }

  add(driver: Drivers): Observable<Drivers> {
    const createDriver = {
      driver: driver,
    };
    return this.httpService.post<Drivers>(`${this._driverURL}/Create`, createDriver);
  }

  update(driver: any): Observable<any> {
    const UpdateDriverCommand = {
      updateDriver: driver,
    };
    return this.httpService.put(`${this._driverURL}/Update`, UpdateDriverCommand);
  }

  getAll(): Observable<any> {
    return this.httpService.get<any>(this._driverURL).pipe(map(response => response.items));
  }

  getDriversBySearch(filter): Observable<any> {
    return this.httpService.post<any>(this._driverURL + '/GetBySearch', filter);
  }

  getById(id: string): Observable<any> {
    return this.httpService.get<any>(`${`${this._driverURL}`}/${id}`);
  }

  unSuscribe(driver: any): Observable<any> {
    const unSuscribeDriverDTO = {
      unSuscribeDriverDTO: driver,
    };
    return this.httpService.put(this._driverURL + '/UnSuscribre', unSuscribeDriverDTO);
  }

  private _listener = new Subject<any>();
  listen(): Observable<any> {
    return this._listener.asObservable();
  }
  filter(filterBy: string) {
    this._listener.next(filterBy);
  }

  getCustomersMedium() {
    return this.httpService
      .get<any>('assets/data/data-list-drivers.json')
      .toPromise()
      .then(res => <DriverOperators[]>res.data)
      .then(data => {
        return data;
      });
  }

  getShowDriversOperators() {
    return this.httpService
      .get<any>('assets/data/Licenses-belonging-driver.json')
      .toPromise()
      .then(res => <ShowDriversOperators[]>res.data)
      .then(data => {
        return data;
      });
  }

  getAllProviderSettings(): Observable<any> {
    return this.httpService.get<any>(this._driverURL + '/GetAll');
  }
}
