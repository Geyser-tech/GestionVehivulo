import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable } from 'rxjs';
import { MasterInterfaz, MasterDetail } from '../interfaces/Master';
import { map } from 'rxjs/operators';
import { QueryParams } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  _masterURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._masterURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Master`;
  }

  add(data: any): Observable<any> {
    const Master = {
      master: data,
    };
    return this.httpService.post<any>(`${this._masterURL}/Create`, Master);
  }

  getAll(): Observable<any> {
    return this.httpService.get(`${this._masterURL}/GetAll`);
  }

  getAllMasters(): Observable<any> {
    return this.httpService.get(`${this._masterURL}/GetAllWithDetails`);
  }

  getMasterById(id: string): Observable<any> {
    return this.httpService.get<any>(this._masterURL + '/GetById/' + id);
  }

  updateMaster(updateMasterCommand: any): Observable<any> {
    const updateMaster = {
      updateMasterDTO: updateMasterCommand,
    };
    return this.httpService.put(this._masterURL + '/Update', updateMaster);
  }

  // getAllMasterDetailByMaster(queryParams: any): Observable<any[]> {
  //   const Master={
  //     id:queryParams.id
  //   }
  //   return this.httpService.get<any>(`${this._masterURL}/GetMasterDetailByMasterId`,Master);
  //   // return this.httpService
  //   //   .get<any>(this._masterURL + '/GetMasterDetailByMasterId', Master)
  //   //   .pipe(map(response => response.items));
  // }

  getAllMasterDetailByMaster(queryParams: string | QueryParams): Observable<any[]> {
    return this.httpService
      .get<any>(this._masterURL + '/GetMasterDetailByMasterId/' + queryParams)
      .pipe(map(response => response.items));
  }
  ///////////////////////////////////////////////////

  getCustomersMedium() {
    return this.httpService
      .get<any>('assets/data/master.json')
      .toPromise()
      .then(res => <MasterInterfaz[]>res.data)
      .then(data => {
        return data;
      });
  }

  getMasterDetail() {
    return this.httpService
      .get<any>('assets/data/master.json')
      .toPromise()
      .then(res => <MasterDetail[]>res.dataMaestrodetaller)
      .then(dataMaestrodetaller => {
        return dataMaestrodetaller;
      });
  }
}
