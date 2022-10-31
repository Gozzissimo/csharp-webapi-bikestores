import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiService } from '../dto/IApiService.interface';
import { Stock } from '../dto/Stock.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StockService implements IApiService<Stock> {

  constructor(
    private http: HttpClient,
    private conf: ConfigService
  ) { }

  GetAsync(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.conf.GetValue("urlApi")}/stock`);
  }

  FindByIdAsync(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.conf.GetValue("urlApi")}/stock/${id}`);
  }

  FindByDoubleIdAsync(storeId: number, productId: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.conf.GetValue("urlApi")}/stock/${storeId}/${productId}`);
  }

  CreateAsync(element: Stock): Observable<Stock> {
    return this.http.post<Stock>(`${this.conf.GetValue("urlApi")}/stock`, element);
  }

  UpdateAsync(element: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.conf.GetValue("urlApi")}/stock`, element);
  }

  DeleteAsync(id: number): Observable<Stock> {
    return this.http.delete<Stock>(`${this.conf.GetValue("urlApi")}/stock/${id}`);
  }
}
