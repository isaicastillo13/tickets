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
            pagarBoleto(e){
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
            pagarBoleto(e){
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
            async guadarEntrada(){

                console.log('Guardando entrada');
                let datosBoletos = JSON.parse(localStorage.getItem('boletoReventa'));
                let userId = localStorage.getItem('userId');
                try {
                    const datosEntrada = {
                        eventoId: datosBoletos.eventoId,
                        userId: parseInt(userId),
                        precio: datosBoletos.precio
                    };
                    console.log(datosEntrada);
                    const rowResponse = await fetch('http://localhost:3000/entradas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(datosEntrada)
                    });
                    const data = rowResponse.json();
                    console.log(data);
                }catch (error) {
                    console.error('Error al guardar la entrada:', error);
                }
            }
        }
    }
    App.init();
})();
