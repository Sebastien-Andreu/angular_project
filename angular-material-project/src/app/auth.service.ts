import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerUser(username: string, password: string): Promise<any> {
    const registerData = { username, password };

    return this.http.post(`${this.apiUrl}/register`, registerData).toPromise();
  }
  
  loginUser(username: string, password: string): Promise<any> {
    const loginData = { username, password };

    return this.http.post(`${this.apiUrl}/login`, loginData).toPromise();
  }
}
