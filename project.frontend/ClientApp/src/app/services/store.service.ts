import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../dto/Customer.interface';
import { IApiService } from '../dto/IApiService.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService implements IApiService<Customer> {

  constructor(
    private http: HttpClient,
    private conf: ConfigService
  ) { }

  GetAsync(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.conf.GetValue("urlApi")}/customer`);
  }

  FindByIdAsync(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.conf.GetValue("urlApi")}/customer/${id}`);
  }

  CreateAsync(element: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.conf.GetValue("urlApi")}/customer`, element);
  }

  UpdateAsync(element: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.conf.GetValue("urlApi")}/customer`, element);
  }

  DeleteAsync(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.conf.GetValue("urlApi")}/customer/${id}`);
  }
}
