import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { TaskService, Task } from '../task.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  tasks: FormArray; // FormArray olarak tanımla
  taskForm!: FormGroup; 
  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks(); // tasks özelliğini servisten alınan FormArray ile doldur
    this.taskForm = this.taskService.getTaskForm(); // taskForm'u servisten alınan form ile doldur
  }

  ngOnInit(): void {}

  addTask() {
    this.taskService.addTask();
  }

  onSubmit() {
    this.taskService.onSubmit();
  }
  
  

  get ongoingTasks(): FormGroup[] {
    return this.taskService.getOngoingTasks();
  }

  get completedTasks(): FormGroup[] {
    return this.taskService.getCompletedTasks();
    
  }

  completeTask(index: number) {
    this.taskService.completeTask(index);
    
  }
}