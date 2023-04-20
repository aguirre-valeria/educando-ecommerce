// VARIABLES DE LOS ELEMENTOS
let nombre = document.querySelector("#name");
let email = document.querySelector("#email");
let contrasena = document.querySelector("#password");
let btnRegistrar = document.querySelector("#btnRegister");

// CAPTURAR EL EVENTO
btnRegistrar.addEventListener("click", registrar);
// CAPTURAR EVENTO DE FORM
const forms = document.querySelectorAll('.needs-validation')

// FUNCIÓN EVENTO REGISTRAR
function registrar(event) {
  event.preventDefault();
  event.stopPropagation();
  // SI LA VALIDACIÓN FUE OK, ALERT DE REGISTRO EXITOSO
  if (validateInputs() === true ) {
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Ahora ya puedes iniciar sesión.',
    }).then((result) => {
        if(result.value) {
            let reset = document.getElementById('form-register').reset();
            return reset;
        }
    })
  } 
  
}

// VALIDACIÓN DE LOS DATOS INGRESADOS POR EL USUARIO
function validateInputs() {
  let inputNombre = nombre.value;
  let inputEmail = email.value;
  let inputContrasena = contrasena.value;
  if( inputNombre == null || inputNombre.length == 0 || /^\s+$/.test(inputNombre) ) { 
    Swal.fire({
      position: 'top-right',
      icon: 'info',
      title: 'Completa el formulario con tu nombre y apellido',
      showConfirmButton: false,
      timer: 1300
    })
  } else if ( !(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(inputEmail)) ) {
    Swal.fire({
      position: 'top-right',
      icon: 'info',
      title: 'Completa el formulario con un email válido',
      showConfirmButton: false,
      timer: 1300
    })
  } else if ( inputContrasena == null || inputContrasena.length == 0 || !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/.test(inputContrasena)) ) {
    Swal.fire({
      position: 'top-right',
      icon: 'info',
      title: 'Ingresa una contraseña que:',
      html: '<li>Tenga al menos una letra minúscula</li><li>Tenga al menos un número</li><li>Tenga al menos una letra amyúscula</li><li>Tenga un mínimo de 8 caracteres</li>',
    })
  } else {
    return true;
  }
}


