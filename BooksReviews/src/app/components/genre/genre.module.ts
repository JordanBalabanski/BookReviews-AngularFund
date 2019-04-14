import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresComponent } from './genres/genres.component';
import { GenreRoutingModule } from './genre-router.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GenresComponent],
  imports: [
    CommonModule,
    GenreRoutingModule,
    ReactiveFormsModule
  ]
})
export class GenreModule { }
