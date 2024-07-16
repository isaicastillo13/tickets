(() => {
    const App = {
        htmlElements: {
            formularioDeLogin: document.querySelector('#formLogin'),
            email: document.querySelector('#login__email'),
            password: document.querySelector('#login__password'),
        },
        init() {

            App.bindEvents();
        },
        bindEvents() {
            App.htmlElements.formularioDeLogin.addEventListener('submit', App.handlers.catchDatos)
        },
        handlers: {
            catchDatos(e) {
                e.preventDefault()
                email = App.htmlElements.email.value
                var emailArray = email.split('@')
                email = emailArray[0]
                password = App.htmlElements.password.value
                App.methods.validarLogin(email, password)
            },
            estaLoagueado() {
                if (localStorage.getItem('userId') != null) {
                    document.querySelector('#logout').style.display = 'block'
                    document.querySelector('#link_UserName').style.display = 'block'
                }
            }
        },
        methods: {
            async validarLogin(email, password) {
                const payload = {
                    username: email, // Enviar nombre de usuario
                    password: password // Enviar contraseña
                };
                try {
                    const rawResponse = await fetch('http://localhost:3000/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    });

                    // Verificar si la respuesta es OK
                    if (!rawResponse.ok) {
                        const errorText = await rawResponse.text(); // Obtener texto en caso de error
                        console.error('Error de login:', errorText);
                        return;
                    }

                    const data = await rawResponse.json();
                    console.log('Login exitoso:', data);
                    // Extraer datos específicos
                    const id = data.id;
                    const name = encodeURIComponent(data.Nombre);

                    // Guarda el nombre y el ID del usuario en localStorage
                    localStorage.setItem('userName', name);
                    localStorage.setItem('userId', id);
                    // console.log("extraido: " + id + " " + name)

                    window.location.href = `../../../public/index.html`; // redirecciona al index 

                } catch (error) {
                    console.error('Error:', error);
                }
            },
            mostrarLogout() {

            }
        }
    };
    App.init();
})();