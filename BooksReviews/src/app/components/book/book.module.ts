import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowBooksComponent } from './show-books/show-books.component';
import { ControlFormComponent } from './control-form/control-form.component';
import { FormComponent } from './form/form.component';
import { BookRoutingModule } from './book-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ListComponent, ShowBooksComponent, ControlFormComponent, FormComponent, DetailsComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookModule { }
