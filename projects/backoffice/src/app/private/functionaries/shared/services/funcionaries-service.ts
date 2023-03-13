import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable } from 'rxjs';
import { Funcionaries } from '../interfaces/funcionaries-interface';

@Injectable({
  providedIn: 'root',
})
export class FuncionariesService {
  _masterURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._masterURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Parameter`;
  }

  getAllMasters(): Observable<any> {
    return this.httpService.get(`${this._masterURL}/GetAllParameter`);
  }

  getFuncionaries() {
    return this.httpService
      .get<any>('assets/data/funcionaries.json')
      .toPromise()
      .then(res => <Funcionaries[]>res.data)
      .then(data => {
        return data;
      });
  }
}
