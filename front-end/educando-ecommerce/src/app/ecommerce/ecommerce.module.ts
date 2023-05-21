import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos/cursos.component';
import { CursosContainerComponent } from './cursos-container/cursos-container.component';
import { CursosCardComponent } from './cursos-container/cursos-card/cursos-card.component';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutCardComponent } from './checkout/checkout-card/checkout-card.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './ecommerce.routing.module';


@NgModule({
  declarations: [
    CursosComponent,
    CursosContainerComponent,
    CursosCardComponent,
    DetailsComponent,
    CheckoutComponent,
    CheckoutCardComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    RouterModule
  ],
  exports: [
    CursosComponent,
    CursosContainerComponent,
    CursosCardComponent,
    DetailsComponent,
    CheckoutComponent,
    CheckoutCardComponent
  ]
})
export class EcommerceModule {
  
 }
