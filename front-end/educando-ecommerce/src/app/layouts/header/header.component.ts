import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  filtro: string = '';

  constructor(
    private router: Router
  ) { }

  buscarCursos() {
    // Filtrar los cursos según el valor del filtro
    if (this.filtro.trim() !== '') {
      this.router.navigate(['/cursos']);
    } else {
      Swal.fire('Error', 'Por favor, ingresa algo en el campo de búsqueda.', 'error');
      return;
    }
  }
}
