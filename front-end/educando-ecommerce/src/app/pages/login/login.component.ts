import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  email: string = '';
  password: string = '';

  constructor(private autenticacionService: AuthService, private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]+$')
      ]),
    });

    this.myForm.valueChanges.subscribe(() => {
      this.validateFields();
    });
  }

  validateFields() {
    for (const fieldName in this.myForm.controls) {
      const field = this.myForm.get(fieldName);
      if (field) {
        field.markAsTouched();
      }
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.myForm.get(fieldName);
    return field?.invalid ?? false;
  }

  getFieldError(fieldName: string, errorType: string): boolean {
    const field = this.myForm.get(fieldName);
    return field?.hasError(errorType) ?? false;
  }

  enviarFormulario() {
    if (this.myForm.valid) {
      const email = this.myForm.get('email')?.value;
      const password = this.myForm.get('password')?.value;
      console.log(email, password)
      this.autenticacionService.iniciarSesion(email, password).subscribe(
        () => {
          console.log('Inicio de sesión exitoso');
          this.autenticacionService.isAdminLoggedIn = true; // Establecer el estado de inicio de sesión del administrador en true
          this.router.navigate(['/admin']);
          // Realiza las acciones necesarias después del inicio de sesión exitoso, como redireccionar a otra página
        },
        error => {
          console.log('Error en el inicio de sesión:', error);
          // Realiza las acciones necesarias en caso de error, como mostrar un mensaje de error al usuario
        }
      );
    } else {
      this.myForm.markAllAsTouched();
    }
  }
}
