import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent
  ]

})
export class LayautModule { }
