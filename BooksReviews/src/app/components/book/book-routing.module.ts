import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ControlFormComponent } from './control-form/control-form.component';
import { IsAuthGuard } from '../../core/guards/is-auth.guard'
// import { CanModifyGuard } from '../../core/guards/can-modify.guard'

const routes: Routes = [
  { path: 'all', component: ListComponent },
  { path: 'myReviews', component: ListComponent, canActivate: [IsAuthGuard] },
  { path: 'create', component: ControlFormComponent },
  { path: 'edit/:id', component: ControlFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
