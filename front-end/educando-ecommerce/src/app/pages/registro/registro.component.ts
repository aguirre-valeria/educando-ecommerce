import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacionService: AuthService,
    private router: Router
  ) {

    // Inicialización del formulario de registro con validaciones
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]+$')
        ]
      ],
      passwordConfirmation: ['', Validators.required],
      id_rol_id: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Getter para acceder fácilmente a los controles del formulario
  get control() {
    return this.registroForm.controls;
  }

  // Validador personalizado para verificar si las contraseñas coinciden
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('passwordConfirmation')?.value;
    return password === passwordConfirmation ? null : { validateEqual: true };
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.registroForm.invalid) {
      return;
    }

    // Obtener los datos del formulario
    const formData = { ...this.registroForm.value };
    console.log(formData)
    delete formData.passwordConfirmation; // Eliminar el campo de confirmación de contraseña antes de enviar los datos

    // Llamar al servicio de autenticación para registrar al usuario
    this.autenticacionService.registrarUsuario(formData).subscribe(
      (response) => {
        console.log('Registro exitoso');
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
            text: '¡Ya puedes iniciar sesión!',
          });
        // localStorage.setItem('accessToken', response.token);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en el registro:', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error en el registro!',
          text: error.error.mensaje,
        })
      }
    );
  }
}
