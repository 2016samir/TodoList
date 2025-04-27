import { Component, inject, PLATFORM_ID } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add-task',
  imports: [ ReactiveFormsModule ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  private readonly task = inject(TaskService)
  private readonly platform_ID = inject(PLATFORM_ID)
  private readonly router = inject(Router)



     taskInput:FormGroup = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      isCompleted: new FormControl(false),
      id: new FormControl(Date.now())
    })

  addNewTask():void{
    const newTask = {
      title: this.taskInput.get('title')?.value,
      description: this.taskInput.get('description')?.value,
      isCompleted: this.taskInput.get('isCompleted')?.value,
      id: this.taskInput.get('id')?.value
    }
    this.task.taskList.push(newTask);
    
    if (isPlatformBrowser(this.platform_ID)) {
      localStorage.setItem("taskList" , JSON.stringify(this.task.taskList))    
    }

    Swal.fire({
            position: "center",
            icon: "success",
            title: "Added successfully",
            showConfirmButton: false,
            timer: 1000
          });

    setTimeout( ()=> this.router.navigate(['/home']) , 1000 )
          

    // console.log(this.task.taskList);    
  }

}
