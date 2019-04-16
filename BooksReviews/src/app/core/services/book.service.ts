import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from 'src/app/shared/models/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly createURL = 'http://localhost:5000/books/create';
  private readonly listAllURL = 'http://localhost:5000/books/all';
  private readonly myPostsURL = 'http://localhost:5000/books/myPosts';
  private readonly detailsURL = 'http://localhost:5000/books/details/';
  private readonly editURL = 'http://localhost:5000/books/edit/';
  private readonly deleteURL = 'http://localhost:5000/books/delete/';

  constructor(private http : HttpClient) { }

  create(body) {
    console.log(body);
    return this.http.post<IBook>(this.createURL, body);
  }

  listAll() {
    return this.http.get<IBook[]>(this.listAllURL);
  }

  myPosts() {
    return this.http.get<IBook[]>(this.myPostsURL);
  }

  details(id) {
    return this.http.get<IBook>(this.detailsURL + id);
  }

  edit(id, body) {
    return this.http.put(this.editURL + id, body);
  }

  delete(id) {
    return this.http.delete(this.deleteURL + id);
  }
}
