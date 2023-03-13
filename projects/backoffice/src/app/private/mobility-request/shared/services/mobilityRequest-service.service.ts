import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';
import { MobilityRequest } from '../interfaces/mobilityRequest.interface';
import { UpdateMobilityRequestCommand } from '../interfaces/update-mobility-request-command.interface';
import { GetMobilityRequestByIdQuery } from '../interfaces/get-mobility-request-by-id-query.interface';
import { GetAllMobilityRequest } from '../interfaces/get-all-mobility-requests';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MobilityRequestService {
  _mobilityRequestURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._mobilityRequestURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/MobilityRequest`;
  }

  getAllSettings(): Observable<any> {
    return this.httpService.get<any>(this._mobilityRequestURL + '/GetAllSettingsList');
  }

  getAll(): Observable<GetAllMobilityRequest[]> {
    return this.httpService.get<any>(this._mobilityRequestURL).pipe(map(response => response.items));
  }

  getMobilityRequestById(id: number): Observable<any> {
    return this.httpService.get<GetMobilityRequestByIdQuery>(this._mobilityRequestURL + '/' + id);
  }

  add(mobilityRequest: MobilityRequest): Observable<MobilityRequest> {
    const createMobilityRequest = {
      mobilityRequest: mobilityRequest,
    };
    return this.httpService.post<MobilityRequest>(`${this._mobilityRequestURL}/Create`, createMobilityRequest);
  }

  unSuscribe(mobilityRequest: any): Observable<any> {
    const UnSuscribeMobilityRequestDTO = {
      unSuscribeMobilityRequestDTO: mobilityRequest,
    };
    return this.httpService.put(this._mobilityRequestURL + '/UnSuscribre', UnSuscribeMobilityRequestDTO);
  }

  update(mobilityRequest: UpdateMobilityRequestCommand): Observable<any> {
    const UpdateMobilityRequestCommand = {
      updateMobilityRequestCommand: mobilityRequest,
    };
    return this.httpService.put(`${this._mobilityRequestURL}/Update`, UpdateMobilityRequestCommand);
  }

  getMobilityRequestsBySearch(filter): Observable<any> {
    return this.httpService.post<any>(this._mobilityRequestURL + '/GetBySearch', filter);
  }

  private _listener = new Subject<any>();
  listen(): Observable<any> {
    return this._listener.asObservable();
  }
  filter(filterBy: string) {
    this._listener.next(filterBy);
  }
}
