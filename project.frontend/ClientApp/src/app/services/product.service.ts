import { Injectable } from '@angular/core';
import { Product } from '../dto/Product.interface';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { IApiService } from '../dto/IApiService.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductService implements IApiService<Product> {

  constructor(private http: HttpClient, private conf: ConfigService) { }

    GetAsync(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.conf.GetValue("urlApi")}/product`);
  }

    FindByIdAsync(id: number): Observable<Product> {
      return this.http.get<Product>(`${this.conf.GetValue("urlApi")}/product/${id}`);
  }

    CreateAsync(element: Product): Observable<Product> {
      return this.http.post<Product>(`${this.conf.GetValue("urlApi")}/product`, element);
  }

    UpdateAsync(element: Product): Observable<Product> {
      return this.http.put<Product>(`${this.conf.GetValue("urlApi")}/product`, element);
  }

    DeleteAsync(id: number): Observable<Product> {
      return this.http.delete<Product>(`${this.conf.GetValue("urlApi")}/product/${id}`);
    }
}
