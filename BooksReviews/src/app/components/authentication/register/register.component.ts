import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPass: ['', [Validators.required, Validators.minLength(3)]]
      })
    })
  }

  register() {
    const username = this.form.value.username;
    const password = this.form.value.passwords.password;
    this.authService
      .register({ username, password })
      .subscribe((data) => {
        console.log(data);

        this.router.navigate([ '/user/login' ]);
      });
  }

  get username() {
    return this.form.controls.username;
  }

  get passwords() {
    return this.form.controls.passwords;
  }
}
