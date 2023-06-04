import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Agrega los getters para acceder a los campos del formulario más fácilmente
  get nombre() {
    return this.registroForm.get('nombre');
  }

  get apellido() {
    return this.registroForm.get('apellido');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get password() {
    return this.registroForm.get('password');
  }

  get passwordConfirmation() {
    return this.registroForm.get('passwordConfirmation');
  }

  // Validador personalizado para comparar las contraseñas
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('passwordConfirmation')?.value;
    if (password !== passwordConfirmation) {
      control.get('passwordConfirmation')?.setErrors({ validateEqual: true });
    } else {
      control.get('passwordConfirmation')?.setErrors(null);
    }
    return null;
  }

  // Lógica para enviar el formulario
  onSubmit() {
    if (this.registroForm.valid) {
      // Realizar acciones adicionales, como enviar los datos al servidor
      console.log(this.registroForm.value);
    }
  }
}


























/* export class RegistroComponent {
  public user = {
    username : '',
    email : '',
    password : ''
  }


formSubmit(addForm: NgForm){
  console.log(addForm.value)
  this.user = addForm.value;
  console.log(this.user);
  if(this.user?.username == '' || this.user?.username == null){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'El nombre y apellido es requerido',
      showConfirmButton: false,
      timer: 1200
    })
    return;
  } else if(this.user.email == '' || this.user.email == null){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'El correo electrónico es requerido',
      showConfirmButton: false,
      timer: 1200
    })
    return;
  } else if(this.user.password == '' || this.user.password == null){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'La contraseña es requerida',
      showConfirmButton: false,
      timer: 1200
    })
    return;
  }
}
}  */