import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos-card',
  templateUrl: './cursos-card.component.html',
  styleUrls: ['./cursos-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursosCardComponent {
  @Input() curso!: Curso;

  @Output() addToCartClick = new EventEmitter<Curso>();

  constructor(private cursosService: CursosService, private checkoutService: CheckoutService) {}

  onClick(): void {

    // Llamo al evento y emito enviandole el producto
    this.addToCartClick.emit(this.curso);
  }
}
