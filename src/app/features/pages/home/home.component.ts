import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Task } from '../../../shared/interface/task';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

private readonly router = inject(Router)
private readonly platfom_ID = inject(PLATFORM_ID)
private readonly task = inject(TaskService)
private readonly toastrService = inject(ToastrService)

tasks:Task[] = this.task.taskList;


  ngOnInit(): void {
      
    if(isPlatformBrowser(this.platfom_ID)){
      const storedTask = localStorage.getItem("taskList")
      if(storedTask){
        this.task.taskList = JSON.parse(storedTask)
        this.tasks = this.task.taskList;
      }
    }



  }

  addTask():void{
    this.router.navigate(['/addTask'])
  }

  completeTask(index:number):void{
    this.tasks[index].isCompleted = true;
    this.task.taskList = this.tasks;

    if(isPlatformBrowser(this.platfom_ID)){
    localStorage.setItem('taskList' , JSON.stringify(this.tasks))
    }
    this.toastrService.success("Mission Accomplish")
    

  }


  deleteTask(index:number):void{

    this.tasks.splice(index,1);

    this.task.taskList = this.tasks;
    if(isPlatformBrowser(this.platfom_ID)){
      localStorage.setItem('taskList' , JSON.stringify(this.tasks))
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been done",
        showConfirmButton: false,
        timer: 1000
      });

  }



  navigate(index:number):void{
    this.router.navigate(['/specificTask']);

    console.log(index);
  }

}
