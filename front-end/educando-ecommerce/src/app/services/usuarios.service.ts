import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  // URL de la API
  private apiUrl = 'https://educando-test.onrender.com/';

  constructor(
    private http: HttpClient
  ) {}

  // Obtiene todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}usuario`);
  }

  // Obtiene un usuario por su ID
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}usuario/${id}`);
  }

  // Crea un nuevo usuario
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}usuario`, usuario);
  }

  // Actualiza un usuario existente por su ID
  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}usuario/${id}`, usuario);
  }
}
