(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }        
        form.classList.add('was-validated')

        // Alerta si se completa el formulario
        if(form.checkValidity()) {
            event.preventDefault()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Has iniciado sesión',
                text: 'Próximamente ingresarás a tu Dashboard',
                showConfirmButton: true,
            }).then((result) => {
                if (result.value) {
                  let reset = document.getElementById('form-login').reset();
                  let removeClass = document.getElementById('form-login').classList.remove('was-validated');
                  return reset && removeClass;
                }
              })
        }
      }, false)
    })
  })()