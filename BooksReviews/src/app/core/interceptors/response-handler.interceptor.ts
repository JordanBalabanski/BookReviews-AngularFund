import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerInterceptor implements HttpInterceptor {

  constructor(public toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(tap((success) => {
      if(success instanceof HttpResponse){
        console.log(success.url);
        // if(success.url.endsWith('register') || success.url.endsWith('login') || success.url.endsWith('create') || success.url.includes('delete')){
        //   console.log(success);
        //   this.toastr.success(success['body']['message']);
        // }
      }
    }), catchError((err) => {
      console.log(err);
      this.toastr.error(err.error.message);
      throw err;
    }))
  };
}
