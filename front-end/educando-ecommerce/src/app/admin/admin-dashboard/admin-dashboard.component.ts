import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {
  userName: string = 'Usuario';
  userSurname: string = 'Prueba';
  userRole: number = 3;
  showProfileMenu: boolean = false;
  purchasedCoursesCount: number = 0;
  completedCoursesCount: number = 0;
  certificationsCount: number = 0;
  lastCourseTitle: string = 'Curso de Angular Avanzado';
  lastCourseDescription: string = 'Aprende a construir aplicaciones avanzadas con Angular';
  lastCourseImage: string | any;
  courses: any[] = [];
  currentUser: Usuario | null = null;

  constructor(
    private autenticacionService: AuthService
  ) {}

  ngOnInit() {
    this.autenticacionService.getCambioEstadoAutenticacion().subscribe(autenticado => {
      if (autenticado) {
        // console.log(this.currentUser)
        this.currentUser = this.autenticacionService.getCurrentUser();
        this.userName = this.currentUser?.nombre || '';
        this.userSurname = this.currentUser?.apellido || '';
        this.userRole = this.currentUser?.id_rol_id || 1;
      } else {
        // console.log(this.currentUser)
        this.currentUser = null;
        this.userName = 'John Doe';
        this.userRole = 1;
      }
    });

    this.currentUser = this.autenticacionService.getCurrentUser();
    this.userName = this.currentUser?.nombre || '';
    this.userSurname = this.currentUser?.apellido || '';
    this.userRole = this.currentUser?.id_rol_id || 1;
    this.obtenerCursosUsuario();
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  obtenerCursosUsuario() {
    this.autenticacionService.obtenerCursosUsuario().subscribe(
      (response) => {
        // Actualiza los datos de los cursos del usuario
        this.courses = response;
        // console.log(this.courses)
        this.purchasedCoursesCount = this.courses.length;
        this.completedCoursesCount = this.courses.filter((course) => course.progress === 100).length;
        this.certificationsCount = this.completedCoursesCount;
        if (this.courses.length > 0) {
          const lastCourse = this.courses[this.courses.length - 1];
          // console.log(lastCourse)
          this.lastCourseTitle = lastCourse.nombre_curso;
          this.lastCourseDescription = lastCourse.descripcion_curso;
          this.lastCourseImage = lastCourse.imagen_url;
        }
      },
      (error) => {
        console.error('Error al obtener los cursos del usuario:', error);
      }
    );
  }

}
