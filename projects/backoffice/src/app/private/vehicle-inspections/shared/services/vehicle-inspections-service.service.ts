import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { GetAllVehicleInspectionsInterfaces } from '../interfaces/get-all-vehicle-inspections.interface';
import { map } from 'rxjs/operators';
import { GetVehicleInspectionByIdQuery } from '../interfaces/get-vehicle-inspection-by-id-query.interface';
import { CreateVehicleInspection } from '../interfaces/create-vehicle-inspection.interface';
import { GetHistoryVehicleInspection } from '../interfaces/get-History-Vehicle-Inspection.interface';
import { UpdateVehicleInspection } from '../interfaces/update-vehicle-inspection.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleInspectionsService {
  _vehicleInspectionURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._vehicleInspectionURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/VehicleInspection`;
  }

  getAll(): Observable<GetAllVehicleInspectionsInterfaces[]> {
    return this.httpService
      .get<any>(this._vehicleInspectionURL + '/GetAllVehicleInspection')
      .pipe(map(response => response.items));
  }

  getVehicleInspectionById(id: number): Observable<any> {
    return this.httpService.get<GetVehicleInspectionByIdQuery>(this._vehicleInspectionURL + '/' + id);
  }

  getHistoryVehicleInspectionById(id: number): Observable<any> {
    return this.httpService.get<GetHistoryVehicleInspection>(this._vehicleInspectionURL + '/GetHistory/' + id);
  }

  getAllProviderSettings(): Observable<any> {
    return this.httpService.get<any>(this._vehicleInspectionURL + '/GetAllProvider');
  }

  add(vehicleInspection: CreateVehicleInspection): Observable<CreateVehicleInspection> {
    const createVehicleInspectionCommand = {
      vehicleInspection: vehicleInspection,
    };
    return this.httpService.post<CreateVehicleInspection>(`${this._vehicleInspectionURL}/Create`, createVehicleInspectionCommand);
  }

  unSuscribeVehicleInspection(data: any): Observable<any> {
    console.log(data);

    const UnSuscribeVehicleInspection = {
      unSuscribeVehicleInspectionDTO: data,
    };

    return this.httpService.put(this._vehicleInspectionURL + '/UnSuscribe', UnSuscribeVehicleInspection);
  }

  updateVehicleInspection(vehicleInspection: UpdateVehicleInspection): Observable<any> {
    const updateVehicleInspection = {
      updateVehicleInspectionCommand: vehicleInspection,
    };
    return this.httpService.put(this._vehicleInspectionURL + '/Update', updateVehicleInspection);
  }

  getAllSettingsList(): Observable<any> {
    return this.httpService.get<any>(this._vehicleInspectionURL + '/GetAllSettingsList');
  }

  getVehicleInspectionsBySearch(filter): Observable<any> {
    return this.httpService.post<any>(this._vehicleInspectionURL + '/GetBySearch', filter);
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
