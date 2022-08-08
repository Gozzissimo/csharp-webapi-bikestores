import { Injectable } from '@angular/core';
import { Brand } from '../dto/brand.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseURL: string = "https://localhost:7124/api/Brand";

  constructor(private http: HttpClient) {
  }

  GetBrands(): Observable<Brand> {
    return this.http.get<Brand>(this.baseURL)
  }

  GetBrandsById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseURL}/${id}`)
  }
}
