import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../../../services/Task/task.service';
import { Task } from '../../../Model/Task';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{
  taskForm: FormGroup;
  taskRequest!: Task;
  USU_COD!: number;
  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.formBuilder.group({
      task_NOM: [''],
      task_DESC: [''],
      task_PRI: [''],
      task_DATE: ['']
    });
  
  }
  ngOnInit(): void {
    const usuarioString = sessionStorage.getItem('usuario');
    if (usuarioString !== null) {
      // Parsear el usuarioString como un objeto JSON
      const usuario = JSON.parse(usuarioString);
  
      // Acceder a la propiedad deseada, por ejemplo, usu_COD
      const usu_COD = usuario.usu_COD;
      this.USU_COD = usu_COD;
    }
  }
  onSubmit() {
    this.taskRequest = this.taskForm.value
    this.taskRequest.task_DONE = false;
    this.taskService.saveTask(this.USU_COD, this.taskRequest).subscribe(response => {
      console.log("Form enviado", response);
    }, error => {
      console.error("Error al enviar el formulario", error);
    });
    
  }
  setPriority(priority: number) {
    this.taskForm.patchValue({ task_PRI: priority });
  }
}
