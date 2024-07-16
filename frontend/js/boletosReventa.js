(() => {
    const App = {
        htmlElements: {
            paginaCargada: document,
            boletosReventa: document.querySelector('.ticketResale'),
        },
        init() {
            App.bindEvents();
        },
        bindEvents() {
            document.addEventListener("DOMContentLoaded", App.handlers.paginaCargada);
        },
        handlers: {
            paginaCargada(e) {
                e.preventDefault();
                App.methods.cargarBoletosReventa();
            }
        },
        methods: {
            async cargarBoletosReventa() {
                try {
                    const response = await fetch('http://localhost:3000/boletosReventa');
                    const boletosReventa = await response.json();
                    if (!response.ok) {
                        throw new Error('Error al obtener boletos de reventa');
                    }
                    App.methods.render(boletosReventa);
                } catch (error) {
                    console.error("Error en cargarBoletosReventa:", error);
                }
            },
            guardarDatosBoleto() {
                try {
                    const boletoReventa = {
                        evento: document.querySelector('.data__title').textContent,
                        descripcion: document.querySelector('.data__description').textContent,
                        ubicacion: document.querySelector('.card__location p').textContent,
                        fecha: document.querySelector('.card__date p').textContent,
                        precio: document.querySelector('.price').textContent
                    };
                    localStorage.setItem('boletoReventa', JSON.stringify(boletoReventa));
                } catch (error) {
                    console.error("Error en guardarDatosBoleto:", error);
                }
            },
            render(boletosReventa) {
                const contenedorBoletos = App.htmlElements.boletosReventa;
                contenedorBoletos.innerHTML = ''; // Limpiar contenedor antes de renderizar nuevos boletos
                boletosReventa.forEach(boleto => {
                    const boletoHTML = `
                    <div class="event contenedor">
                        <img class="event__img" src="../../../public/images/noiseporn-JNuKyKXLh8U-unsplash.jpg"
                            alt="imagen del evento">
                        <div class="event__data">
                            <h2 class="data__title">${boleto.evento}</h2>
                            <p class="data__description">${boleto.descripcion}</p>
                            <div class="card__location">
                                <p>${boleto.ubicacion}</p>
                                <img src="../../../public/iconos/ubicacion_icono.png" alt="icono de ubicacion">
                            </div>
                            <div class="card__date">
                                <p>${boleto.fecha}</p>
                                <img src="../../../public/iconos/fecha__icono.png" alt="icono de calendario">
                            </div>
                            <p class="price">$ ${boleto.precio}</p>
                            <a href="/frontend/source/views/boletos/pagos.html" class="btn btn-principal" id="btn__resale">Comprar</a>
                        </div>
                    </div>
                    `;
                    contenedorBoletos.insertAdjacentHTML('beforeend', boletoHTML);
                });
                App.methods.addEventListeners();
            },
            addEventListeners() {
                const botonesComprar = document.querySelectorAll('#btn__resale');
                botonesComprar.forEach(boton => {
                    boton.addEventListener('click', App.methods.guardarDatosBoleto);
                });
            }
        }
    };
    App.init();
})();
