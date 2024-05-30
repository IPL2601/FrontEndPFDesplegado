import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../Model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API_SERVER = "https://refreshing-generosity-production.up.railway.app/";
  constructor(private httpClient : HttpClient) {
    
  }
  public getAllTasks(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "tasks")
  }

  public getTodayTasks(id: number): Observable<any> {
    return this.httpClient.get(`${this.API_SERVER}tasks/today/${id}`)
  }

  public getWeekTasks(id: number): Observable<any> {
    return this.httpClient.get(`${this.API_SERVER}tasks/week/${id}`)
  }

  public saveTask(id: number, task: Task): Observable<any> {
    return this.httpClient.post<Task>(`${this.API_SERVER}tasks/new/${id}`, task)
  }
  public updateTask(idtask: number, task: Task): Observable<any> {
    return this.httpClient.put<Task>(`${this.API_SERVER}tasks/${idtask}`, task)
  }
  public getTask(idtask: number): Observable<any> {
    return this.httpClient.get<Task>(`${this.API_SERVER}tasks/n/${idtask}`)
  }
  public deleteTask(idtask: number): Observable<any> {
    return this.httpClient.delete<Task>(`${this.API_SERVER}tasks/${idtask}`)
  }
  public doTask(idtask: number): Observable<any> {
    return this.httpClient.put<Task>(`${this.API_SERVER}tasks/${idtask}/do`, null)
  }
}
