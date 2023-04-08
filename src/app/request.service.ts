import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, options: object = {}): Observable<T> {
    return this.http.get<T>(url, options).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(url: string, body: any,  options: object = {}): Observable<T> {
    return this.http.post<T>(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(url: string, body: any, options: object = {}): Observable<T> {
    return this.http.put<T>(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(url: string, options: object = {}): Observable<T> {
    return this.http.delete<T>(url, options).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status >= 400 && error.status < 500) {
      //console.error('An error occurred:', error.error.message);
      return throwError(error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      return throwError('Something bad happened; please try again later.');
    }
  };

}
