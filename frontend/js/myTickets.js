// (() => {
//     const App = {
//         htmlElements: {
//             userNamelink: document.querySelector('#link_UserName'),
//             boletosContent: document.querySelector('#boletosContent'),
//         },
//         init() {
//             App.bindEvents();
//             App.methods.userData();
//             App.methods.GetTicketUserData();
//         },
//         bindEvents() {
//             // Escuchar el clic en el enlace "UserName"
//             const userNameLink = document.getElementById('link_UserName');
//             // userNameLink.addEventListener('click', App.handlers.handleUserNameClick);
//         },
//         handlers: {
//             handleUserNameClick(e) {
//                 e.preventDefault(); // Prevenir la acción predeterminada
//                 App.methods.userData(); // Llamar al método para cargar datos del usuario
//             },
//         },
//         methods: {
//             async userData() {
//                 const userName = localStorage.getItem('userName');
//                 // console.log("Nombre de usuario recuperado: " + userName);
//                 if (userName) {
//                     App.htmlElements.userNamelink.textContent = userName;
//                 }
//             },

//             async GetTicketUserData() {
//                 try {
//                     const id = localStorage.getItem('userId');
//                     const response = await fetch(`http://localhost:3000/eventos/entradas/usuario/${id}`);
//                     const data = await response.json();
//                     if (!response.ok) {
//                         throw new Error(data.message || 'Error en la respuesta de la API');
//                     }
//                     console.log("Datos del usuario y eventos:", data);

//                     // Extraer los datos de los eventos
//                     const eventos = data.Eventos;

//                     // Limpiar el contenedor de boletos antes de agregar nuevos
//                     App.htmlElements.boletosContent.innerHTML = '';

//                     // Crear elementos para cada evento
//                     eventos.forEach(evento => {
//                         const eventoElement = App.methods.createEventElement(evento);
//                         App.htmlElements.boletosContent.appendChild(eventoElement);
//                     });

//                 } catch (error) {
//                     console.log("GetTicketUserData ERROR -> :" + error);
//                 }
//             },

//             // ***************************************************************

//             createEventElement(evento) {
//                 // Crear el contenedor principal del evento
//                 const eventSection = document.createElement('section');
//                 eventSection.className = 'event contenedor';

//                 // Imagen del evento
//                 const img = document.createElement('img');
//                 img.className = 'event__img';
//                 img.src = '../../../public/images/noiseporn-JNuKyKXLh8U-unsplash.jpg'; // imagen
//                 img.alt = 'imagen del evento';
//                 eventSection.appendChild(img);

//                 // Contenedor de datos del evento
//                 const eventData = document.createElement('div');
//                 eventData.className = 'event__data';

//                 // Título del evento
//                 const title = document.createElement('h2');
//                 title.className = 'data__title';
//                 title.textContent = evento.Titulo;
//                 eventData.appendChild(title);

//                 // Descripción del evento
//                 const description = document.createElement('p');
//                 description.className = 'data__description';
//                 // description.textContent = evento.Descripcion;
//                 description.innerHTML = evento.Descripcion.replace(/\n/g, '<br>');
//                 eventData.appendChild(description);

//                 // Ubicación del evento
//                 const locationDiv = document.createElement('div');
//                 locationDiv.className = 'card__location';
//                 const locationText = document.createElement('p');
//                 locationText.textContent = evento.Ubicacion;
//                 const locationIcon = document.createElement('img');
//                 locationIcon.src = '../../../public/iconos/ubicacion_icono.png';
//                 locationIcon.alt = 'icono de ubicacion';
//                 locationDiv.appendChild(locationText);
//                 locationDiv.appendChild(locationIcon);
//                 eventData.appendChild(locationDiv);

//                 // Fecha del evento
//                 const dateDiv = document.createElement('div');
//                 dateDiv.className = 'card__date';
//                 const dateText = document.createElement('p');
//                 // Formatear la fecha
//                 const eventDate = new Date(evento.FechaEvento);
//                 dateText.textContent = eventDate.toLocaleDateString('en-GB', {
//                     timeZone: 'UTC',
//                     day: '2-digit',
//                     month: '2-digit',
//                     year: 'numeric'
//                 });
//                 const dateIcon = document.createElement('img');
//                 dateIcon.src = '../../../public/iconos/fecha__icono.png';
//                 dateIcon.alt = 'icono de calendario';
//                 dateDiv.appendChild(dateText);
//                 dateDiv.appendChild(dateIcon);
//                 eventData.appendChild(dateDiv);

