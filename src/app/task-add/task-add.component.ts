import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { TaskService, Task } from '../task.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent {
  tasks: FormArray; // FormArray olarak tanımlayın
  taskForm!: FormGroup;
   
  displayedColumns: string[] = ['taskName', 'userName', 'actions'];
updateId!:any
isEditEnabled: boolean = false
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  editingIndex = -1;
  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks(); // tasks özelliğini servisten alınan FormArray ile doldurun
    this.taskForm = this.taskService.getTaskForm(); // taskForm'u servisten alınan form ile doldurun
    this.dataSource.data = this.tasks.controls; }
  
    saveChanges(index: number) {
      const taskGroup = this.tasks.at(index);
      const updatedTaskName = taskGroup.get('taskName')?.value;
    
      const task = this.tasks.at(index).value;
      task.taskName = updatedTaskName;
    
      this.editingIndex = -1;
    }
    
    
    editTask(index: number) {
      if (!this.isEditEnabled) {
        // Enable editing for the clicked task
        const taskGroup = this.tasks.at(index);
        this.updateId = index;
        taskGroup.get('taskName')?.enable();
        this.isEditEnabled = true;
        this.editingIndex = index;
      } else {
        // Save changes and disable editing
        this.saveChanges(this.updateId);
        this.isEditEnabled = false;
      }
    }
  
  deleteTask(index: number) {
    // Remove the task at the specified index from the tasks array
    this.tasks.removeAt(index);
  }
  cancelEditing() {
    // Reset the form controls to their original values
    const taskGroup = this.tasks.controls[this.editingIndex];
    taskGroup.patchValue(this.taskService.getTask(this.editingIndex));
  
    // Reset the editing index
    this.editingIndex = -1;
  }
  ngOnInit(): void {}

  // addTask() {
  //   if (this.tasks.length === 0) {
  //     const newTaskGroup = this.taskService.createTaskFormGroup(new Task(1, '', '', false));
  //     this.tasks.push(newTaskGroup);
  //   }
  // }
  addTask() {
    const id = this.tasks.length + 1;
    const task = new Task(id, '', '',false);
    this.tasks.push(this.taskService.createTaskFormGroup(task));
  } 
  
  
  
  

  onSubmit() {
    const tasks = this.taskService.getTasks().value;
    let alertMessage = '';

    tasks.forEach((task: Task) => {
      alertMessage += `ID: ${task.id}\nGörev Adı: ${task.taskName}\nKullanıcı Adı: ${task.userName}\n\n`;
    });

    alert(alertMessage);
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
