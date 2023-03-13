import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ParameterConfigurationService {
  _parameterConfigurationURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._parameterConfigurationURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/ParameterConfiguration`;
  }

  getAllParameterConfigurationByConfigurationId(Id: number): Observable<any[]> {
    return this.httpService
      .get<any>(this._parameterConfigurationURL + '/GetParameterConfigurationByConfigurationId/' + Id)
      .pipe(map(response => response.items));
  }

  add(data: any): Observable<any> {
    const createParameterConfigurationCommand = {
      parameterConfiguration: data,
    };
    return this.httpService.post<any>(`${this._parameterConfigurationURL}/Create`, createParameterConfigurationCommand);
  }

  GetAllSettingListToCreateByIdQuery(): Observable<any> {
    return this.httpService.get<any>(this._parameterConfigurationURL + '/GetAllSettingListToCreateByIdQuery');
  }

  getParameterConfigurationById(id: string): Observable<any> {
    return this.httpService.get<any>(this._parameterConfigurationURL + '/' + id);
  }

  updateParameterConfiguration(data: any): Observable<any> {
    const updateParameterConfiguration = {
      updateParameterConfigurationDTO: data,
    };
    return this.httpService.put(this._parameterConfigurationURL + '/Update', updateParameterConfiguration);
  }
}
