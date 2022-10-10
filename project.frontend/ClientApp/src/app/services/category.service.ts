import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiService } from '../dto/IApiService.interface';
import { Category } from '../dto/Category.interface';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})

export class CategoryService implements IApiService<Category> {

  constructor(
    private http: HttpClient,
    private conf: ConfigService
  ) { }

  GetAsync(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.conf.GetValue("urlApi")}/category`);
  }

  FindByIdAsync(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.conf.GetValue("urlApi")}/category/${id}`);
  }

  CreateAsync(element: Category): Observable<Category> {
    return this.http.post<Category>(`${this.conf.GetValue("urlApi")}/category`, element);
  }

  UpdateAsync(element: Category): Observable<Category> {
    return this.http.put<Category>(`${this.conf.GetValue("urlApi")}/category`, element);
  }

  DeleteAsync(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.conf.GetValue("urlApi")}/category/${id}`);
  }
}
