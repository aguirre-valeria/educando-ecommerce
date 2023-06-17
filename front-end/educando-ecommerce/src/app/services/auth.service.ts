import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable, Subject, tap, of, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL de la API
  private apiUrl = 'https://educando-test.onrender.com/';

  // Variable para verificar si un administrador ha iniciado sesión
  public isAdminLoggedIn: boolean = false;

  // Variable para almacenar los datos del usuario actual logueado
  public currentUser: Usuario | null = null;

  // Subject para notificar cambios en el estado de autenticación
  private cambioEstadoAutenticacion = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) {}

  // Retorna un Observable para suscribirse a los cambios de estado de autenticación
  getCambioEstadoAutenticacion() {
    return this.cambioEstadoAutenticacion.asObservable();
  }

  // Notifica a los componentes suscritos que se ha iniciado sesión
  iniciarSesionSuccess() {
    this.cambioEstadoAutenticacion.next(true);
  }

  // Registra un usuario en la API
  registrarUsuario(usuario: any): Observable<any> {
    const url = `${this.apiUrl}registro/`;
    return this.http.post(url, usuario);
  }

  // Inicia sesión en la API con el email y la contraseña proporcionados
  iniciarSesion(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login/`, { email, password })
      .pipe(
        tap(response => {
          const token = response.token;
          const usuario = response.usuario;

          // Encriptar los datos sensibles antes de almacenarlos en el LocalStorage
          const encryptedUser = this.encryptData(usuario);

          // Guardar el token de acceso y los datos del usuario en el LocalStorage
          localStorage.setItem('accessToken', token);
          localStorage.setItem('currentUser', encryptedUser);

          // Notifica que se ha iniciado sesión exitosamente
          this.iniciarSesionSuccess();
        })
      );
  }

  // Encripta los datos utilizando AES
  private encryptData(data: any): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'encryptionKey').toString();
    return encryptedData;
  }

  // Desencripta los datos utilizando AES
  private decryptData(encryptedData: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, 'encryptionKey');
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  // Obtiene el usuario actual desde el LocalStorage
  getCurrentUser(): Usuario | null {
    const encryptedData = localStorage.getItem('currentUser');
    if (encryptedData) {
      const decryptedData = this.decryptData(encryptedData);
      return JSON.parse(decryptedData);
    }
    return null;
  }

  // Verifica si el usuario está autenticado
  estaAutenticado(): boolean {
    // Verificar si el token de acceso está presente en el almacenamiento local o en la variable donde lo guardaste
    const token = localStorage.getItem('accessToken');
    return !!token; // Retorna true si el token existe, false si no existe
  }

  // Cierra la sesión del usuario
  cerrarSesion(): void {
    // Eliminar el token de acceso del almacenamiento local o de la variable donde lo guardaste
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.cambioEstadoAutenticacion.next(false);
  }

  // Obtiene los cursos del usuario desde la API
  obtenerCursosUsuario(): Observable<any> {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // Si no hay un token de acceso, devuelve un observable vacío
      return of([]);
    }

    const url = `${this.apiUrl}mis_cursos/`;

    // Realiza una solicitud POST a la API para obtener los cursos del usuario
    return this.http.post<any>(url, { token }).pipe(
      catchError((error) => {
        console.error('Error al obtener los cursos del usuario:', error);
        return of([]);
      })
    );
  }
}
