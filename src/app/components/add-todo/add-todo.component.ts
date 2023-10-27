import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CrudService } from 'src/app/service/crud.service';
import { getRandomNumber } from 'src/app/utils/utils';
import { sortTasks } from 'src/app/utils/utils';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
  task: Task = new Task();

  addTaskValue: string = '';

  constructor(
    private crudService: CrudService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.configureTodo();
  }

  configureTodo() {
    this.addTaskValue = '';
  }

  addTask() {
    if (this.addTaskValue.length <= 1) {
      alert('Task should be longer then  a single letter!');
      return;
    } else {
      this.task.task_name = this.addTaskValue;
      this.task.id = getRandomNumber(1, 1000);
    }
    this.crudService
      .addTask(this.task)
      .pipe()
      .subscribe((res) => {
        res = this.task;

        this.configureTodo();
        this.cdr.detectChanges();
      });
  }
}
