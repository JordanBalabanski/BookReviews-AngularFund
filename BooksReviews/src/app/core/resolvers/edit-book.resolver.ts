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
export class EditBookResolver implements Resolve<IBook>{

  constructor(private bookService: BookService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const id = route.params['id'];

    return this.bookService.details(id);
  }
}
