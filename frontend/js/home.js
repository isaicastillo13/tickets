
(() => {
    const App = {
        htmlElements: {
            userNamelink: document.querySelector('#link_UserName'),
            eventsMain: document.getElementById('events__main'),
        },
        init() {

            App.bindEvents();
            App.methods.userData();
            App.methods.fetchEvents();
        },
        bindEvents() {

            // Escuchar el clic en el enlace "UserName"
            const userNameLink = document.getElementById('link_UserName');
            // userNameLink.addEventListener('click', App.handlers.handleUserNameClick);
            // App.htmlElements.formularioDeLogin.addEventListener('submit', App.handlers.catchDatos)
        },
        handlers: {

            handleUserNameClick(e) {
                e.preventDefault(); // Prevenir la acción predeterminada
                App.methods.userData(); // Llamar al método para cargar datos del usuario
            },

        },
        methods: {
            async userData() {

                const userName = localStorage.getItem('userName');
                // console.log("Nombre de usuario recuperado: " + userName);
                if (userName) {
                    App.htmlElements.userNamelink.textContent = userName;
                }
            },

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
                                <img src="icons/fecha__icono.png" alt="icono de calendario">
                            </div>
                        </div>
                        <div class="card__location">
                            <p>${evento.Ubicacion}</p>
                            <img src="icons/ubicacion_icono.png" alt="icono de ubicacion">
                        </div>
                        <p class="card__precio">$ ${evento.Precio}</p>
                        <a href="../source/views/events/event.html" class="btn btn-principal card__btn">Ver Mas...</a>
                    `;

                    App.htmlElements.eventsMain.appendChild(eventCard);
                });
            },

        }
    };
    App.init();
})();