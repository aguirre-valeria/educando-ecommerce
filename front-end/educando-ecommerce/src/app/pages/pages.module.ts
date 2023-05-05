import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { NosotrosComponent } from './nosotros/nosotros.component';



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
    CommonModule
  ]
})
export class PagesModule { }
