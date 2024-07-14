
(() => {
    const App = {
        htmlElements: {
            userName: document.querySelectorAll('#li_UserName , #userName__perfil'),
            p_boletos: document.querySelector('#error_boletos'),
            editProfileLink: document.querySelector('#link_edit'),
            inputName: document.querySelector('#perfil__name')
        },
        init() {

            App.bindEvents();
            App.methods.userDataName();
            App.methods.GetUserData();
        },
        bindEvents() {

            // Escuchar el clic en el enlace "editProfileLink"
            // const userNameLink = document.getElementById('link_UserName');
            App.htmlElements.editProfileLink.addEventListener('click', App.handlers.handle_editProfileClick);
            // App.htmlElements.formularioDeLogin.addEventListener('submit', App.handlers.catchDatos)
        },
        handlers: {
            handle_editProfileClick(e) {
                // e.preventDefault(); // Prevenir la acción predeterminada
                App.methods.EditProfile(); // Llamar al método para cargar datos del usuario
            },
        },
        methods: {
            async userDataName() {
                const userName = localStorage.getItem('userName');
                // console.log("Nombre de usuario recuperado: " + userName);
                if (userName) {
                    // App.htmlElements.userName.textContent = userName;
                    App.htmlElements.userName.forEach(element => {
                        element.textContent = userName;
                    });
                }
            },

            async GetUserData() {
                try {
                    // console.log("GetUserData ejecutado TRY");
                    const id = localStorage.getItem('userId');
                    // console.log("ID de usuario:", id); // Verifica que el ID sea correcto
                    const response = await fetch(`http://localhost:3000/eventos/entradas/usuario/${id}`);
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(errorData.message || 'Error en la respuesta de la API');
                    }
                    if (data.message) {
                        App.htmlElements.p_boletos.textContent = data.message; // Mostrar el mensaje en el elemento correspondiente
                    }
                    console.log("Datos del usuario y eventos:", data);

                } catch (error) {
                    console.log("GetUserData ERROR -> :" + error);

                }
            },

            async EditProfile() {
                try {
                    // console.log("EditProfile ejecutado TRY");
                    const userName = localStorage.getItem('userName');
                    // console.log("userName-> " + userName);
                    App.htmlElements.inputName.value = userName;
                } catch (error) {
                    console.log("EditProfile ERROR -> :" + error);
                }
            }
        }
    };
    App.init();
})();