import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/shared/models/IBook';
import { BookService } from 'src/app/core/services/book.service';
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
    this.route.params.subscribe(params => { this.id = params['id'];
    this.bookService.details(this.id).subscribe(data => this.book = data)
  })
  }

}
