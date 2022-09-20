import { Observable } from "rxjs";

export interface IApiService<T> {

  GetAsync(): Observable<T[]>;
  FindByIdAsync(id: number): Observable<T>;
  CreateAsync(element: T): Observable<T>;
  UpdateAsync(element: T): Observable<T>;
  DeleteAsync(id: number): Observable<T>;
}

