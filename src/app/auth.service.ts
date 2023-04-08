import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string {
    const token = localStorage.getItem('token');
    if (token == null){
      return "";
    }
    return token;
  }

  deleteToken() {
    localStorage.removeItem('token')
  }
}
