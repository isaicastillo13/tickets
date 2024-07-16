
(() => {
    const App = {
        htmlElements: {
            userName: document.querySelector('.navbar--derecha .userName'),
            eventsMain: document.querySelector('#events__main'),
            pagina:document
        },
        init() {

            App.bindEvents();
            App.methods.fetchEvents();
        },
        bindEvents() {
            App.htmlElements.pagina.addEventListener('DOMContentLoaded', App.handlers.pageReady);
        },
        handlers: {

            pageReady(e) {
                e.preventDefault(); // Prevenir la acción predeterminada
            },
            closeSession(){
                App.methods.closeSession();
            }

        },
        methods: {
            async fetchEvents() {
                try {
                    const response = await fetch('http://localhost:3000/eventos');
                    const eventos = await response.json();
                    if (!response.ok) {
                        throw new Error('Error al obtener eventos');
                    }
                    this.renderEvents(eventos);
                } catch (error) {
                    console.error("Error en fetchEvents:", error);
                }
            },

            renderEvents(eventos) {
                eventos.forEach(evento => {
                    const eventCard = document.createElement('div');
                    eventCard.classList.add('card');

                    eventCard.innerHTML = `
                        <img src="images/noiseporn-JNuKyKXLh8U-unsplash.jpg" alt="imagen del evento" class="card__image">
                        <div class="card__header">
                            <h4 class="card__title">${evento.Titulo}</h4>
                            <div class="card__date">
                                <p>${new Date(evento.FechaEvento).toLocaleDateString('es-ES')}</p>
                                <img src="iconos/fecha__icono.png" alt="icono de calendario">
                            </div>
                        </div>
                        <div class="card__location">
                            <p>${evento.Ubicacion}</p>
                            <img src="iconos/ubicacion_icono.png" alt="icono de ubicacion">
                        </div>
                        <a href="../source/views/eventos/eventos.html?eventoId=${evento.EventoID}" class="btn btn-principal card__btn">Ver Evento</a>

                    `;

                    App.htmlElements.eventsMain.appendChild(eventCard);
                });
            },
            renderNavbar(){

            }

        }
    };
    App.init();
})();