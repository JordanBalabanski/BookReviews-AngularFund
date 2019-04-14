import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { UnauthGuard } from './core/guards/unauth.guard'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books' },
  { path: 'user', loadChildren: './components/authentication/authentication.module#AuthenticationModule', canLoad: [UnauthGuard] },
  { path: 'genres', loadChildren: './components/genre/genre.module#GenreModule', canLoad: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
