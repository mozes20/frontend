import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { HttpHeaders } from '@angular/common/http';

const EVENT_URL = 'http://localhost:8080/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  error:string = ""

  constructor(private requestService: RequestService) { }

  getAuthenticate(userDetails:any):Observable<any>{
    return this.requestService.post(`http://localhost:8080/authenticate`,userDetails);
  }

  getUsers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.requestService.get<any>(EVENT_URL, httpOptions);
  }

  getUser(eventId:number): Observable<any>{
    return this.requestService.get(`${EVENT_URL}/${eventId}`);
  }

  createUser(event: any): Observable<any> {
    return this.requestService.post(`${EVENT_URL}/`, event,{responseType: 'text' as const});
  }

  updateUser(event: any): Observable<any> {
    return this.requestService.put(`${EVENT_URL}/`, event);
  }

  deleteUser(eventId: number): Observable<any> {

    const url = `${EVENT_URL}/${eventId}`;
    return this.requestService.delete(url, {responseType: 'text' as const});
  }

}
