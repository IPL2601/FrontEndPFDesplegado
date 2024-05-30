import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/Usuario/usuario.service';
import { Usuario } from '../../Model/usuario';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent implements OnInit{
  loginForm: FormGroup;
  usuario!: Usuario;
  usuarioService !: UsuarioService;
  router: any;

  constructor(private fb: FormBuilder, usuarioService: UsuarioService) {
    this.loginForm = this.fb.group({
      usu_NOM: [''],
      usu_PASS: ['']
    });
    this.usuarioService = usuarioService;
  }

  onSubmit() {
      this.usuario = this.loginForm.value;
      this.usuarioService.login(this.usuario).subscribe(response => {
        console.log("Formulario enviado correctamente", response);
        if (response != null) {
          
          localStorage.setItem('usuario', JSON.stringify(response));
          sessionStorage.setItem('usuario', JSON.stringify(response));
          window.location.href = '/formulario';
        }
      }, error => {
        console.error("Error al enviar el formulario", error);
      });
    
  }
  ngOnInit(): void {
    const usuario = sessionStorage.getItem('usuario');
    if (usuario) {
      console.log('La variable "usuario" existe en localStorage:', JSON.parse(usuario));
      window.location.href = '/formulario';
    } else {
      console.log('La variable "usuario" no existe en localStorage');
    }
  }
}
