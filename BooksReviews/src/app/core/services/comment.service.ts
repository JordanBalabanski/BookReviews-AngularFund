import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/shared/models/IComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly baseURL = 'http://localhost:5000/books/details/';
  private readonly createURL = '/comment/create';
  private readonly listAllURL = '/comment/all';
  private readonly deleteURL = 'http://localhost:5000/books/comment/delete/';

  constructor(private http: HttpClient) { }

  create(id, body) {
    return this.http.post(this.baseURL + id + this.createURL, body);
  }

  listAll(id) {
    return this.http.get<IComment[]>(this.baseURL + id + this.listAllURL);
  }

  delete(id) {
    return this.http.delete(this.deleteURL + id);
  }
}
