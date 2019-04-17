import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBook } from 'src/app/shared/models/IBook';
import { BookService } from 'src/app/core/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  book: IBook;
  id: string;
  sub: Subscription;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.id = params['id'];
    this.sub = this.bookService.details(this.id).subscribe(data => {
      this.book = data;
      // console.log(this.book);
      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  delete(id) {
      this.bookService.delete(this.id).subscribe(() => {
        this.router.navigate(['/books/all']);
      })
  }

}
