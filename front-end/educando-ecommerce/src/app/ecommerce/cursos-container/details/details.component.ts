import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CursosService } from '../../../services/cursos.service';
import { CheckoutService } from 'src/app/services/checkout.service';

interface RouteParams {
  //category: string;
  id: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  routeParams!: RouteParams;
  //categoryDetail!: string;
  idDetail!: string;
  curso!: Curso;

  onClick(): void {
    this.checkoutService.updateCart(this.curso);
  }

  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private checkoutService: CheckoutService
  ) {

    this.cursosService.getCursos().subscribe({
      next: (cursos: any) => {
        if(cursos) {
          this.curso = cursos.id;
          console.log(this.curso);
          //this.categoryDetail = this.route.snapshot.paramMap.get('category')!;
      //console.log(this.categoryDetail)
      this.idDetail = this.route.snapshot.paramMap.get('id')!;
      console.log(this.idDetail)
        }

        //console.log(cursos);
      },
      error: (errorData) => {
        console.error(errorData);
      }
    })
    //this.categoryDetail = this.route.snapshot.paramMap.get('category')!;
    //console.log(this.categoryDetail)
    this.idDetail = this.route.snapshot.paramMap.get('id')!;
    // console.log(this.idDetail)
    this.cursosService.getCursos().subscribe({
      next: (cursos: any) => {
      this.curso = cursos;
      // console.log(this.curso.idDetail)
      this.curso = cursos.find(
        (curso: Curso) =>
        curso.id_curso.toString() === this.idDetail,
        // console.log(this.curso)
      );
      // console.log(this.curso.name)
    },
    error: (errorData) => {
      console.error(errorData);
    }});
  }

  ngOnInit(): void {

  }
}
