import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../shared/interface/task';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-specific-task',
  imports: [ReactiveFormsModule],
  templateUrl: './specific-task.component.html',
  styleUrl: './specific-task.component.scss'
})
export class SpecificTaskComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly taskService = inject(TaskService)
  private readonly platform_ID = inject(PLATFORM_ID)
  private readonly router = inject(Router)

  taskIndex!:any;
  tasks:Task[] = this.taskService.taskList;
  specificTask!:Task;

  specifcTaskInput!:FormGroup;

  ngOnInit(): void {
      this.getTaskIndex();
    }

    

  getTaskIndex():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.taskIndex = param.get('index')!        
        this.specificTask = this.tasks[this.taskIndex]

    // console.log(this.specificTask);

        this.specifcTaskInput = new FormGroup({
          title: new FormControl(this.specificTask.title),
          description: new FormControl(this.specificTask.description),
          isCompleted: new FormControl(this.specificTask.isCompleted),
          id: new FormControl(this.specificTask.id)
        })
      }
    })
  }

  updateTask():void{
    const upgradeTask = {
          title: this.specifcTaskInput.get('title')?.value,
          description: this.specifcTaskInput.get('description')?.value,
          isCompleted: this.specifcTaskInput.get('isCompleted')?.value,
          id: this.specifcTaskInput.get('id')?.value
    }

    this.specificTask = upgradeTask;
    this.taskService.taskList[this.taskIndex] = this.specificTask;

    if (isPlatformBrowser(this.platform_ID)) {
      localStorage.setItem( "taskList" ,JSON.stringify(this.taskService.taskList) )
    }
    Swal.fire({
            position: "center",
            icon: "success",
            title: "It has been changed",
            showConfirmButton: false,
            timer: 1500
          });

          setTimeout( ()=> this.router.navigate(['/home']) , 1000 )

  }

  removeSpecificTask():void{
    this.taskService.taskList.splice(this.taskIndex ,1)

    console.log(this.taskService.taskList);
    
    if (isPlatformBrowser(this.platform_ID)) {
      localStorage.setItem( "taskList" ,JSON.stringify(this.taskService.taskList) )
    }

    Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been done",
            showConfirmButton: false,
            timer: 1000
          });

          setTimeout( ()=> this.router.navigate(['/home']) , 1000 )
    

  }
  

}
