import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenreService } from 'src/app/core/services/genre.service';
import { Observable } from 'rxjs';
import { IGenre } from 'src/app/shared/models/IGenre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  form: FormGroup;
  genres$: Observable<IGenre[]>;

  constructor(
    private genreService: GenreService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      genre: ['', [Validators.required]]
    });
    this.genres$ = this.genreService.listAll();
  }

  create() {
    this.genreService.create(this.form.value).subscribe(() => {
      this.genres$ = this.genreService.listAll();
      this.form.reset();
    })
  }

  delete(id) {
    this.genreService.delete(id).subscribe(() => {
      this.genres$ = this.genreService.listAll();
    })
  }

  get genre() {
    return this.form.controls.genre;
  }
}
