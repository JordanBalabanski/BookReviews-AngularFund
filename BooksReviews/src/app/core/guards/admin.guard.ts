import { Injectable } from '@angular/core';
import {
  Router,
  CanLoad,
  UrlSegment,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }
}
