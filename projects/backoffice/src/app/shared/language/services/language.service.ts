import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';
import { ILanguage } from '../interfaces/Language.interface';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  _productsUrl: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._productsUrl = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Language`;
  }

  getLanguage(queryParams: string | QueryParams): Observable<any> {
    return this.httpService.get<ILanguage>(this._productsUrl, { params: queryParams as any });
  }
}
