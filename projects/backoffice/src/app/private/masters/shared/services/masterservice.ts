import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterInterfaz } from '../interfaces/Master';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomersMedium() {
    return this.http
      .get<any>('assets/data/master.json')
      .toPromise()
      .then(res => <MasterInterfaz[]>res.data)
      .then(data => {
        return data;
      });
  }
}
