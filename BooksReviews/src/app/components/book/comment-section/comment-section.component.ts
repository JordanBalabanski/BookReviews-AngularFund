import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/shared/models/IComment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/core/services/comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {

  comments$: Observable<IComment[]>;
  id: string;
  form: FormGroup;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      content: ['', [Validators.required]]
    })
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.comments$ = this.commentService.listAll(this.id);
    })
  }

  Comment() {
      const { content } = this.form.value;
      this.commentService.create(this.id, { content }).subscribe(() => {
        this.comments$ = this.commentService.listAll(this.id);
        this.form.reset();
      })
  }

}
