import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { AppRoutingModule } from '../app-routing.module';
import { LayautModule } from '../layouts/layouts.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    ContactoComponent,
    DashboardComponent,
    LoginComponent,
    RegistroComponent,
    NosotrosComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LayautModule,
    ReactiveFormsModule
  ],
  exports: [
    AdminComponent,
    ContactoComponent,
    DashboardComponent,
    LoginComponent,
    RegistroComponent,
    NosotrosComponent
  ],
})
export class PagesModule { }
