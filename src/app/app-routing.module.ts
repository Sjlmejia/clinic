import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pacients/list/list.component';
import { CreateComponent } from './pacients/create/create.component';

const routes: Routes = [
  { path:'', component:ListComponent },
  { path: 'create', component:CreateComponent },
  { path: 'edit/:id', component:CreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
