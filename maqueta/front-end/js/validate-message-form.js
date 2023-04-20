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
                title: 'Hemos recibido tu mensaje',
                text: 'Te responderemos a la brevedad.',
                showConfirmButton: true,
            }).then((result) => {
                if (result.value) {
                  let reset = document.getElementById('form-message').reset();
                  let removeClass = document.getElementById('form-message').classList.remove('was-validated');
                  return reset && removeClass;
                  ;
                }
              })
                
        }
      }, false)
    })
  })()
  