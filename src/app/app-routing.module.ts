import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoAppComponent } from './components/todo-app/todo-app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo-app',
    pathMatch: 'full',
  },
  { path: 'todo-app', component: TodoAppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
