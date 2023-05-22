import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
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
}