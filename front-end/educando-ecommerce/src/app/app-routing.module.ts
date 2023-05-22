import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CursosComponent } from './ecommerce/cursos/cursos.component';
import { CheckoutComponent } from './ecommerce/checkout/checkout.component';
import { DetailsComponent } from './ecommerce/details/details.component';

const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    { path: 'inicio', component: DashboardComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'cursos', component: CursosComponent, },
    { path: 'cursos/checkout', component: CheckoutComponent },
      { path: 'cursos/details/:category/:id', component: DetailsComponent },

];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule { }