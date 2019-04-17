import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { IGenre } from "src/app/shared/models/IGenre";
import { GenreService } from "src/app/core/services/genre.service";
import { IBook } from "src/app/shared/models/IBook";
import { BookService } from "src/app/core/services/book.service";
import { ActivatedRoute, UrlSegment } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  genres$: Observable<IGenre[]>;
  books: IBook[];
  booksToShow: IBook[];
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private genreService: GenreService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // console.log(this.route.snapshot.url[0].path);
    const path = this.route.snapshot.url[0].path;
    this.books = this.route.snapshot.data['listBooksResolver'];
      this.booksToShow = this.books;
    if (path === "all") {
      this.genres$ = this.genreService.listAll();
    }

    this.form = this.fb.group({
      search: ['']
    })
  }

  filter(filterStr) {
    if (filterStr !== "All") {
      this.booksToShow = this.books.filter(book => book.genre === filterStr);
    } else {
      this.booksToShow = this.books;
    }
  }

  search() {
    this.booksToShow = this.books.filter(book => book.title.toLowerCase().includes(this.form.value.search.toLowerCase()));
  }
}
