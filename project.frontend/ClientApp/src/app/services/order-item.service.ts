import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from '../dto/OrderItem.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  constructor(
    private http: HttpClient,
    private conf: ConfigService
  ) { }

  GetAsync(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.conf.GetValue("urlApi")}/orderitem`);
  }

  FindByIdAsync(id: number): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${this.conf.GetValue("urlApi")}/orderitem/${id}`);
  }

  CreateAsync(element: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.conf.GetValue("urlApi")}/orderitem`, element);
  }

  UpdateAsync(element: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.conf.GetValue("urlApi")}/orderitem`, element);
  }

  DeleteAsync(id: number): Observable<OrderItem> {
    return this.http.delete<OrderItem>(`${this.conf.GetValue("urlApi")}/orderitem/${id}`);
  }
}
