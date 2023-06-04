import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradoresComponent } from './administradores/administradores.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RegistroComponent } from './registro/registro.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AppRoutingModule } from '../app-routing.module';
import { LayautModule } from '../layouts/layouts.module';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AdministradoresComponent,
    ContactoComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    NosotrosComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LayautModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AdministradoresComponent,
    ContactoComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    NosotrosComponent
  ],
})
export class PagesModule { }