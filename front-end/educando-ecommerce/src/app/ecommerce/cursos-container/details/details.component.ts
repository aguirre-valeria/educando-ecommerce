import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CursosService } from '../../../services/cursos.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Categoria } from 'src/app/interfaces/categoria.interface';
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
  routeParams!: RouteParams;
  idDetail!: string;
  curso!: Curso;
  categoriaDetalle!: Categoria;
  idCategoria!: number;
  nombreCategoria!: string

  // Agrega el curso al carrito de compras a través del servicio `checkoutService`
  onClick(): void {
    this.checkoutService.updateCart(this.curso);
  }

  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private checkoutService: CheckoutService
  ) {  }

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
