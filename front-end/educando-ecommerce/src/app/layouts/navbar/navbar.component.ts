import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  quantity$ = this.checkoutService.quantityAction$;
  isAdminLoggedIn: boolean = false; // Variable para controlar el estado de inicio de sesión del administrador
  public showProfileMenu: boolean = false; // Variable para controlar la visualización del menú de perfil
  currentUser: Usuario | null = null; // Variable para almacenar los datos del usuario actual logueado

  constructor(
    private checkoutService: CheckoutService,
    private usuariosService: UsuariosService,
    private autenticacionService: AuthService
  ) { }

  ngOnInit() {
    // Suscribirse al Observable para detectar cambios en el estado de autenticación
    this.autenticacionService.getCambioEstadoAutenticacion().subscribe(autenticado => {
      this.isAdminLoggedIn = autenticado;
      this.currentUser = autenticado ? this.autenticacionService.getCurrentUser() : null;
    });

    // Comprobar el estado de autenticación actual
    if (this.autenticacionService?.estaAutenticado()) {
      this.isAdminLoggedIn = true;
      this.currentUser = this.autenticacionService.getCurrentUser();
    }
  }

  // Lógica para cerrar sesión
  public logout(): void {
    // Limpiar los datos de sesión y redirigir al usuario a la página de inicio de sesión

    // Eliminar el token del LocalStorage
    this.autenticacionService.cerrarSesion();
    this.autenticacionService.isAdminLoggedIn = false;
    this.currentUser = null;
  }

  // Lógica para mostrar/ocultar el menú de perfil
  public toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  // Método para verificar si el token almacenado en el LocalStorage es válido
  private isValidToken(token: string): boolean {
    // Aquí puedes realizar la lógica para verificar si el token es válido
    // Por ejemplo, puedes verificar la firma del token, la fecha de expiración, etc.

    // En este ejemplo, simplemente comprobamos si el token existe
    return !!token;
  }

  // Método para obtener los datos del usuario actual logueado a partir del token
  private getCurrentUser(token: string): Usuario | null {
    // Aquí puedes realizar la lógica para obtener los datos del usuario actual logueado a partir del token
    // Por ejemplo, puedes decodificar el token y obtener los datos necesarios

    // En este ejemplo, simplemente devolvemos un usuario vacío
    return {
      id_usuario: 1,
      email: 'example@example.com',
      nombre: 'John',
      apellido: 'Doe',
      id_rol_id: 1
    };
  }
}

