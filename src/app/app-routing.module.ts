import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pacients/list/list.component';
import { CreateComponent } from './pacients/create/create.component';
import { ViewComponent } from './pacients/view/view.component';
import { AttendCreateComponent } from './attend/attend-create/attend-create.component';
import { AttendListComponent } from './attend/attend-list/attend-list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: CreateComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'create-attend/:id', component: AttendCreateComponent },
  { path: 'list-attend/:id', component: AttendListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
