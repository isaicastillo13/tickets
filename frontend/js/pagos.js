(() => {
    const App = {
        htmlElements: {
            infoBoleto: document.querySelector('.pago__info'),
            botonPagar: document.querySelector('#pagar__btn'),
            // datosTarjeta: document.getElementsByName('infoTarjeta')
        },
        init() {
            App.bindEvents();
        },
        bindEvents() {
            document.addEventListener('DOMContentLoaded', App.handlers.cargarDatos);
            // App.htmlElements.botonPagar.addEventListener('click', App.handlers.pagarBoleto);
        },
        handlers: {
            cargarDatos() {
                let datosBoletos = JSON.parse(localStorage.getItem('boletoReventa'));
                App.methods.render(datosBoletos)
                console.log("desde func cargarDatos() -> ", datosBoletos);
                App.methods.guadarEntrada();
            },
            pagarBoleto(e) {
                App.methods.pagarBoleto(e);
            }
        },
        methods: {
            render(datosBoletos) {
                App.htmlElements.infoBoleto.innerHTML = `
                <h2>INFORMACION DE TU BOLETO</h2>
                <p>Evento: ${datosBoletos.evento}</p>
                <p>Ubicacion: ${datosBoletos.ubicacion}</p>
                <p>Fecha: ${datosBoletos.fecha}</p>
                <p>Precio: ${datosBoletos.precio}</p>
                `
            },
            pagarBoleto(e) {
                e.preventDefault();
                // for (let i = 0; i < App.htmlElements.datosTarjeta.length; i++) {
                //     if (App.htmlElements.datosTarjeta[i].value === '') {
                //         alert('Por favor llena todos los campos');
                //         return;
                //     }
                // }
                // App.methods.guadarEntrada();
                // alert('Boleto pagado con exito');
                // localStorage.removeItem('boletoReventa');
                // window.location.href = '/frontend/public/index.html';
            },
            async guadarEntrada() {
                let datosBoletos = JSON.parse(localStorage.getItem('boletoReventa'));
                let userId = localStorage.getItem('userId');

                // Iniciar el proceso de pago con PayPal
                console.log("async guadarEntrada() "),
                    paypal.Buttons({
                        createOrder: function (data, actions) {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: datosBoletos.precio
                                    },
                                    description: `Boleto para ${datosBoletos.evento}`
                                }]
                            });
                        },
                        onApprove: function (data, actions) {
                            return actions.order.capture().then(function (details) {
                                // Aquí puedes llamar a tu API para guardar la entrada
                                App.methods.guardarEntradaEnAPI(datosBoletos, userId, details.id);
                            });
                        }
                    }).render('#paypal-button-container');
            },

            async guardarEntradaEnAPI(datosBoletos, userId, paypalOrderId) {
                const datosEntrada = {
                    EventoID: datosBoletos.eventoId,
                    UsuarioID: parseInt(userId),
                    Precio: datosBoletos.precio,
                    Cantidad: datosBoletos.cantidad || 1,
                    PayPalOrderId: paypalOrderId
                };

                try {
                    const response = await fetch('http://localhost:3000/entradas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(datosEntrada)
                    });

                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.message || 'Error al guardar la entrada');
                    }

                    alert('Boleto pagado con éxito');

                } catch (error) {
                    console.error('Error al guardar la entrada:', error);
                    alert('Error al guardar la entrada: ' + error.message);
                }
            }
        }
    }
    App.init();
})();
