import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parameter, ParameterConfiguration } from '../interfaces/parameter-interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  _configurationURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._configurationURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Configuration`;
  }

  add(Configuration: any): Observable<any> {
    const createConfigurationCommand = {
      configuration: Configuration,
    };
    return this.httpService.post<any>(`${this._configurationURL}/Create`, createConfigurationCommand);
  }

  getConfigurationId(id: number): Observable<any> {
    return this.httpService.get<any>(this._configurationURL + '/' + id);
  }

  updateConfiguration(configuration: any): Observable<any> {
    const updateConfiguration = {
      updateConfiguration: configuration,
    };
    return this.httpService.put(this._configurationURL + '/Update', updateConfiguration);
  }

  unSuscribeConfiguration(data: any): Observable<any> {
    const UnSuscribeConfiguration = {
      unsuscribeConfiguration: data,
    };

    return this.httpService.put(this._configurationURL + '/UnSuscribe', UnSuscribeConfiguration);
  }

  ///////////////////////////////////////////////////////////

  getAll(): Observable<any[]> {
    return this.httpService.get<any>(this._configurationURL + '/GetAll').pipe(map(response => response.items));
  }

  getAllMasters(): Observable<any> {
    return this.httpService.get(`${this._configurationURL}/GetAllParameter`);
  }

  getParameter() {
    return this.httpService
      .get<any>('assets/data/parameter.json')
      .toPromise()
      .then(res => <Parameter[]>res.data)
      .then(data => {
        return data;
      });
  }

  getParameterConfiguration() {
    return this.httpService
      .get<any>('assets/data/parameter.json')
      .toPromise()
      .then(res => <ParameterConfiguration[]>res.parameter)
      .then(parameter => {
        return parameter;
      });
  }
}
