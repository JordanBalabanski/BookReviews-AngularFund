import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  username: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.username = localStorage.getItem('username');
  }

  logout() {
    this.authService.logout();
  }
}
