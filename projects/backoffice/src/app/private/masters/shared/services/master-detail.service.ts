import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable } from 'rxjs';
import { MasterDetail } from '../interfaces/MasterDetail.model';

@Injectable({
  providedIn: 'root',
})
export class MasterDetailService {
  _masterDetailURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._masterDetailURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/MasterDetail`;
  }

  getMasterDetailsById(Id: number): Observable<any> {
    return this.httpService.get(this._masterDetailURL + '/GetMasterDetailsById/' + Id);
  }

  GetAllMasterDetailByGenericId(Id: number): Observable<any> {
    return this.httpService.get(this._masterDetailURL + '/GetAllMasterDetailByGenericId/' + Id);
  }

  add(data: any): Observable<any> {
    const Master = {
      master: data,
    };
    return this.httpService.post<any>(`${this._masterDetailURL}/Create`, Master);
  }

  saveDetailMaster(detailMaster: any): Observable<any> {
    const CreateMasterDetail = {
      createMasterDetail: detailMaster,
    };
    return this.httpService.post(this._masterDetailURL + '/create', CreateMasterDetail);
  }
  saveDetailMasterRecursive(detailMasterRecursive: any): Observable<any> {
    const CreateMasterDetailRecursive = {
      createMasterDetailRecursive: detailMasterRecursive,
    };
    return this.httpService.post(this._masterDetailURL + '/createRecursive', CreateMasterDetailRecursive);
  }

  GetOneMasterDetailsById(Id: number): Observable<any> {
    return this.httpService.get(this._masterDetailURL + '/GetOneMasterDetailsById/' + Id);
  }

  updateVehicleInspection(masterDetail: any): Observable<any> {
    const updateMasterDetail = {
      updateMasterDetailDTO: masterDetail,
    };
    return this.httpService.put(this._masterDetailURL + '/Update', updateMasterDetail);
  }
}
