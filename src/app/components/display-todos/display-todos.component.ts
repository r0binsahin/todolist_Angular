import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task';
import { CrudService } from 'src/app/service/crud.service';
import { sortTasks } from 'src/app/utils/utils';

@Component({
  selector: 'app-display-todos',
  templateUrl: './display-todos.component.html',
  styleUrls: ['./display-todos.component.scss'],
})
export class DisplayTodosComponent implements OnInit {
  tasksSubscription: Subscription;
  constructor(private crudService: CrudService) {
    this.tasksSubscription = this.crudService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      sortTasks(this.tasks);
    });
  }

  task: Task = new Task();
  tasks: Task[] = [];
  editMode: boolean = false;
  editingTaskIndex: number = -1;

  addTaskValue: string = '';
  editTaskValue: string = '';

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe((res) => {
      this.tasks = res;
      sortTasks(this.tasks);
      console.log('getAllTasks:', this.tasks);
    });
  }

  editTask() {
    this.task.task_name = this.editTaskValue;
    this.crudService.editTask(this.task).subscribe(() => {
      this.getAllTasks();
      sortTasks(this.tasks);
    });

    this.setEditMode(this.editingTaskIndex);
  }

  deleteTask(task: Task) {
    this.crudService.deleteTask(task).subscribe((res) => {
      this.getAllTasks();
    });
  }

  call(editedTask: Task, index: number) {
    this.task = editedTask;
    this.editTaskValue = editedTask.task_name;
    this.setEditMode(index);
  }

  setEditMode(index: number) {
    this.editingTaskIndex = index;
    this.editMode = !this.editMode;
    console.log(this.editMode);
  }

  setIsDone(editedTask: Task, index: number) {
    this.task = editedTask;
    this.editingTaskIndex = index;
    this.task.isDone = !this.task.isDone;

    this.crudService.editTask(this.task).subscribe((res) => {
      this.getAllTasks();
      sortTasks(this.tasks);

      console.log(res);
    });
  }
}
