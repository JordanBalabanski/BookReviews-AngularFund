import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowBooksComponent } from './show-books/show-books.component';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  declarations: [ListComponent, ShowBooksComponent],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
