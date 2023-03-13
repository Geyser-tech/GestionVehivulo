import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { FuelSupplyContract, GetAllFuelSupplyContract } from '../interfaces/Contract-fuel-supply-contract.interface';

@Injectable({
  providedIn: 'root',
})
export class FuelSupplyContractService {
  _contractURL: string;

  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._contractURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Contract`;
  }

  // ACTUALIZAR
  updateVehicleInspection(updateContractCommand: any): Observable<any> {
    const updateContract = {
      updateContractCommand: updateContractCommand,
    };
    return this.httpService.put(this._contractURL + '/Update', updateContract);
  }
  // LISTAR
  getAllContract(): Observable<any[]> {
    return this.httpService.get<any>(`${this._contractURL}/GetAllContract`).pipe(map(response => response.items));
  }
  // TRAER LOS CONCEPTOS Y AREAS
  getAllContractConceptArea(): Observable<any> {
    return this.httpService.get<any>(`${this._contractURL}/GetAllContractConceptArea`);
  }
  // ANULAR
  delete(id: string): Observable<any> {
    return this.httpService.delete(`${this._contractURL}/${id}`);
  }
  // LISTAR ID
  getContractById(id: string): Observable<any> {
    return this.httpService.get<any>(this._contractURL + '/' + id);
  }

  private _listener = new Subject<any>();
  listen(): Observable<any> {
    return this._listener.asObservable();
  }
  filter(filterBy: string) {
    this._listener.next(filterBy);
  }

  getAllSettingsList(): Observable<any> {
    return this.httpService.get<any>(this._contractURL + '/GetAllSettingList');
  }

  /// ////////////////////////////////////////////////////////////////////////////////////
  getContractConcept() {
    return this.httpService.get<any>(`${this._contractURL}/GetAllContractConcept`);
  }

  GetAllSettingsToCreate() {
    return this.httpService.get<any>(`${this._contractURL}/GetAllSettingsToCreate`);
  }

  add(data: any): Observable<any> {
    const contract = {
      contract: data,
    };
    return this.httpService.post<any>(`${this._contractURL}/Create`, contract);
  }

  getContractsBySearch(filter): Observable<any> {
    return this.httpService.post<any>(this._contractURL + '/GetBySearch', filter);
  }

  unSuscribeContract(data: any): Observable<any> {
    const UnSuscribeContract = {
      unSuscribeContractDTO: data,
    };

    return this.httpService.put(this._contractURL + '/UnSuscribe', UnSuscribeContract);
  }

  getContractByIdForUpdate(id: string): Observable<any> {
    return this.httpService.get<any>(this._contractURL + '/GetContractByIdForUpdateQuery' + '/' + id);
  }
  getContractsByAreaId(areaId: number) {
    return this.httpService.get<any>(this._contractURL + '/GetContracByAreaId' + '/' + areaId);
  }
}
