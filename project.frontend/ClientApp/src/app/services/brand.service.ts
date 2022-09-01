import { Injectable } from '@angular/core';
import { Brand } from '../dto/brand.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { IApiService } from '../dto/IApiService.interface';

@Injectable({
  providedIn: 'root'
})

export class BrandService implements IApiService<Brand> {

  constructor(private http: HttpClient, private conf: ConfigService) {
  }
    GetAsync(): Observable<Brand[]> {
      if (this.conf.setting && this.conf.setting.length > 0) {
        return this.http.get<Brand[]>(`${this.conf.GetValue("urlApi")}/brand`);
      }
      return new Observable<Brand[]>();
  }


    FindByIdAsync(id: number): Observable<Brand>;
    FindByIdAsync(firstId: number, secondId: number): Observable<Brand>;
    FindByIdAsync(element: Brand): Observable<Brand>;
    FindByIdAsync(id: number): Observable<Brand>;
    FindByIdAsync(firstId: any, secondId?: any): Observable<Brand> {
        throw new Error('Method not implemented.');
    }
    CreateAsync(element: Brand): Observable<Brand> {
        throw new Error('Method not implemented.');
    }
    UpdateAsync(element: Brand): Observable<Brand> {
        throw new Error('Method not implemented.');
    }
    DeleteAsync(id: number): Observable<Brand>;
    DeleteAsync(element: Brand): Observable<Brand>;
    DeleteAsync(element: any): Observable<Brand> {
        throw new Error('Method not implemented.');
    }

  /**
   * Funzione GET per recuperare i brand disponibili da db
   * 
   * */
  GetBrands(): Observable<Brand[]> {
    if (this.conf.setting && this.conf.setting.length > 0) {
      return this.http.get<Brand[]>(`${this.conf.GetValue("urlApi")}/brand`);
    }
    return new Observable<Brand[]>();
  }

  /**
   * Funzione GETbyId per recuperare un brand da db usando un id
   * 
   * */
  GetBrandsById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.conf.GetValue("urlApi")}/brand/${id}`)
  }
}
