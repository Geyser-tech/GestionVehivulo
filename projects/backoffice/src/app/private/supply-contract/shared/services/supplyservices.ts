import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supply } from '../interfaces/supplyinterfaces';

@Injectable({
  providedIn: 'root',
})
export class SupplyService {
  constructor(private httpService: HttpClient) {}

  getPipMedium() {
    return this.httpService
      .get<any>('assets/data/data-list.json')
      .toPromise()
      .then(res => <Supply[]>res.data)
      .then(data => {
        return data;
      });
  }
}
