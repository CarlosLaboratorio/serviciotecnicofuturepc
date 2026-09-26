        const estrellas = document.querySelectorAll('.estrella');

        const campoEstrellas = document.getElementById(
            'id_estrellas'
        );

        const textoEstrellas = document.getElementById(
            'texto-estrellas'
        );


        const textos = [
            '',
            'Muy mala',
            'Mala',
            'Regular',
            'Buena',
            'Excelente'
        ];


        estrellas.forEach(function(estrella) {

            estrella.addEventListener('click', function() {

                const valor = this.dataset.value;

                // Guardamos el valor en el campo de Django
                campoEstrellas.value = valor;

                // Iluminamos las estrellas seleccionadas

                estrellas.forEach(function(item) {

                    if (item.dataset.value <= valor) {

                        item.classList.remove('bi-star');

                        item.classList.add(
                            'bi-star-fill',
                            'seleccionada'
                        );

                    } else {

                        item.classList.remove(
                            'bi-star-fill',
                            'seleccionada'
                        );

                        item.classList.add('bi-star');

                    }

                });

                textoEstrellas.textContent =
                    textos[valor];

            });

        });


        // document.querySelector('form').addEventListener('submit', function(e) {
        //     // Si estás usando la corrección de los atributos 'name' que te di antes:
        //     e.preventDefault(); // Evita que la página se recargue por defecto

        //     const formData = new FormData(this);

        //     fetch(this.action, {
        //         method: 'POST',
        //         body: formData,
        //         headers: {
        //             'Accept': 'application/json'
        //         }
        //     })
        //     .then(response => {
        //         if (response.ok) {
        //             alert('¡Mensaje enviado con éxito!');
        //             this.reset(); // Limpia el formulario
        //         } else {
        //             alert('Hubo un error al enviar el formulario.');
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //         alert('No se pudo conectar con el servidor de correos.');
        //     });
        // });
