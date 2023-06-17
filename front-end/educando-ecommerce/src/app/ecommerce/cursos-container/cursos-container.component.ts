import { Component, Input, OnInit, Output } from '@angular/core';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CursosService } from 'src/app/services/cursos.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cursos-container',
  template: `
  <div class="overflow-hidden m-3 text-center rounded shadow-lg p-4 gap-4 flex-wrap align-items-center m-auto items-container container" id="shop-items-container">
  <div *ngIf="sinCursos" class="container">
    <div class="row">
      <div class="col">
        <p>No hay cursos para esta categoría.</p>
      </div>
    </div>
  </div>
      <app-cursos-card (addToCartClick)="addToCart($event)" [curso]="curso" *ngFor="let curso of cursosFiltrados"></app-cursos-card>
  </div>
`,
  styleUrls: ['./cursos-container.component.css']
})
export class CursosContainerComponent implements OnInit {
  cursos: Curso | undefined | any;
  @Input() cursosFiltrados: Curso | undefined | any;
  @Input() sinCursos: boolean | any;

  @Output() addToCartClick = new EventEmitter<Curso>();

  constructor(
    private cursosService: CursosService,
    private checkoutService: CheckoutService
    ) {  }

  ngOnInit(): void {
    // Obtiene la lista de cursos filtrados a través del servicio `cursosService`
    this.cursosService.getCursos().subscribe({
      next: (cursos: any) => {
        this.cursosFiltrados = cursos;
      },
      error: (errorData) => {
        console.error(errorData);
      }
    })
  }

  // Agregar curso al carrito de compra
  addToCart(curso: Curso): void {
    this.checkoutService.updateCart(curso);
  }
}
