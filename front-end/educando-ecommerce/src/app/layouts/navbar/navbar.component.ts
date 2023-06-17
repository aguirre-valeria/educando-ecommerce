import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
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
}

