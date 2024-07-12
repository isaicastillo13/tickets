(() => {
    const App = {
        htmlElements: {
            formularioDeRegistro: document.querySelector('#register__form'),
            email: document.querySelector('#registerEmail'),
            password: document.querySelector('#registerPass'),
            passwordValidate: document.querySelector('#registerPassValidate')
        },
        init() {

            App.bindEvents();
        },
        bindEvents() {
            App.htmlElements.formularioDeRegistro.addEventListener('submit', App.handlers.catchDatos)
        },
        handlers: {
            catchDatos(e) {
                e.preventDefault()
                email = App.htmlElements.email.value
                var emailArray = email.split('@')
                email=emailArray[0]
                password = App.htmlElements.password.value
                passwordValidate = App.htmlElements.passwordValidate.value
                App.methods.validarUserName(email)
            }
        },
        methods: {
            async validarUserName(email) {
                console.log(email)
                try {
                    const rowResponse = await fetch(`http://localhost:3000/email?emailUser=${encodeURIComponent(email)}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!rowResponse.ok) {
                        throw new Error('Error en la solicitud');
                    }
                    const data = await rowResponse.json();
                    resultadoUsuario = data.resultadoUsuario;

                    if (data.length > 0) {
                        console.log('El usuario ya existe')
                    } else {
                        console.log('El usuario no existe')
                        App.methods.validarPassword(password, passwordValidate)
                    }

                } catch (error) {
                    console.error('Error:', error);
                }
            },
            validarPassword(password, passwordValidate) {
                if (password === passwordValidate) {
                    console.log('Las contraseñas son iguales')
                    App.methods.hashearPassword(password)
                } else {
                    console.log('Las contraseñas no son iguales')
                }
            },
            async hashearPassword(password) {
                    const payload = { 
                        password 
                    };
                    const rawResponse = await fetch('http://localhost:3000/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    });
                    const data = await rawResponse.json();
                    passwordHasheado=data.data;   

                    App.methods.crearUsuario(email, passwordHasheado)            
            },
            async crearUsuario(email, password) {

                nombre = document.querySelector('#registerUsername').value
                userId=Math.floor(10000 + Math.random() * 90000).toString()

                try {
                    const rowResponse = await fetch('http://localhost:3000/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({userId,nombre ,email, password })
                    });
                    if (!rowResponse.ok) {
                        throw new Error('Error en la solicitud');
                    }
                    const data = await rowResponse.json();
                    console.log(data);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    };
    App.init();
})();