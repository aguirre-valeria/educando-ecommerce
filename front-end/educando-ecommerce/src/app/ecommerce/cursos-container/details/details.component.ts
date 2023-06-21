import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CursosService } from '../../../services/cursos.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
interface RouteParams {
  idCategoria: string;
  idCurso: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailsComponent implements OnInit {

  @Output() addToCartClick = new EventEmitter<Curso>();
  
  routeParams!: RouteParams;
  idDetail!: string;
  curso!: Curso;
  categoriaDetalle!: Categoria;
  idCategoria!: number;
  nombreCategoria!: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private checkoutService: CheckoutService,
    private authService: AuthService,
  ) {  }

  // Agrega el curso al carrito de compras a través del servicio `checkoutService`
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

  // Obtiene los parámetros de la ruta y carga los detalles del curso y la categoría asociados.
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idCategoria = params['idCategoria'];
      const idCurso = params['idCurso'];

      this.idCategoria = Number(idCategoria);
      this.idDetail = idCurso;

      this.cursosService.getCursos().subscribe({
        next: (cursos: any) => {
          this.curso = cursos.find(
            (curso: Curso) =>
              curso.id_curso.toString() === this.idDetail &&
              curso.id_categoria === this.idCategoria
          );
        },
        error: (errorData) => {
          console.error(errorData);
        }
      });

      this.cursosService.getCategorias().subscribe({
        next: (categorias: any) => {
          const categoriaEncontrada = categorias.find(
            (categoria: Categoria) => categoria.id_categoria === this.idCategoria
          );
          if (categoriaEncontrada) {
            this.nombreCategoria = categoriaEncontrada.nombre;
          }
        },
        error: (errorData) => {
          console.error(errorData);
        }
      });
    })
  }
}
