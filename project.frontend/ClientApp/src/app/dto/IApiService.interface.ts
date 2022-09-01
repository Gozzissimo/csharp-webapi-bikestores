import { Observable } from "rxjs";

export interface IApiService<T> {

  GetAsync(): Observable<T[]>;
  FindByIdAsync(id: number): Observable<T>;
  FindByIdAsync(firstId: number, secondId: number) : Observable<T>;
  FindByIdAsync(element: T): Observable<T>;
  CreateAsync(element: T): Observable<T>;
  UpdateAsync(element: T): Observable<T>;
  FindByIdAsync(id: number): Observable<T>;
  DeleteAsync(id: number): Observable<T>;
  DeleteAsync(element: T): Observable<T>;
}
