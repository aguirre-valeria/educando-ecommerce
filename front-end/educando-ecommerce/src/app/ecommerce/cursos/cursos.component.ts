import { Component } from '@angular/core';
import { CkeckoutService } from 'src/app/services/ckeckout.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  total$ = this.checkoutService.totalAction$;

  constructor(private checkoutService: CkeckoutService) {}
}
