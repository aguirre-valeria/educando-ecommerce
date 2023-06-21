import { Component } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CursosService } from 'src/app/services/cursos.service';

const bootstrapColors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark'
];

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  total$ = this.checkoutService.totalAction$;
  categorias: Categoria | any | null;
  cursos: Curso | any | null;
  cursosFiltrados: Curso | any | null;
  sinCursos: boolean = false;
  tituloCursos: string = 'Todos nuestros cursos';

  constructor(
    private checkoutService: CheckoutService,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.getCategorias();
    this.getCursos();
  }

  // Método que obtiene las categorías de los cursos.
  getCategorias(): void {
    this.cursosService.getCategorias().subscribe(
      (categorias: Categoria) => {
        const categoriasArray = Object.values(categorias);

        // Mapea las categorías y asigna una clase de color de Bootstrap a cada una.
        this.categorias = categoriasArray.map((categoria:any, index:number) => ({
          ...categoria,
          colorClass: 'btn-' + bootstrapColors[index % bootstrapColors.length]
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Método que obtiene la lista de cursos.
  getCursos(): void {
    this.cursosService.getCursos().subscribe(
      (cursos: Curso) => {
        const cursosArray = Object.values(cursos);
        this.cursos = cursosArray;
        this.cursosFiltrados = cursos;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Método que filtra los cursos por categoría.
   filtrarCursosPorCategoria(idCategoria: number): void {
    if (idCategoria === 0) {
      console.log(idCategoria);
      // Si se selecciona la opción "Todas las categorías", mostrar todos los cursos
      this.cursosFiltrados = this.cursos;
      this.tituloCursos = 'Todos nuestros cursos';
      this.sinCursos = false;
    } else {
      console.log(idCategoria);
      // Filtrar los cursos por la categoría seleccionada
      this.cursosService.getCursosPorCategoria(idCategoria).subscribe(
        (cursos: Curso) => {
          this.cursosFiltrados = cursos;
          console.log(this.cursosFiltrados);
          this.sinCursos = this.cursosFiltrados.length === 0;
          console.log(this.sinCursos)
          const categoriaSeleccionada = this.categorias.find((categoria: Categoria) => categoria.id_categoria === idCategoria);
          if (categoriaSeleccionada) {
            this.tituloCursos = `Nuestros cursos de ${categoriaSeleccionada.nombre}`;
          } else {
            this.tituloCursos = 'Nuestros cursos';
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  // Método que muestra todos los cursos sin filtrar.
  mostrarTodosLosCursos(): void {
    this.cursosFiltrados = this.cursos;
    this.tituloCursos = 'Todos nuestros cursos';
  }
}
