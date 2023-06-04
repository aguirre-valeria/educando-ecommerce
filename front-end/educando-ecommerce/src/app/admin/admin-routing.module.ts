import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
// import { AuthGuard } from '../guard/auth.guard';
//import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [

      { path: 'mis-cursos', component: MisCursosComponent },
    ]
  }
  /* {
    path: 'admin',
    component: AdminDashboardComponent,
    // canActivate: [AuthGuard],
    children: [

      { path: 'mis-cursos', component: MisCursosComponent },
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      //{ path: 'favorites', component: FavoritesComponent }
      // Agrega las rutas para otros componentes de administración
    ]
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
