import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { IBook } from 'src/app/shared/models/IBook';
import { BookService } from '../services/book.service';

@Injectable({
  providedIn: 'root'
})
export class ListBookResolver implements Resolve<IBook[]>{

  constructor(private bookService: BookService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log(route);
    if (route.url[0].path === 'all') {
      return this.bookService.listAll();
    } else {
      return this.bookService.myPosts();
    }
  }
}
