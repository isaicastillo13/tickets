
(() => {
    const App = {
        htmlElements: {
            header: document.querySelector('#header')
        },
        init() {
            App.bindEvents();
        },
        bindEvents() {
            document.addEventListener('DOMContentLoaded', App.handlers.pageReady);
        },
        handlers: {

            pageReady(e) {
                e.preventDefault(); 
                App.methods.userData(); 
            },
            closeSession(){
                App.methods.closeSession();
            }

        },
        methods: {
            userData() {
                const userName = localStorage.getItem('userName');  
                App.methods.render(userName);
                
            },
            closeSession(){
                localStorage.removeItem('userName');
                window.location.href = 'http://localhost:3000/index.html';
            },
            render(userName){
                if (userName != null) {
                    navbar = `
                    <section class="header__navBar">
                        <nav>
                            <li>
                                <a href="/frontend/public/index.html">Logo</a>
                            </li>
                            <div class="navbar--derecha">
                                <li class="userName">
                                    <a id="link_UserName" href="/frontend/source/views/usuario/perfil.html">${userName}</a>
                                </li>
                                <li>
                                    <a href="/frontend/source/views/auth/login.html">
                                    <img src="/frontend/public/iconos/logout.png" alt="icono del logout" id="logout">
                                    </a>
                                </li>
                            </div>
                        </nav>
                    </section>
                    `
                    App.htmlElements.header.insertAdjacentHTML('afterbegin', navbar);
                    App.methods.stylesJs();
                    App.methods.addEventListener();
                }else{
                    App.htmlElements.userName.style.display = 'block';
                    App.htmlElements.userName.innerHTML = `<a id="link_UserName" href="/frontend/source/views/auth/login.html">Iniciar Sesion</a>`;
                    App.htmlElements.iconLogout.style.display = 'none';
                }
            },
            addEventListener(){
                iconLogout = document.querySelector('#logout'),
                iconLogout.style.display = 'block';
                iconLogout.addEventListener('click', App.handlers.closeSession);
            },
            stylesJs(){
                userName = document.querySelector('.navbar--derecha .userName'),
                userName.style.display = 'block';
                
            }
        }
    };
    App.init();
})();