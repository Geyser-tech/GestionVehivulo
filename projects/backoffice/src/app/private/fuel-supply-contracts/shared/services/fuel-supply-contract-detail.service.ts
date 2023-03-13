import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root',
})
export class FuelSupplyDetailContractService {
  _contractURL: string;

  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._contractURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/ContractDetail`;
  }

  // LISTAR
  getAllContract(): Observable<any> {
    return this.httpService.get<any>(`${this._contractURL}/`).pipe(map(response => response.items));
  }
  // ANULAR
  delete(id: string): Observable<any> {
    return this.httpService.delete(`${this._contractURL}/${id}`);
  }
  // LISTAR ID
  getContractById(id: string): Observable<any> {
    return this.httpService.get<any>(`${this._contractURL}/GetAllContract`).pipe(map(response => response.items));
  }

  //////////////////////////////////////////////////////////////////////////////
  getContractConcept(id: number) {
    return this.httpService.get<any>(this._contractURL + '/GetAllContractConcept/' + id);
  }

  getAllContractsUserAreasByAreaId(id: number) {
    return this.httpService.get<any>(this._contractURL + '/GetAllContractsUserAreaByVehicleId/' + id);
  }
}
