import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable } from 'rxjs';
import { Rol, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _masterURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._masterURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/User`;
  }

  getAllMasters(): Observable<any> {
    return this.httpService.get(`${this._masterURL}/GetUser`);
  }

  getUsers() {
    return this.httpService
      .get<any>('assets/data/user.json')
      .toPromise()
      .then(res => <User[]>res.data)
      .then(data => {
        return data;
      });
  }

  getRol() {
    return this.httpService
      .get<any>('assets/data/user.json')
      .toPromise()
      .then(res => <Rol[]>res.rol)
      .then(rol => {
        return rol;
      });
  }
}
