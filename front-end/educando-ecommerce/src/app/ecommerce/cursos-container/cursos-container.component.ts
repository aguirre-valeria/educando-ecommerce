import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos-container',
  template: `
  <div class="overflow-hidden m-3 text-center rounded shadow-lg p-4 gap-4 flex-wrap align-items-center m-auto items-container container" id="shop-items-container">
      <app-cursos-card (addToCartClick)="addToCart($event)" [curso]="curso" *ngFor="let curso of cursos"></app-cursos-card>
  </div>
`,
  styleUrls: ['./cursos-container.component.css']
})
export class CursosContainerComponent implements OnInit {
  cursos: Curso | undefined | any;

  constructor(private cursosService: CursosService, private checkoutService: CheckoutService) { 

    this.cursosService.getCursos().subscribe({
      next: (cursos: any) => {
        this.cursos = cursos;
        console.log(cursos);
      },
      error: (errorData) => {
        //console.error(errorData);
      }
    })
  }

  ngOnInit(): void {
  }

  addToCart(curso: Curso): void {
    this.checkoutService.updateCart(curso);
  }
}
