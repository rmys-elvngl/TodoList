import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private tasks: FormArray = new FormArray<any>([]);
  taskService: any;

  constructor(private formBuilder: FormBuilder) { }

  

  createTaskFormGroup(task: Task): FormGroup {
    return this.formBuilder.group({
      id: task.id,
      taskName: task.taskName,
      userName: task.userName,
      isCompleted: false,
    });
  }

  addTask() {
    const id = this.tasks.length + 1;
    const task = new Task(id, '', '',false);
    this.tasks.push(this.createTaskFormGroup(task));
    this.tasks = this.getTaskForm().value
  }
  getTasks(): FormArray {
    return this.tasks;
  }
  getTaskForm(): FormGroup {
    return this.formBuilder.group({
      tasks: this.tasks
    });
  }

  getOngoingTasks(): FormGroup[] {
    return this.tasks.controls
      .filter(taskControl => !taskControl.value.isCompleted)
      .map(taskControl => taskControl as FormGroup);
  }
  // CompletedTasksComponent için tamamlanan görevleri getir
  getCompletedTasks(): FormGroup[] {
    return this.tasks.controls
      .filter(taskControl => taskControl.value.isCompleted)
      .map(taskControl => taskControl as FormGroup);
  }

  completeTask(index: number) {
    const taskGroup = this.getOngoingTasks()[index];
    taskGroup.get('isCompleted')?.setValue(true);
    const completedTask = taskGroup.value;
    // İlgili görevi tamamlananlara taşı
    this.getCompletedTasks().push(taskGroup);
    this.getOngoingTasks().splice(index, 1);
    let statusMessage = completedTask.isCompleted ? 'Tamamlandı' : 'Devam Ediyor';
    alert(`Görev Adı: ${completedTask.taskName}\nKullanıcı Adı: ${completedTask.userName}\nID: ${completedTask.id}\nDurumu: ${statusMessage}`);
  }
  onSubmit() {
    const tasks = this.taskService.getTasks().value;
    
    tasks.forEach((task: Task) => {
      task.isCompleted = false; // Görevlerin isCompleted özelliğini false olarak güncelle
    });
  
    let alertMessage = '';
  
    tasks.forEach((task: Task) => {
      const taskStatus = task.isCompleted ? 'Tamamlandı' : 'Devam Ediyor';
      alertMessage += `ID: ${task.id}\nGörev Adı: ${task.taskName}\nKullanıcı Adı: ${task.userName}\nDurumu: ${taskStatus}\n\n`;
    });
  
    alert(alertMessage);
  }
   // TaskFormComponent'ten gelen görevi kaydet
   saveTask(task: FormGroup) {
    this.tasks.push(task);
  }
  getTask(editingIndex: number): any {
    throw new Error('Method not implemented.');
  }
  updateTask(index: number, task: { taskName: any; userName: any; }) {
    throw new Error('Method not implemented.');
  }
  
}
export class Task {
  id: number;
  taskName: string;
  userName: string;
  isCompleted: boolean; 

  constructor(id: number, taskName: string, userName: string, isCompleted: boolean) {
    this.id = id;
    this.taskName = taskName;
    this.userName = userName;
    this.isCompleted = isCompleted; 
  }

}
