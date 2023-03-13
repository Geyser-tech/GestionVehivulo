import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { VehicleAssignment } from '../interfaces/vehicleAssignment.interface';
import { QueryParams } from '@ngrx/data';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VehicleAssignmentService {
  _vehicleAssignmentURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._vehicleAssignmentURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/VehicleAssignment`;
  }

  add(vehicleAssignment: any): Observable<any> {
    const createVehicleAssignmentCommand = {
      vehicleAssignment: vehicleAssignment,
    };
    return this.httpService.post<any>(`${this._vehicleAssignmentURL}/Create`, createVehicleAssignmentCommand);
  }

  GetSettingsByIdArea(idArea: number): Observable<any> {
    return this.httpService.get<any>(this._vehicleAssignmentURL + '/GetSettingsByIdArea/' + idArea);
  }

  update(vehicleAssignment: any): Observable<any> {
    const UpdateMobilityRequestCommand = {
      updateVehicleAssignmentCommand: vehicleAssignment,
    };
    console.log('UpdateMobilityRequestCommand', UpdateMobilityRequestCommand);
    return this.httpService.put(this._vehicleAssignmentURL + '/Update', UpdateMobilityRequestCommand);
  }

  unSuscribe(vehicleAssignment: any): Observable<any> {
    const UnSuscribeVehicleAssignmentDTO = {
      unSuscribeVehicleAssignmentDTO: vehicleAssignment,
    };
    return this.httpService.put(this._vehicleAssignmentURL + '/UnSuscribre', UnSuscribeVehicleAssignmentDTO);
  }

  getHistory(filter): Observable<any> {
    return this.httpService.post<any>(this._vehicleAssignmentURL + '/GetHistory', filter);
  }

  ///region Reload
  private _listener = new Subject<any>();
  listen(): Observable<any> {
    return this._listener.asObservable();
  }
  filter(filterBy: string) {
    this._listener.next(filterBy);
  }
}
