import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^[A-z0-9]{3,16}$/)]],
    })
  }

  login() {
    this.authService
      .login(this.form.value)
      .subscribe((data) => {
        localStorage.setItem('token', data['token']);
        localStorage.setItem('username', data['user']['username']);
        localStorage.setItem('isAdmin', data['user']['isAdmin']);
        this.authService.setUser();
        this.router.navigate([ '/' ]);
      });
  }

  get username() {
    return this.form.controls.username;
  }

  get password() {
    return this.form.controls.password;
  }
}
