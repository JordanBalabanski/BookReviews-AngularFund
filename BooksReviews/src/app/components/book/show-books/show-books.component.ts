import { Component, OnInit, Input } from '@angular/core';
import { IBook } from 'src/app/shared/models/IBook';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.css']
})
export class ShowBooksComponent implements OnInit {

  @Input() booksToShow: IBook[]
  constructor() { }

  ngOnInit() {
  }

}
