import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import Swal from 'sweetalert2';

// Componente que representa una tarjeta del curso en la vista
@Component({
  selector: 'app-cursos-card',
  templateUrl: './cursos-card.component.html',
  styleUrls: ['./cursos-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursosCardComponent {
  @Input() curso!: Curso;

  @Output() addToCartClick = new EventEmitter<Curso>();

  constructor(
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Realiza diferentes acciones dependiendo del estado del curso y la autenticación del usuario.
  onClick(): void {
    const addedToCart = this.checkoutService.isCourseInCart(this.curso);
    if (addedToCart) {
      Swal.fire({
        icon: 'warning',
        title: 'Curso ya agregado',
        html: `
          <div>${this.curso.nombre_curso}</div>
          <div class="text-muted">El curso ya está en el carrito de compra</div>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Finalizar compra',
        showCancelButton: true,
        cancelButtonText: 'Volver'
      }).then((result) => {
        if (result.isConfirmed) {
          // Redireccionar al carrito de compras
          this.router.navigate(['/cursos/checkout']);
        }});
    } else {
      const authenticated = this.authService.estaAutenticado();

      if (authenticated) {
        const userCourses = this.authService.obtenerCursosUsuario();

        userCourses.subscribe((cursos: Curso[]) => {
          const hasCourse = cursos.find((c) => c.id_curso === this.curso.id_curso);

          if (hasCourse) {
            Swal.fire({
              icon: 'warning',
              title: 'Curso ya adquirido',
              html: `
                <div>${this.curso.nombre_curso}</div>
                <div class="text-muted">Ya has adquirido este curso</div>
              `,
              showConfirmButton: true,
              confirmButtonText: 'Ir a Mis Cursos',
              showCancelButton: true,
              cancelButtonText: 'Volver'
            }).then((result) => {
              if (result.isConfirmed) {
                // Redireccionar a la página "Mis Cursos"
                this.router.navigate(['/mis-cursos']);
              }
            });
          } else {
            this.addToCartAndShowSuccess();
          }
        });
      } else {
        this.addToCartAndShowSuccess();
      }
    }
  }

  // Método privado para agregar el curso al carrito y mostrar un mensaje de éxito
  private addToCartAndShowSuccess(): void {
    Swal.fire({
      icon: 'success',
      title: '¡Curso agregado!',
      html: `
        <div class="text-center">
          <img src="${this.curso.imagen_url}" alt="${this.curso.nombre_curso}" width="100">
          <p>${this.curso.nombre_curso}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Ir al carrito',
      cancelButtonText: 'Seguir comprando',
    }).then((result) => {
      if (result.isConfirmed) {
        // Redireccionar al carrito de compras
        this.router.navigate(['/cursos/checkout']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Continuar comprando
      }
    });

    this.addToCartClick.emit(this.curso);
  }


}
