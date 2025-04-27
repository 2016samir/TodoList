import { Injectable } from '@angular/core';
import { Task } from '../../shared/interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  taskList:Task[] = [];
  // task:object = {};

}
