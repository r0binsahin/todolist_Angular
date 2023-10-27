import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import {
  BehaviorSubject,
  Observable,
  catchError,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  serviceURL: string;
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.serviceURL = 'http://localhost:3000/tasks';
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error, null, 2)}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(this.serviceURL, task)
      .pipe(catchError(this.handleError));
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL).pipe(
      catchError(this.handleError),
      tap((tasks) => this.tasksSubject.next(tasks))
    );
  }

  editTask(editedTask: Task): Observable<Task> {
    return this.http
      .put<Task>(this.serviceURL + '/' + editedTask.id, editedTask)
      .pipe(catchError(this.handleError));
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http
      .delete<Task>(this.serviceURL + '/' + task.id)
      .pipe(catchError(this.handleError));
  }
}
