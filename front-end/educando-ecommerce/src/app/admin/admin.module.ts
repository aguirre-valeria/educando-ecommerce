import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    MisCursosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    AdminDashboardComponent,
    MisCursosComponent
  ]
})
export class AdminModule { }
