(() => {
    const App = {
        htmlElements: {
            infoBoleto: document.querySelector('.pago__info'),
            botonPagar: document.querySelector('#pagar__btn'),
            datosTarjeta: document.getElementsByName('infoTarjeta')
        },
        init() {
            App.bindEvents();
        },
        bindEvents() {
            document.addEventListener('DOMContentLoaded', App.handlers.cargarDatos);
            App.htmlElements.botonPagar.addEventListener('click', App.handlers.pagarBoleto);
        },
        handlers: {
            cargarDatos() {
                let datosBoletos = JSON.parse(localStorage.getItem('boletoReventa'));
                App.methods.render(datosBoletos)
                console.log(datosBoletos);
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
                for (let i = 0; i < App.htmlElements.datosTarjeta.length; i++) {
                    if (App.htmlElements.datosTarjeta[i].value === '') {
                        alert('Por favor llena todos los campos');
                        return;
                    }
                }
                App.methods.guadarEntrada();
                // alert('Boleto pagado con exito');
                // localStorage.removeItem('boletoReventa');
                // window.location.href = '/frontend/public/index.html';
            },
            async guadarEntrada() {

                console.log('Guardando entrada');
                let datosBoletos = JSON.parse(localStorage.getItem('boletoReventa'));
                let userId = localStorage.getItem('userId');
                const datosEntrada = {
                    EventoID: datosBoletos.eventoId,
                    UsuarioID: parseInt(userId),
                    Precio: datosBoletos.precio,
                    Cantidad: datosBoletos.cantidad || 1
                };
                console.log("Datos antes de enviar a API ->", JSON.stringify(datosEntrada, null, 2));
                try {
                    // const datosEntrada = {
                    //     eventoId: datosBoletos.eventoId,
                    //     UsuarioId: parseInt(userId),
                    //     precio: datosBoletos.precio
                    // };
                    const response = await fetch('http://localhost:3000/entradas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(datosEntrada)
                    });
                    // const data = response.json();
                    // console.log(data);
                    //*************************
                    const data = await response.json();
                    console.log("datos respuesta de api -> " + data);
                    if (!response.ok) {
                        const errorData = await response.text();
                        console.error('Error de login:', errorText);
                        return
                    }
                    console.log("Datos respuesta de API ->", data);
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
