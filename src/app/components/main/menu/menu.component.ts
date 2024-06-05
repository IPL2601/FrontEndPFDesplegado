import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../../../services/cargar-script/cargar-scripts.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  ngOnInit(): void {
  }
  constructor( _cargarScripts: CargarScriptsService){
    _cargarScripts.Carga(["menu.js"])
  }
  logout(): void {
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('usuario');
  }
}
