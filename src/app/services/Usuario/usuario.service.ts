import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../Model/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private API_SERVER = "https://refreshing-generosity-production.up.railway.app/";
  constructor(private httpClient : HttpClient) { 
  }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "users")
  }

  public register(usuario: Usuario): Observable<any> {
    return this.httpClient.post<Usuario>(this.API_SERVER + "users/register", usuario)
  }

  public login(usuario: Usuario): Observable<any> {
    return this.httpClient.post<Usuario>(this.API_SERVER + "users/login", usuario)
  }
}
