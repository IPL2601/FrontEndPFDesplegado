import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { TaskService } from '../../../services/Task/task.service';
import { Task } from '../../../Model/Task';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hoy',
  standalone: true,
  imports: [MenuComponent, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './hoy.component.html',
  styleUrls: ['./hoy.component.css'] // Note the change to styleUrls
})
export class HoyComponent implements OnInit {

  tasks!: Array<Task>;
  USU_COD!: number;
  
  constructor(
    public taskService: TaskService,
    private router: Router
  ){}
  ngOnInit(): void {
    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString !== null) {
      // Parsear el usuarioString como un objeto JSON
      const usuario = JSON.parse(usuarioString);
  
      // Acceder a la propiedad deseada, por ejemplo, usu_COD
      const usu_COD = usuario.usu_COD;
      this.USU_COD = usu_COD;
    }
    this.taskService.getTodayTasks(this.USU_COD).subscribe(resp => {
      this.tasks = resp;
    },
    error => console.error(error));
  }

  getTaskClass(priority: string): string {
    const priorityNumber = parseInt(priority, 10);
    switch (priorityNumber) {
      case 1:
        return 'low-priority';
      case 2:
        return 'medium-priority';
      case 3:
        return 'high-priority';
      default:
        return '';
    }
  }
  navigateToTask(id: number): void {
    this.router.navigate(['/task', id]);
  }
}
