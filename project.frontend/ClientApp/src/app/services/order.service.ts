import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiService } from '../dto/IApiService.interface';
import { Order } from '../dto/Order.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements IApiService<Order> {

  constructor(
    private http: HttpClient,
    private conf: ConfigService
  ) { }

  GetAsync(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.conf.GetValue("urlApi")}/order`);
  }

  FindByIdAsync(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.conf.GetValue("urlApi")}/order/${id}`);
  }

  CreateAsync(element: Order): Observable<Order> {
    return this.http.post<Order>(`${this.conf.GetValue("urlApi")}/order`, element);
  }

  UpdateAsync(element: Order): Observable<Order> {
    return this.http.put<Order>(`${this.conf.GetValue("urlApi")}/order`, element);
  }

  DeleteAsync(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.conf.GetValue("urlApi")}/order/${id}`);
  }
}
