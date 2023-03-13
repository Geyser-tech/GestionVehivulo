import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@cad-core/services';
import { Observable, Subject } from 'rxjs';
import { Update } from '@ngrx/entity';
import { map } from 'rxjs/operators';
import { CreateFuelPrice } from '../interfaces/create-fuel-price.interface';
import { GetAllPriceInterface } from '../interfaces/get-all-price.interface';
import { GetPriceFuelSupplyByIdQuery } from '../interfaces/get-price-byid.interface';
import { UpdateFuelPrice } from '../interfaces/update-fuel-price.interface';

@Injectable({
  providedIn: 'root',
})
export class FuelPriceService {
  _fuelPriceURL: string;
  _contracURL: string;
  constructor(private httpService: HttpClient, private _configService: ConfigService) {
    this._fuelPriceURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/PriceFuelSupply`;
    this._contracURL = `${this._configService.appConfig.apiEntitiesUrl}api/v1/Contract`;
  }

  add(priceFuelSupply: CreateFuelPrice): Observable<CreateFuelPrice> {
    const priceFuelSupplyCommand = {
      priceFuelSupply: priceFuelSupply,
    };
    return this.httpService.post<CreateFuelPrice>(`${this._fuelPriceURL}/Create`, priceFuelSupplyCommand);
  }

  getAll(): Observable<GetAllPriceInterface[]> {
    return this.httpService.get<any>(this._fuelPriceURL + '/GetAll').pipe(map(response => response.items));
  }

  updateVehicleInspection(priceFuelSupply: UpdateFuelPrice): Observable<any> {
    const updatePriceFuelSupply = {
      updatePriceFuelSupplyDTO: priceFuelSupply,
    };
    return this.httpService.put(this._fuelPriceURL + '/Update', updatePriceFuelSupply);
  }

  delete(id: string): Observable<any> {
    return this.httpService.delete(`${this._fuelPriceURL}/${id}`);
  }

  getPriceFuelSupplyById(id: number): Observable<any> {
    return this.httpService.get<GetPriceFuelSupplyByIdQuery>(this._fuelPriceURL + '/' + id);
  }

  getAllSettingsList(): Observable<any> {
    return this.httpService.get<any>(this._fuelPriceURL + '/GetAllSettingsList');
  }

  getVehicleInspectionsBySearch(filter): Observable<any> {
    return this.httpService.post<any>(this._fuelPriceURL + '/GetBySearch', filter);
  }

  getLastPrice(date): Observable<any> {
    return this.httpService.post<any>(this._fuelPriceURL + '/GetLastPrice', date);
  }

  getAllPriceFuelSupplyByContractId(queryParams): Observable<any> {
    const query = {
      contractId: queryParams.contractId,
      fuelTypeId: queryParams.fuelTypeId,
      areaId: queryParams.areaId,
    };
    return this.httpService.post<any>(this._fuelPriceURL + '/GetAllPriceFuelSupplyByContractId', query);
  }

  getSettingsToCreate(): Observable<any> {
    return this.httpService.get<any>(this._fuelPriceURL + '/GetSettingsToCreate');
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
