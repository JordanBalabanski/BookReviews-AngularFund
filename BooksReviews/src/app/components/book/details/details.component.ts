import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { IBook } from 'src/app/shared/models/IBook';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  book: IBook;
  id: string;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.bookService.details(this.id).subscribe((data) => {
      this.book = data;
    })
  }

}
