(() => {
    const App = {
        htmlElements:{
            formularioDeRegistro: document.querySelector('#register__form'),
            userName:document.querySelector('#registerUsername'),
            password:document.querySelector('#registerPass'),
            passwordValidate:document.querySelector('#registerPassValidate')
        },
        init(){
            App.bindEvents();
        },
        bindEvents(){
            App.htmlElements.formularioDeRegistro.addEventListener('submit',App.handlers.validarDatos)
        },
        handlers:{
            catchDatos(e){
                e.preventDefault()
                userName.value
                password.value
                passwordValidate.value

                App.methods.validarUserName(userName)
            }
        },
        methods:{
            async validarUserName(userName){
                const payload = {
                    userName
                };
                // enviar el username al back para validar si existe en la base de datos
                const rowResponse = await fetch ('http://localhost:3000/',{
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify(payload),
                });
                const data = await rowResponse.json();
                resultadoUsuario = data.resultadoUsuario;
                // Si pasa las validación, validar que las contraseñas sean iguales.
                App.methods.validarPassword(password,passwordValidate)
            },
            validarPassword(password,passwordValidate){
            // Agregar el hash con la salt a ambas contraseñas paras validar que ambas sean iguales.
            // Si pasa la validación, mostrar mensaje de que el usuario fue creado con éxito y redireccionar a la pagina de login
            }
        }
    }
})