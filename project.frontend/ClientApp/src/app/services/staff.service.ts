import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiService } from '../dto/IApiService.interface';
import { Staff } from '../dto/Staff.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService implements IApiService<Staff> {

  constructor(
    private http: HttpClient,
    private conf: ConfigService
  ) { }

  GetAsync(): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.conf.GetValue("urlApi")}/staff`);
  }

  FindByIdAsync(id: number): Observable<Staff> {
    return this.http.get<Staff>(`${this.conf.GetValue("urlApi")}/staff/${id}`);
  }

  CreateAsync(element: Staff): Observable<Staff> {
    return this.http.post<Staff>(`${this.conf.GetValue("urlApi")}/staff`, element);
  }

  UpdateAsync(element: Staff): Observable<Staff> {
    return this.http.put<Staff>(`${this.conf.GetValue("urlApi")}/staff`, element);
  }

  DeleteAsync(id: number): Observable<Staff> {
    return this.http.delete<Staff>(`${this.conf.GetValue("urlApi")}/staff/${id}`);
  }
}
