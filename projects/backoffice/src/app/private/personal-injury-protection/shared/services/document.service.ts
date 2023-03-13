import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  _documentURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) { 
    this._documentURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/DocumentIdentity`;
  }

  getDocument(queryParams: string|QueryParams):Observable<any>{
    return this.httpService.get<any>(this._documentURL+"/GetDocumentIdentityDni",{ params: queryParams as any });
  }
}
