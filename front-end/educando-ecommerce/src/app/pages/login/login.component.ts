import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  email: string = '';
  password: string = '';

  constructor(
    private autenticacionService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Inicialización del formulario de inicio de sesión con validaciones
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]+$')
      ]),
    });

    // Suscripción a los cambios en el formulario para validar los campos en tiempo real
    this.myForm.valueChanges.subscribe(() => {
      this.validateFields();
    });
  }

  // Marcar todos los campos del formulario como "touched" (tocados) para mostrar los errores de validación
  validateFields() {
    for (const fieldName in this.myForm.controls) {
      const field = this.myForm.get(fieldName);
      if (field) {
        field.markAsTouched();
      }
    }
  }

  // Verificar si un campo es inválido
  isFieldInvalid(fieldName: string): boolean {
    const field = this.myForm.get(fieldName);
    return field?.invalid ?? false;
  }

  // Verificar si un campo tiene un error de validación específico
  getFieldError(fieldName: string, errorType: string): boolean {
    const field = this.myForm.get(fieldName);
    return field?.hasError(errorType) ?? false;
  }

  // Enviar el formulario de inicio de sesión
  enviarFormulario() {
    if (this.myForm.valid) {
      // Obtener los valores de email y password del formulario
      const email = this.myForm.get('email')?.value;
      const password = this.myForm.get('password')?.value;

      // Llamar al servicio de autenticación para iniciar sesión
      this.autenticacionService.iniciarSesion(email, password).subscribe(
        () => {
          console.log('Inicio de sesión exitoso');
          this.autenticacionService.isAdminLoggedIn = true;
          this.router.navigate(['/admin']);
        },
        error => {
          console.log('Error en el inicio de sesión:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error en el inicio de sesión',
            text: error.error.mensaje,
          });
        }
      );
    } else {
      this.myForm.markAllAsTouched(); // Marcar todos los campos del formulario como "touched" (tocados) para mostrar los errores de validación
    }
  }
}
