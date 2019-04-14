import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenresComponent } from './genres/genres.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'register' },
  { path: 'manage', component: GenresComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
