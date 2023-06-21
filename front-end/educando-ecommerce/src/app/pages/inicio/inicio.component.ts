import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CursosService } from 'src/app/services/cursos.service';
import KeenSlider, { KeenSliderInstance } from "keen-slider";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ["../../../../node_modules/keen-slider/keen-slider.min.css", './inicio.component.css']
})

export class InicioComponent implements OnInit, OnDestroy {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  cursos: Curso | undefined | any;
  cursosFiltrados: Curso | undefined | any;
  selectedCourseId: string = 'Selecciona el curso';

  slider: KeenSliderInstance | null = null

  constructor(
    private cursoService: CursosService,
    private router: Router
  ) {}

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  }

  ngOnInit(): void {
    this.obtenerCursos();
    this.selectedCourseId = "";
  }

  // Obtener la lista de cursos desde el servicio
  obtenerCursos(): void {
    this.cursoService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
      this.filtrarCursos();
      this.inicializarCarrusel();
    });
  }

  // Inicializar el carrusel utilizando la librería KeenSlider
  inicializarCarrusel(): void {
    if (this.sliderRef && this.sliderRef.nativeElement) {
      setTimeout(() => {
        this.slider = new KeenSlider(this.sliderRef.nativeElement, {
          loop: true,
          mode: "free",
          slides: {
            perView: 3,
            spacing: 15,
          },
        });
      }, 0);
    }
  }

   // Navegar a la página de detalles de un curso
  irADetalles(categoriaId: string, cursoId: string): void {
    this.router.navigate(['cursos/details', categoriaId, cursoId]);
  }

  // Filtrar los cursos para mostrar solo algunos en la vista inicial
  filtrarCursos(): void {
    this.cursosFiltrados = this.cursos.slice(0, 6);
    //console.log(this.cursosFiltrados)
  }

  // Actualizar el ID del curso seleccionado en el formulario
  actualizarSelectedCourseId(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCourseId = target.value;
  }

  // Realizar la compra del curso seleccionado
  comprarAhora(): void {
    if (this.selectedCourseId) {
      const selectedCourseIdNumber = Number(this.selectedCourseId);
      const cursoEncontrado = this.cursos.find((curso: Curso) => curso.id_curso === selectedCourseIdNumber);
      if (cursoEncontrado) {
        const categoriaId = cursoEncontrado.id_categoria;
        this.router.navigate(['cursos/details', categoriaId, this.selectedCourseId]);
      }
    }
  }
}
