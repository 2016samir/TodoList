import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { NotfoundComponent } from './features/additional/notfound/notfound.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:'To Do List'},
    {path:'addTask',
        loadComponent: ()=> import('./features/pages/add-task/add-task.component')
        .then( m=> m.AddTaskComponent),
        title:'addTask'
    },
    {path:'specificTask/:index',
        loadComponent: ()=> import('./features/pages/specific-task/specific-task.component')
        .then( m=> m.SpecificTaskComponent ),
        title:'specificTask'
    },
    {path:'**',component:NotfoundComponent,title:'notfound'}
];
