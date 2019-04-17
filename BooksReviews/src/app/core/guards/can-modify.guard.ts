import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  ActivatedRoute,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class CanModifyGuard implements CanActivate {
  id: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      console.log(next.params['id']);

    if (
      this.authService.user["posts"].includes(next.params['id']) ||
      this.authService.user["roles"].includes("Admin")
    ) {
      return true;
    }

    console.log(this.id);
    console.log(this.authService.user);

    this.router.navigate(["/books/all"]);

    return false;
  }
}
