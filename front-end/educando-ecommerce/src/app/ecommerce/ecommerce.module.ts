import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos/cursos.component';
import { AppRoutingModule } from '../app-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutCardComponent } from './checkout/checkout-card/checkout-card.component';



@NgModule({
  declarations: [
    CursosComponent,
    CheckoutComponent,
    CheckoutCardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class EcommerceModule { }
