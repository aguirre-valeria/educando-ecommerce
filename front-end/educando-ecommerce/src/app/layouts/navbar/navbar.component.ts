import { Component } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  quantity$ = this.checkoutService.quantityAction$;
  constructor(private checkoutService: CheckoutService) { }
}
