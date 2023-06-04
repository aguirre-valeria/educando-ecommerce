import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  cursos: Curso | undefined | any;
  cursosFiltrados: Curso | undefined | any;
  //selectedCourseId!: string; // Variable para almacenar el ID del curso seleccionado en el formulario
  selectedCourseId: string = 'Selecciona el curso';
  curso: any;

  constructor(private cursoService: CursosService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCursos(); // Llama a la función para obtener los cursos al inicializar el componente
  }

  obtenerCursos(): void {
    this.cursoService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
      console.log(this.cursos);
      this.filtrarCursos();
    });
  }

  irADetalles(cursoId: string): void {
    this.router.navigate(['cursos/details', cursoId]);
  }

  filtrarCursos(): void {
    this.cursosFiltrados = this.cursos.slice(0, 6);
    console.log(this.cursosFiltrados)
  }

  actualizarSelectedCourseId(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCourseId = target.value;
  }

  comprarAhora(): void {
    console.log(this.selectedCourseId)
    if (this.selectedCourseId) {
      this.router.navigate(['cursos/details', this.selectedCourseId]);
    }
  }
}
