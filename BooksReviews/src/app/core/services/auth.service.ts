import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/shared/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'http://localhost:5000/auth/login';
  private readonly registerUrl = 'http://localhost:5000/auth/register';
  private readonly getUserURL = 'http://localhost:5000/auth/getUser/';

  user: IUser;

  constructor(
    private http : HttpClient
  ) {  }

  setUser() {
    const username = localStorage.getItem('username');
    this.http.get<IUser>(this.getUserURL + username).subscribe(data => {this.user = data; console.log(this.user[0]);});
  }

  register(body) {
    return this.http.post(this.registerUrl, body);
  }

  login(body) {
    return this.http.post(this.loginUrl, body);
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
  }

  isAuthor(id) {
    return this.user[0].posts.includes(id);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
