import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: FormArray; // FormArray olarak tanımlandı
  taskForm!: FormGroup; 
  constructor(private taskService: TaskService,private formBuilder: FormBuilder) {
    this.tasks = this.taskService.getTasks(); // tasks özelliğini servisten alınan FormArray ile doldurun
    this.taskForm = this.taskService.getTaskForm(); // taskForm'u servisten alınan form ile doldurun
  }

  ngOnInit(): void {}

  addTask() {
    this.taskService.addTask();
  }

  onSubmit() {
    const tasks = this.taskService.getTasks().value;
    let alertMessage = '';

    tasks.forEach((task: Task) => {
      alertMessage += `ID: ${task.id}\nGörev Adı: ${task.taskName}\nKullanıcı Adı: ${task.userName}\n\n`;
    });

    alert(alertMessage);
    this.tasks.clear();
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
