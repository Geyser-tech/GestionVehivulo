import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';
import { Update } from '@ngrx/entity';
import { map } from 'rxjs/operators';
import { QueryParams } from '@ngrx/data';
import { Pip } from '../interfaces/pipinterfaces';

@Injectable({
  providedIn: 'root',
})
export class PipService {
  _pipURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._pipURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Pip`;
  }

  add(body: Pip): Observable<Pip> {
    const createPip = {
      Pip: body,
    };
    return this.httpService.post<Pip>(this._pipURL, createPip);
  }

  delete(id: string): Observable<any> {
    return this.httpService.delete(`${this._pipURL}/${id}`);
  }

  getPipSettings(): Observable<any> {
    return this.httpService.get<any>(`${this._pipURL}/GetAllSettings`);
  }

  getPipById(id: string): Observable<any> {
    return this.httpService.get<any>(`${`${this._pipURL}/GetPipById`}/${id}`);
  }

  getAllPip(): Observable<any> {
    return this.httpService.get<any>(`${this._pipURL}/GetAllPip`).pipe(map(response => response.items));
  }

  getAllPipSettingsToList(): Observable<any> {
    return this.httpService.get<any>(`${this._pipURL}/GetAllPipSettingsToList`);
  }

  updatePip(pip: any): Observable<any> {
    const request = {
      UpdatePipDTO: pip,
    };
    return this.httpService.put<any>(`${this._pipURL}/Update`, request);
  }

  unsuscribePip(pip: any): Observable<any> {
    const request = {
      UnsuscribePipDTO: pip,
    };
    return this.httpService.put<any>(`${this._pipURL}/Unsuscribe`, request);
  }

  filterPip(filter): Observable<any> {
    return this.httpService.post<any>(`${this._pipURL}/GetBySearch`, filter);
  }

  getRecordPip(licensePlate: string) {
    return this.httpService.get<any>(`${this._pipURL}/GetRecordPip/${licensePlate}`).pipe(map(response => response.items));
  }

  GetAllPipSettingsToRecord(): Observable<any> {
    return this.httpService.get<any>(`${this._pipURL}/GetAllPipSettingsToRecord`);
  }

  /// region Reload
  private _listener = new Subject<any>();
  listen(): Observable<any> {
    return this._listener.asObservable();
  }

  filter(filterBy: string) {
    this._listener.next(filterBy);
  }
}
