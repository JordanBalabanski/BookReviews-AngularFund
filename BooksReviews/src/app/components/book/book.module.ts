import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowBooksComponent } from './show-books/show-books.component';
import { BookRoutingModule } from './book-routing.module';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import { ControlFormComponent } from './control-form/control-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, ShowBooksComponent, DetailsComponent, FormComponent, ControlFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookRoutingModule
  ]
})
export class BookModule { }
