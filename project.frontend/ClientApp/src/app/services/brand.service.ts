import { Injectable } from '@angular/core';
import { Brand } from '../dto/brand.model';
import { ISetting } from '../dto/isetting.interface';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})

export class BrandService {

  private cfg : ConfigService | undefined;
  private url: string |undefined;
  constructor(private http: HttpClient, private conf: ConfigService) {
    this.cfg = conf;
    this.url = this.cfg.GetValue("urlApi");
  }

  GetBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.url}/brand`);
  }

  GetBrandsById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.url}/brand/${id}`)
  }
}
