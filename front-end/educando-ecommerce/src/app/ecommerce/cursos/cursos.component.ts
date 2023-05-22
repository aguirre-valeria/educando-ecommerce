import { Component } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  total$ = this.checkoutService.totalAction$;

  constructor(private checkoutService: CheckoutService) {}
}
