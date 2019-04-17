import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { IsAuthGuard } from '../../core/guards/is-auth.guard';
import { ControlFormComponent } from './control-form/control-form.component';
import { DetailsComponent } from './details/details.component';
import { CanModifyGuard } from 'src/app/core/guards/can-modify.guard';
import { EditBookResolver } from 'src/app/core/resolvers/edit-book.resolver';
import { ListBookResolver } from 'src/app/core/resolvers/list-books.resolver';
// import { MyPostsResolver } from 'src/app/core/resolvers/my-porsts.resolver';

const routes: Routes = [
  { path: 'all', component: ListComponent, resolve: {listBooksResolver: ListBookResolver} },
  { path: 'myReviews', component: ListComponent, canActivate: [IsAuthGuard], resolve: {listBooksResolver: ListBookResolver} },
  { path: 'create', component: ControlFormComponent, canActivate: [IsAuthGuard] },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'edit/:id', component: ControlFormComponent, canActivate: [CanModifyGuard], resolve: {editBookResolver: EditBookResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
