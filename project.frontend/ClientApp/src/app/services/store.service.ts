import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiService } from '../dto/IApiService.interface';
import { Store } from '../dto/Store.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService implements IApiService<Store> {

  constructor(
    private http: HttpClient,
    private conf: ConfigService
  ) { }

  GetAsync(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.conf.GetValue("urlApi")}/store`);
  }

  FindByIdAsync(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.conf.GetValue("urlApi")}/store/${id}`);
  }

  CreateAsync(element: Store): Observable<Store> {
    return this.http.post<Store>(`${this.conf.GetValue("urlApi")}/store`, element);
  }

  UpdateAsync(element: Store): Observable<Store> {
    return this.http.put<Store>(`${this.conf.GetValue("urlApi")}/store`, element);
  }

  DeleteAsync(id: number): Observable<Store> {
    return this.http.delete<Store>(`${this.conf.GetValue("urlApi")}/store/${id}`);
  }
}
