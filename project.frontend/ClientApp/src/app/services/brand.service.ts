import { Injectable } from '@angular/core';
import { Brand } from '../dto/Brand.interface';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { IApiService } from '../dto/IApiService.interface';

@Injectable({
  providedIn: 'root'
})

export class BrandService implements IApiService<Brand> {

  constructor(private http: HttpClient, private conf: ConfigService) {}

  GetConf(): ConfigService {
    return this.conf;
  }

  GetAsync(): Observable<Brand[]> {
    console.log("GetAsync")
    return this.http.get<Brand[]>(`${this.conf.GetValue("urlApi")}/brand`);
  }

  FindByIdAsync(id: number): Observable<Brand> {
    console.log("FindByIdAsync")
      return this.http.get<Brand>(`${this.conf.GetValue("urlApi")}/brand/${id}`);
  }

  CreateAsync(element: Brand): Observable<Brand> {
    console.log("CreateAsync")
      return this.http.post<Brand>(`${this.conf.GetValue("urlApi")}/brand`, element);
  }

  UpdateAsync(element: Brand): Observable<Brand> {
    console.log("UpdateAsync")
      return this.http.put<Brand>(`${this.conf.GetValue("urlApi")}/brand`, element);
  }

  DeleteAsync(id: number): Observable<Brand> {
    console.log("DeleteAsync")
      return this.http.delete<Brand>(`${this.conf.GetValue("urlApi")}/brand/${id}`);
  }
}
