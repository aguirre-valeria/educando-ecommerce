import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable, Subject, tap, of, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = 'http://127.0.0.1:8000/';
  private apiUrl = 'https://educando-test.onrender.com/';
  public isAdminLoggedIn: boolean = false;
  public currentUser: Usuario | null = null; // Variable para almacenar los datos del usuario actual logueado
  private cambioEstadoAutenticacion = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getCambioEstadoAutenticacion() {
    return this.cambioEstadoAutenticacion.asObservable();
  }

  iniciarSesionSuccess() {
    // Notificar a los componentes suscritos que se ha iniciado sesión
    this.cambioEstadoAutenticacion.next(true);
  }

  registrarUsuario(usuario: any): Observable<any> {
    const url = `${this.apiUrl}Registro/`; // Reemplaza con la ruta adecuada para el registro en tu API
    return this.http.post(url, usuario);
  }

  iniciarSesion(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Login/`, { email, password })
      .pipe(
        tap(response => {
          // Almacenar el token de acceso en el almacenamiento local o en una variable de tu elección
          const token = response.token;
          const usuario = response.usuario;

          console.log(usuario)

          // Encriptar los datos sensibles antes de almacenarlos en el LocalStorage
        const encryptedUser = this.encryptData(usuario);

        // this.currentUser = usuario;

        // Guardar el token de acceso y los datos del usuario en el LocalStorage
        localStorage.setItem('accessToken', token);
        localStorage.setItem('currentUser', encryptedUser);

          // Guardar el token de acceso para futuras solicitudes a la API
          // Puedes utilizar localStorage u otra forma de almacenamiento seguro
        this.iniciarSesionSuccess();
        })
      );
  }

  private encryptData(data: any): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'encryptionKey').toString();
    return encryptedData;
  }

  private decryptData(encryptedData: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, 'encryptionKey');
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  getCurrentUser(): Usuario | null {
    const encryptedData = localStorage.getItem('currentUser');
    if (encryptedData) {
      const decryptedData = this.decryptData(encryptedData);
      return JSON.parse(decryptedData);
    }
    return null;
  }

  estaAutenticado(): boolean {
    // Verificar si el token de acceso está presente en el almacenamiento local o en la variable donde lo guardaste
    const token = localStorage.getItem('accessToken');
    return !!token; // Retorna true si el token existe, false si no existe
  }

  cerrarSesion(): void {
    // Eliminar el token de acceso del almacenamiento local o de la variable donde lo guardaste
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.cambioEstadoAutenticacion.next(false);
  }

  obtenerCursosUsuario(): Observable<any> {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // Si no hay un token de acceso, devuelve un observable vacío
      return of([]);
    }

    const url = `${this.apiUrl}Mis_cursos/`; // Reemplaza con la ruta adecuada para obtener los cursos del usuario en tu API

    // Realiza una solicitud POST a la API para obtener los cursos del usuario
    return this.http.post<any>(url, { token }).pipe(
      catchError((error) => {
        console.error('Error al obtener los cursos del usuario:', error);
        return of([]);
      })
    );
  }
}
