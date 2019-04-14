import { Injectable } from '@angular/core';
import {
  Router,
  CanLoad,
  Route,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanLoad {

  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }
}
