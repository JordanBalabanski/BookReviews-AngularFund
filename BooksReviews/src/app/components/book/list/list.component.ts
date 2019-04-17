import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { IGenre } from "src/app/shared/models/IGenre";
import { GenreService } from "src/app/core/services/genre.service";
import { IBook } from "src/app/shared/models/IBook";
import { BookService } from "src/app/core/services/book.service";
import { ActivatedRoute, UrlSegment } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  genres$: Observable<IGenre[]>;
  books: IBook[];
  booksToShow: IBook[];

  constructor(
    private route: ActivatedRoute,
    private genreService: GenreService,
    private bookService: BookService
  ) {}

  ngOnInit() {
    // console.log(this.route.snapshot.url[0].path);
    const path = this.route.snapshot.url[0].path;
    this.books = this.route.snapshot.data['listBooksResolver'];
      this.booksToShow = this.books;
    if (path === "all") {
      this.genres$ = this.genreService.listAll();
    }
  }

  filter(filterStr) {
    if (filterStr !== "All") {
      this.booksToShow = this.books.filter(book => book.genre === filterStr);
    } else {
      this.booksToShow = this.books;
    }
  }
}
