import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { Component } from '@angular/core';
import moment from 'moment';
import { Task } from '../../../Model/Task';
import { TaskService } from '../../../services/Task/task.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  currentMonth: moment.Moment;
  weeks!: Array<any>;
  today: moment.Moment;
  tasks: Task[] = []; // Array de tareas

  constructor(taskService: TaskService) {
    this.currentMonth = moment();
    this.today = moment();
    taskService.getAllTasks().subscribe(resp=>{
      this.tasks = resp;
    },
    error=>console.error(error));
  }

  ngOnInit() {
    this.generateCalendar(this.currentMonth);
  }

  generateCalendar(month: moment.Moment) {
    const startOfMonth = month.clone().startOf('month').startOf('week');
    const endOfMonth = month.clone().endOf('month').endOf('week');

    const date = startOfMonth.clone().subtract(1, 'day');
    const weeks = [];

    while (date.isBefore(endOfMonth, 'day')) {
      weeks.push({
        days: Array(7).fill(0).map(() => {
          const currentDate = date.add(1, 'day').clone();
          return {
            date: currentDate,
          };
        })
      });
    }

    this.weeks = weeks;
  }

  isToday(date: moment.Moment): boolean {
    return date.isSame(this.today, 'day');
  }

  previousMonth() {
    this.currentMonth = this.currentMonth.clone().subtract(1, 'month');
    this.generateCalendar(this.currentMonth);
  }

  nextMonth() {
    this.currentMonth = this.currentMonth.clone().add(1, 'month');
    this.generateCalendar(this.currentMonth);
  }

  // Define una función para agrupar las tareas por día
  groupTasksByDay(tasks: Task[]) {
    const tasksByDay: { [key: string]: Task[] } = {}; // Usamos un objeto para almacenar las tareas por día

    // Iteramos sobre la lista de tareas
    for (const task of tasks) {
      // Obtenemos la fecha de la tarea en formato 'YYYY-MM-DD'
      const taskDate = moment(task.task_DATE).format('YYYY-MM-DD');

      // Si el día no existe en el objeto, lo inicializamos con un array vacío
      if (!tasksByDay[taskDate]) {
        tasksByDay[taskDate] = [];
      }

      // Agregamos la tarea al día correspondiente en el objeto
      tasksByDay[taskDate].push(task);
    }

    // Devolvemos el objeto con las tareas agrupadas por día
    return tasksByDay;
  }
}
