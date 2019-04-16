// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class CanModifyGuard implements CanActivate {
//   id: string;

//   constructor(
//     private authService : AuthService,
//     private router : Router,
//     private route: ActivatedRoute
//   ) { }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       this.route.params.subscribe(params => {
//         this.id = params['id']
//         if (this.authService.isAdmin() || this.authService.isAuthor(this.id)) {
//           return true;
//         }

//         this.router.navigate(['/']);

//         return false;
//       })

//   }

// }
