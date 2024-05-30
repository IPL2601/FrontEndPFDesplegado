import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Task } from '../../../Model/Task';
import { TaskService } from '../../../services/Task/task.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-semana',
  standalone: true,
  imports: [MenuComponent, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './semana.component.html',
  styleUrls: ['./semana.component.css']
})
export class SemanaComponent {
  tasks!: Array<Task>;
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  USU_COD!: number;
  constructor(public taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString !== null) {
      // Parsear el usuarioString como un objeto JSON
      const usuario = JSON.parse(usuarioString);
  
      // Acceder a la propiedad deseada, por ejemplo, usu_COD
      const usu_COD = usuario.usu_COD;
      this.USU_COD = usu_COD;
    }
    this.taskService.getWeekTasks(this.USU_COD).subscribe(resp => {
      this.tasks = resp;
    },
    error => console.error(error));
  }

  getTasksForDay(day: string): Array<Task> {
    return this.tasks.filter(task => {
      const taskDate = new Date(task.task_DATE);
      const dayOfWeek = taskDate.toLocaleDateString('es-ES', { weekday: 'long' });
      return dayOfWeek.toLowerCase() === day.toLowerCase();
    });
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
