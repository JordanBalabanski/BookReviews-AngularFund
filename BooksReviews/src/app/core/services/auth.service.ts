import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/shared/models/IUser';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = 'http://localhost:5000/auth/login';
  private readonly registerUrl = 'http://localhost:5000/auth/register';
  private readonly getUserURL = 'http://localhost:5000/auth/getUser/';

  private _user: IUser = null;

  constructor(
    private http : HttpClient
  ) {  }

  get user() {
    return this._user;
  }

  setUser() {
    const username = localStorage.getItem('username');
    this.http.get<IUser>(this.getUserURL + username).subscribe(data => {this._user = data[0]; console.log(this._user);});
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

  canModify(id) {
    if (this._user && (this._user['posts'].includes(id) || this._user['roles'].includes('Admin'))) {
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
