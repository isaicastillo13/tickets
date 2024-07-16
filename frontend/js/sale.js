
(() => {
    const App = {
        htmlElements: {
            botonPagar: document.querySelector('#btn__resale'),
        },
        init() {
            App.bindEvents();
        },
        bindEvents() {
        },
        handlers: {

            handleUserNameClick(e) {
                e.preventDefault(); // Prevenir la acción predeterminada
                App.methods.userData(); // Llamar al método para cargar datos del usuario
            },

        },
        methods: {
            userData() {
            }


        }
    };
    App.init();
})();