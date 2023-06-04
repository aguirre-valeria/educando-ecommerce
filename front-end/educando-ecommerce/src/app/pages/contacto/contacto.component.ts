import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl,FormBuilder } from '@angular/forms';

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
      email: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required)
    });
  }

  // Lógica para enviar el formulario
  onSubmit() {
    if (this.contactoForm.valid) {
      // Realizar acciones adicionales, como enviar los datos al servidor
      console.log(this.contactoForm.value);
    }
  }
}