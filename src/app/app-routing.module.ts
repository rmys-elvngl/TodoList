import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [ 
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'taskList' ,component:TaskListComponent},
  {path:'taskAdd',component:TaskAddComponent},
  {path:'home',component:HomeComponent}
// Varsayılan olarak '/add' sayfasını görüntüler
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
