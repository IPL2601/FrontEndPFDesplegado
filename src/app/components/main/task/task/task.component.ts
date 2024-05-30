import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../../Model/Task';
import { TaskService } from '../../../../services/Task/task.service';
import { MenuComponent } from '../../menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule, FormsModule, CommonModule],
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: Task = {
    task_ID: 0,
    task_NOM: '',
    task_DESC: '',
    task_PRI: '',
    task_DONE: false,
    task_USU: 0,
    task_DATE: new Date()
  };

  taskReq: Task = {
    task_ID: 0,
    task_NOM: '',
    task_DESC: '',
    task_PRI: '',
    task_DONE: false,
    task_USU: 0,
    task_DATE: new Date()
  };
  
  constructor(private route: ActivatedRoute, private taskService: TaskService) { }
  
  ngOnInit(): void {
    const taskId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(taskId).subscribe(resp => {
      this.taskReq = resp;
      this.task = resp;
    });
  }

  updateTask() {
    this.taskService.updateTask(this.task.task_ID, this.task).subscribe(updatedTask => {
      window.location.href = '/semana';
    });
  }
  doTask() {
    this.taskService.doTask(this.task.task_ID).subscribe(resp => {
      window.location.href = '/semana';
    });
  }
  deleteTask(){
    this.taskService.deleteTask(this.task.task_ID).subscribe(resp => {
      window.location.href = '/semana';
    }); 
  }


}
