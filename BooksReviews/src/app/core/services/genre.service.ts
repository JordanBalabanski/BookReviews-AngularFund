import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGenre } from 'src/app/shared/models/IGenre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private readonly createURL = 'http://localhost:5000/genres/create';
  private readonly listAllURL = 'http://localhost:5000/genres/all';
  private readonly deleteURL = 'http://localhost:5000/genres/delete/';

  constructor(
    private http : HttpClient
  ) { }

  create(body) {
    return this.http.post(this.createURL, body);
  }

  listAll() {
    return this.http.get<IGenre[]>(this.listAllURL);
  }

  delete(id) {
    return this.http.delete(this.deleteURL + id);
  }
}
