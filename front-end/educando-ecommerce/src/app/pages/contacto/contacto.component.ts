import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl,FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})

export class ContactoComponent {
  contactoForm: FormGroup;

  constructor() {
    this.contactoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mensaje: new FormControl('', Validators.required)
    });
  }

  // Lógica para enviar el formulario
  onSubmit() {
    if (this.contactoForm.valid) {
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Gracias por contactarnos.',
      }).then(() => {
        // Limpiar el formulario después de mostrar la alerta
        this.contactoForm.reset();
      });
    } else {
      // Mostrar una alerta de error si el formulario no es válido
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa correctamente todos los campos del formulario.',
      });
    }
  }
}
