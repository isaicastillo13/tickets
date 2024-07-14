
(() => {
    const App = {
        htmlElements: {
            userNamelink: document.querySelector('#link_UserName'),
        },
        init() {

            App.bindEvents();
            App.methods.userData();
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
            }


        }
    };
    App.init();
})();