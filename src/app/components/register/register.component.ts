import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/Usuario/usuario.service';
import { Usuario } from '../../Model/usuario';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  usuarioService!: UsuarioService;
  usuarioRequest!: Usuario;

  constructor(private fb: FormBuilder, private router: Router, usuarioService: UsuarioService) {
    this.registerForm = this.fb.group({
      usu_NOM: ['', Validators.required],
      usu_PASS: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
    this.usuarioService = usuarioService;
  }

  onSubmit() {
    // Maneja el registro
    this.usuarioRequest = this.registerForm.value;
    this.usuarioService.register(this.usuarioRequest).subscribe(response => {
      console.log("Formulario enviado correctamente", response);
      if (response != null) {
        localStorage.setItem('usuario', JSON.stringify(response));
        localStorage.setItem('usuario', JSON.stringify(response));
        window.location.href = '/formulario';
      }
    }, error => {
      console.error("Error al enviar el formulario", error);
    });
    console.log(this.registerForm.value);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('usu_PASS')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
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