//                 // Precio del evento
//                 const price = document.createElement('p');
//                 price.className = 'price';
//                 price.textContent = `$ ${evento.Precio}`;
//                 eventData.appendChild(price);

//                 // Botón de revender
//                 const resaleButton = document.createElement('input');
//                 resaleButton.className = 'btn btn-principal btn__resale';
//                 resaleButton.type = 'button';
//                 resaleButton.value = 'Revender';
//                 eventData.appendChild(resaleButton);

//                 eventSection.appendChild(eventData);

//                 return eventSection;
//             }
//         }
//     };
//     App.init();
// })();


(() => {
    const App = {
        htmlElements: {
            userNamelink: document.querySelector('#link_UserName'),
            boletosContent: document.querySelector('#boletosContent'),
        },
        init() {
            App.bindEvents();
            App.methods.userData();
            App.methods.GetTicketUserData();
        },
        bindEvents() {
            // Escuchar el clic en el enlace "UserName"
            const userNameLink = document.getElementById('link_UserName');
            // userNameLink.addEventListener('click', App.handlers.handleUserNameClick);
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
                if (userName) {
                    App.htmlElements.userNamelink.textContent = userName;
                }
            },

            async GetTicketUserData() {
                try {
                    const id = localStorage.getItem('userId');
                    const response = await fetch(`http://localhost:3000/eventos/entradas/usuario/${id}`);
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.message || 'Error en la respuesta de la API');
                    }
                    console.log("Datos del usuario y eventos:", data);

                    // Extraer las entradas duplicadas con eventos anidados
                    const entradas = data.Entrada;

                    // Limpiar el contenedor de boletos antes de agregar nuevos
                    App.htmlElements.boletosContent.innerHTML = '';

                    // Crear elementos para cada entrada, renderizando un evento por entrada
                    entradas.forEach(entrada => {
                        const eventoElement = App.methods.createEventElement(entrada.Evento);
                        App.htmlElements.boletosContent.appendChild(eventoElement);
                    });

                } catch (error) {
                    console.log("GetTicketUserData ERROR -> :" + error);
                }
            },

            createEventElement(evento) {
                // Crear el contenedor principal del evento
                const eventSection = document.createElement('section');
                eventSection.className = 'event contenedor';

                // Imagen del evento
                const img = document.createElement('img');
                img.className = 'event__img';
                img.src = '../../../public/images/noiseporn-JNuKyKXLh8U-unsplash.jpg'; // imagen
                img.alt = 'imagen del evento';
                eventSection.appendChild(img);

                // Contenedor de datos del evento
                const eventData = document.createElement('div');
                eventData.className = 'event__data';

                // Título del evento
                const title = document.createElement('h2');
                title.className = 'data__title';
                title.textContent = evento.Titulo;
                eventData.appendChild(title);

                // Descripción del evento
                const description = document.createElement('p');
                description.className = 'data__description';
                description.innerHTML = evento.Descripcion.replace(/\n/g, '<br>');
                eventData.appendChild(description);

                // Ubicación del evento
                const locationDiv = document.createElement('div');
                locationDiv.className = 'card__location';
                const locationText = document.createElement('p');
                locationText.textContent = evento.Ubicacion;
                const locationIcon = document.createElement('img');
                locationIcon.src = '../../../public/iconos/ubicacion_icono.png';
                locationIcon.alt = 'icono de ubicacion';
                locationDiv.appendChild(locationText);
                locationDiv.appendChild(locationIcon);
                eventData.appendChild(locationDiv);

                // Fecha del evento
                const dateDiv = document.createElement('div');
                dateDiv.className = 'card__date';
                const dateText = document.createElement('p');
                // Formatear la fecha
                const eventDate = new Date(evento.FechaEvento);
                dateText.textContent = eventDate.toLocaleDateString('en-GB', {
                    timeZone: 'UTC',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                const dateIcon = document.createElement('img');
                dateIcon.src = '../../../public/iconos/fecha__icono.png';
                dateIcon.alt = 'icono de calendario';
                dateDiv.appendChild(dateText);
                dateDiv.appendChild(dateIcon);
                eventData.appendChild(dateDiv);

                // Precio del evento
                const price = document.createElement('p');
                price.className = 'price';
                price.textContent = `$ ${evento.Precio}`;
                eventData.appendChild(price);

                // Botón de revender
                const resaleButton = document.createElement('input');
                resaleButton.className = 'btn btn-principal btn__resale';
                resaleButton.type = 'button';
                resaleButton.value = 'Revender';
                eventData.appendChild(resaleButton);

                eventSection.appendChild(eventData);

                return eventSection;
            }
        }
    };
    App.init();
})();
