import { Component } from '@angular/core';
import { CkeckoutService } from 'src/app/services/ckeckout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  quantity$ = this.checkoutService.quantityAction$;
  constructor(private checkoutService: CkeckoutService) { }
}
