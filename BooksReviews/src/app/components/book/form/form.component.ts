import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef } from "@angular/core";
import { BookService } from "src/app/core/services/book.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidateUrl } from "./url.validator";
import { IBook } from "src/app/shared/models/IBook";
import { ActivatedRoute, Router } from "@angular/router";
import { IGenre } from "src/app/shared/models/IGenre";
import { AuthService } from 'src/app/core/services/auth.service';
// import { Observable } from 'rxjs';

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit, AfterViewChecked  {
  form: FormGroup;
  id: string;

  @Input() isCreate: boolean;
  @Input() book: IBook;
  @Input() genres: IGenre[];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef : ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      content: ["", [Validators.required, Validators.minLength(30)]],
      image: ["", [Validators.required, ValidateUrl]],
      genre: ["", [Validators.required]]
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  create() {
    this.bookService.create(this.form.value).subscribe(data => {
      this.authService.setUser();
      const bookId = data['book']['_id'];
      this.router.navigate([`/books/details/${bookId}`]);
    });
  }

  edit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.bookService.edit(this.id, this.form.value).subscribe(data => {
        const bookId = data['book']['_id'];
        this.authService.setUser();
        this.router.navigate([`/books/details/${bookId}`]);
      });
    });
  }

  get title() {
    return this.form.controls.title;
  }

  get content() {
    return this.form.controls.content;
  }

  get image() {
    return this.form.controls.image;
  }

  get genre() {
    return this.form.controls.genre;
  }
}
