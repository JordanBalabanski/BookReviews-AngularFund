import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { IsAuthGuard } from '../../core/guards/is-auth.guard';
import { ControlFormComponent } from './control-form/control-form.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'all', component: ListComponent },
  { path: 'myReviews', component: ListComponent, canActivate: [IsAuthGuard] },
  { path: 'create', component: ControlFormComponent },
  { path: 'edit/:id', component: ControlFormComponent },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
