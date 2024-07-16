(() => {
    const App = {
        htmlElements: {
            eventImage: document.querySelector('.event__img'),
            eventTitle: document.querySelector('.data__title'),
            eventDescription: document.querySelector('.data__description'),
            eventLocation: document.querySelector('.card__location p'),
            eventDate: document.querySelector('.card__date p'),
            eventPrice: document.querySelector('.price'),
            botonComprar: document.querySelector('#btn__comprar')
        },
        init() {
            App.methods.getEventData();
        },
        bindEvents() {
            App.htmlElements.botonComprar.addEventListener('click', App.heandlers.guardarDatosBoleto);
        },
        methods: {
            async getEventData() {
                const urlParams = new URLSearchParams(window.location.search);
                const eventoId = urlParams.get('eventoId');

                console.log("ID evento:", eventoId); // Para verificar que se obtiene el ID

                if (!eventoId) {
                    console.error("No se encontró el eventoId en la URL");
                    return; // Salir si no se encuentra el eventoId
                }

                try {
                    const response = await fetch(`http://localhost:3000/eventos/${eventoId}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener evento');
                    }
                    const evento = await response.json();
                    console.log(evento); // Para verificar que se obtiene el evento
                    App.methods.renderEvent(evento); // Renderiza el evento
                } catch (error) {
                    console.error("Error en getEventData:", error);
                }
            },


            renderEvent(evento) {
                App.htmlElements.eventImage.src = evento.imagen || "../../../public/images/noiseporn-JNuKyKXLh8U-unsplash.jpg";
                App.htmlElements.eventTitle.textContent = evento.Titulo;
                App.htmlElements.eventDescription.innerHTML = evento.Descripcion.replace(/\n/g, '<br>');
                App.htmlElements.eventLocation.textContent = evento.Ubicacion;
                App.htmlElements.eventDate.textContent = new Date(evento.FechaEvento).toLocaleDateString('es-ES');
                App.htmlElements.eventPrice.textContent = `$ ${evento.Precio}`;
                App.methods.guardarDatosBoleto(evento);
            },
            guardarDatosBoleto(evento) {
                try {
                    const boletoReventa = {
                        evento: evento.Titulo,
                        descripcion: evento.Descripcion,
                        ubicacion: evento.Ubicacion,
                        fecha: evento.FechaEvento,
                        precio: evento.Precio,
                        eventoId: evento.EventoID
                    };
                    
                    localStorage.setItem('boletoReventa', JSON.stringify(boletoReventa));
                } catch (error) {
                    console.error("Error en guardarDatosBoleto:", error);
                }
                
            }
        }
    };
    App.init();
})();
