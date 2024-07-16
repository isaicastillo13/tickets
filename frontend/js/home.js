
(() => {
    const App = {
        htmlElements: {
            userName: document.querySelector('.navbar--derecha .userName'),
            eventsMain: document.querySelector('#events__main'),
            iconLogout: document.querySelector('#logout'),
            pagina:document
        },
        init() {

            App.bindEvents();
            App.methods.userData();
            App.methods.fetchEvents();
        },
        bindEvents() {
            App.htmlElements.iconLogout.addEventListener('click', App.handlers.closeSession);
            App.htmlElements.pagina.addEventListener('DOMContentLoaded', App.handlers.pageReady);
        },
        handlers: {

            pageReady(e) {
                e.preventDefault(); // Prevenir la acción predeterminada
                App.methods.userData(); // Llamar al método para cargar datos del usuario
            },
            closeSession(){
                App.methods.closeSession();
            }

        },
        methods: {
            userData() {
                const userName = localStorage.getItem('userName');  
                console.log(localStorage.getItem('userName'))
                if (userName != null) {
                    App.htmlElements.userName.style.display = 'block';
                    App.htmlElements.iconLogout.style.display = 'block';
                    App.htmlElements.userName.textContent = userName;
                    App.htmlElements.userName.innerHTML = `<a id="link_UserName" href="/frontend/source/views/usuario/perfil.html">${userName}</a>`;
                }else{
                    console.log('no hay usuario')
                    App.htmlElements.userName.style.display = 'block';
                    App.htmlElements.userName.innerHTML = `<a id="link_UserName" href="/frontend/source/views/auth/login.html">Iniciar Sesion</a>`;
                    App.htmlElements.iconLogout.style.display = 'none';
                }
            },
            closeSession(){
                localStorage.removeItem('userName');
                window.location.href = 'http://localhost:3000/index.html';
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