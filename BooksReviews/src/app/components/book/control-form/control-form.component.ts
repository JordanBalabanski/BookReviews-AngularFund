import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBook } from 'src/app/shared/models/IBook';
import { BookService } from 'src/app/core/services/book.service';
import { Observable } from 'rxjs';
import { IGenre } from 'src/app/shared/models/IGenre';
import { GenreService } from 'src/app/core/services/genre.service';

@Component({
  selector: 'app-control-form',
  templateUrl: './control-form.component.html',
  styleUrls: ['./control-form.component.css']
})
export class ControlFormComponent implements OnInit {
  isCreate: boolean;
  book: IBook;
  id: string;
  genres: IGenre[];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private genreService: GenreService
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.url[0].path);
    this.genreService.listAll().subscribe(data => { this.genres = data });
    const path = this.route.snapshot.url[0].path;
    if (path === 'create') {
      this.isCreate = true;
    } else {
      this.isCreate = false;
      this.route.params.subscribe( params => {
        this.id = params['id'];
        console.log(this.id);
        this.bookService.details(this.id).subscribe(data => this.book = data);
      })

    }
  }

}
