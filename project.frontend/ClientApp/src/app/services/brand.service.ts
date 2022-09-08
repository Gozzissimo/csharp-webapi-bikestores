import { Injectable } from '@angular/core';
import { Brand } from '../dto/brand.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { IApiService } from '../dto/IApiService.interface';

@Injectable({
  providedIn: 'root'
})

export class BrandService implements IApiService<Brand> {

  constructor(private http: HttpClient, private conf: ConfigService) {
      //console.table([this.conf.isLoading, this.conf.settingLoaded]);
  }

  GetConf(): ConfigService {
    return this.conf;
  }

  GetAsync(): Observable<Brand[]> {
    if (this.conf.setting && this.conf.setting.length > 0) {
      return this.http.get<Brand[]>(`${this.conf.GetValue("urlApi")}/brand`);
    }
    //console.log("setting non creato")
    //console.table([this.conf.isLoading, this.conf.settingLoaded]);
    return new Observable<Brand[]>();
  }

  FindByIdAsync(id: number): Observable<Brand> {
    console.log("FindByIdAsync")
    if (this.conf.setting && this.conf.setting.length > 0) {
      console.log("FindByIdAsync Endpoint Call")
      return this.http.get<Brand>(`${this.conf.GetValue("urlApi")}/brand/${id}`);
    }
    console.log("FindByIdAsync End with empy Obs")
    return new Observable<Brand>();
  }

  CreateAsync(element: Brand): Observable<Brand> {
    if(this.conf.setting && this.conf.setting.length > 0) {
      return this.http.post<Brand>(`${this.conf.GetValue("urlApi")}/brand`, element);
    }
    return new Observable<Brand>();
  }
  UpdateAsync(element: Brand): Observable<Brand> {
    if(this.conf.setting && this.conf.setting.length > 0) {
      return this.http.put<Brand>(`${this.conf.GetValue("urlApi")}/brand`, element);
    }
    return new Observable<Brand>();
  }
  DeleteAsync(id: number): Observable<Brand> {
    if(this.conf.setting && this.conf.setting.length > 0) {
      return this.http.delete<Brand>(`${this.conf.GetValue("urlApi")}/brand/${id}`);
    }
    return new Observable<Brand>();
  }
}
