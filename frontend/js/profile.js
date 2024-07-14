
(() => {
    const App = {
        htmlElements: {
            userName: document.querySelectorAll('#li_UserName , #userName__perfil'),

            // ********** MIS BOLETOS **********
            p_boletos: document.querySelector('#error_boletos'),
            btn_boletos: document.querySelector('#btn_verBoletos'),

            // ********** EDITAR PERFIL **********
            editProfileLink: document.querySelector('#link_edit'),
            inputName: document.querySelector('#perfil__name'),

            // ********** CREAR EVENTOS **********
            form_Crear: document.querySelector('#form_add_Event'),
            inputTitulo: document.querySelector('#input_evento'),
            inputFecha: document.querySelector('#input_fecha'),
            inputUbicacion: document.querySelector('#input_ubicacion'),
            inputDescripcion: document.querySelector('#input_descripcion'),
            inputPrecio: document.querySelector('#input_precio'),

        },
        init() {

            App.bindEvents();
            App.methods.userDataName();
            // App.methods.GetTicketUserData();
        },
        bindEvents() {

            App.htmlElements.form_Crear.addEventListener('submit', App.handlers.catchDatos)
            App.htmlElements.btn_boletos.addEventListener('click', App.handlers.handler_btnBoletosClick)
            // Escuchar el clic en el enlace "editProfileLink"
            // const userNameLink = document.getElementById('link_UserName');
            App.htmlElements.editProfileLink.addEventListener('click', App.handlers.handle_editProfileClick);
        },
        handlers: {

            handler_btnBoletosClick(e) {
                App.methods.redirctMyTickets();
            },

            catchDatos(e) {
                e.preventDefault()
                let Titulo = App.htmlElements.inputTitulo.value
                let Descripcion = App.htmlElements.inputDescripcion.value
                let FechaEvento = App.htmlElements.inputFecha.value
                let Ubicacion = App.htmlElements.inputUbicacion.value
                let Precio = App.htmlElements.inputPrecio.value
                let UsuarioID = localStorage.getItem('userId');

                App.methods.PostCreateEvent(Titulo, Descripcion, FechaEvento, Ubicacion, Precio, UsuarioID);
            },

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

            // ********** MIS BOLETOS **********
            async redirctMyTickets() {
                console.log("click en ir a mis boletos");
                window.location.href = `../../../source/views/tickets/myTickets.html`; // redirecciona al index 
            },

            // async GetTicketUserData() {
            //     try {
            //         // console.log("GetUserData ejecutado TRY");
            //         const id = localStorage.getItem('userId');
            //         // console.log("ID de usuario:", id); // Verifica que el ID sea correcto
            //         const response = await fetch(`http://localhost:3000/eventos/entradas/usuario/${id}`);
            //         const data = await response.json();
            //         if (!response.ok) {
            //             throw new Error(errorData.message || 'Error en la respuesta de la API');
            //         }
            //         if (data.message) {
            //             App.htmlElements.p_boletos.textContent = data.message; // Mostrar el mensaje en el elemento correspondiente
            //         }
            //         console.log("Datos del usuario y eventos:", data);

            //     } catch (error) {
            //         console.log("GetTicketUserData ERROR -> :" + error);

            //     }
            // },

            // ********** CREAR EVENTOS **********
            async PostCreateEvent(Titulo, Descripcion, FechaEvento, Ubicacion, Precio, UsuarioID) {
                const payload = {
                    Titulo: Titulo,
                    Descripcion: Descripcion,
                    FechaEvento: FechaEvento,
                    Ubicacion: Ubicacion,
                    Precio: Precio,
                    UsuarioID: UsuarioID
                };
                // console.log(payload);
                try {
                    const response = await fetch('http://localhost:3000/eventos', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    });
                    const data = await response.json();
                    // Verificar si la respuesta es OK
                    if (!response.ok) {
                        const errorText = await response.text(); // Obtener texto en caso de error
                        console.error('Error de login:', errorText);
                        return;
                    }
                    if (data.message) {
                        alert(data.message);
                        console.log("mensaje: " + data.message);
                        App.htmlElements.inputTitulo.value = "";
                        App.htmlElements.inputDescripcion.value = "";
                        App.htmlElements.inputFecha.value = "";
                        App.htmlElements.inputUbicacion.value = "";
                        App.htmlElements.inputPrecio.value = "";

                    }

                } catch (error) {
                    console.log("PostCreateEvent ERROR -> :" + error);
                }
            },

            // ********** EDITAR PERFIL **********
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