import { Component, Input, OnInit } from '@angular/core';
import { Curso } from 'src/app/interfaces/cursos.interface';

@Component({
  selector: 'app-checkout-card',
  templateUrl: './checkout-card.component.html',
  styleUrls: ['./checkout-card.component.css']
})
export class CheckoutCardComponent {
  @Input() cart!: Curso[];
}
