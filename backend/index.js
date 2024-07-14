console.log("Hello via Bun! desde tickets");
import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import User from './models/user.js';
import DriverId from './models/driver-id.js';
import Evento from './models/eventos.js';
import Entrada from './models/entradas.js';
import Reventa from './models/reventas.js';
import cors from 'cors';
import { genSaltSync, hashSync } from 'bcryptjs';
import bcrypt from 'bcryptjs';

config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json())
app.use(cors());
// Crear un modelo
// const User = require('./models/user');
// const DriverId = require('./models/driver-id');

// Conexión a MongoDB
mongoose.connect(Bun.env.MONGODB_URI)
    .then(() => {
        console.log('Conectado a MongoDB Atlas')
        app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
        require('./models/user.js');
        require('./models/driver-id.js');
    })
    .catch(err => {
        console.error('Error de conexión:', err)
        process.exit(1);
    });



// Middleware
app.use(express.json());

// *********************  Rutas  *********************

// --------------------------------------------------------------------------

// Rutas para Usuarios


// buscar un usuarios para validar su existencia
app.get('/email', async (req, res) => {
    const email = req.query.emailUser;
    try {
        const users = await User.find({ "CorreoElectronico": email });
        res.json(users);
        console.log('Mostrando Usuario');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Hashear password
const hashPassword = (password) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
};


app.post('/', (req, res) => {
    console.log('hasheando en el server');
    const { password = '' } = req.body;
    const hashedPassword = hashPassword(password);
    res.json({ data: hashedPassword });
});



// Crear o agregar nuevo usuario
// ----- " Register " -----
app.post('/register', async (req, res) => {
    try {
        console.log('Datos recibidos:');
        const { userId, nombre, email, password } = req.body;
        console.log('Datos recibidos:', req.body);

        const newUser = new User({
            UsuarioID: userId,
            Nombre: nombre,
            CorreoElectronico: email,
            Contraseña: password
        });

        const savedUser = await newUser.save();

        console.log('Usuario guardado:', savedUser);

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        res.status(400).json({ message: error.message });
    }
});

// Ruta de login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Datos recibidos:', req.body);
        const users = await User.find({ "CorreoElectronico": username });

        if (users.length === 0) {
            return res.status(400).send('Credenciales inválidas'); // Usuario no encontrado
        }

        const user = users[0]; // Accede al primer usuario encontrado
        console.log('Usuario encontrado:', user);

        console.log(`${password} = ${user.Contraseña}`);

        // Compara la contraseña
        if (bcrypt.compareSync(password, user.Contraseña)) {
            res.status(200).json({
                message: '¡¡ Login exitoso !!',
                id: user.UsuarioID, // Assuming _id is the user ID
                Nombre: user.Nombre // Assuming Nombre is the user's name
            });
        } else {
            res.status(200).json({ message: ('Credenciales inválidas') });
        }
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(200).json({ message: ('Error en el login') });
    }
});


// Buscar o ver un usuario especifico, por UsuarioID
// ----- " perfil " -----
app.get('/users/:usuarioId', async (req, res) => {
    try {
        const user = await User.findOne({ UsuarioID: req.params.usuarioId });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Buscar o ver un usuario especifico, por Nombre
// ----- " Login / Register " -----
app.get('/users/name/:username', async (req, res) => {
    const decodedUsername = decodeURIComponent(req.params.username);
    console.log('Buscando usuario:', decodedUsername);
    try {
        const user = await User.findOne({ Nombre: decodedUsername });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

//------------------------------------------------------------------------------

// Rutas para Eventos

//usuario crea el evento
// ----- " Publicar / Agregar Evento" -----
app.post('/eventos', async (req, res) => {
    try {
        const nuevoEvento = new Evento(req.body);
        await nuevoEvento.save();
        res.status(201).json({
            evento: nuevoEvento,
            message: 'Evento CREADO correctamente'
        });
        console.log('Evento guardado:', nuevoEvento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ----- ver todos los eventos 
// ----- " index " -----
app.get('/eventos', async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
        console.log('Mostrando Evento');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Buscar o ver un evento especifico, por EventoID
// ----- " evento " -----
app.get('/eventos/:eventoId', async (req, res) => {
    try {
        const evento = await Evento.findOne({ EventoID: req.params.eventoId });
        if (!evento) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        res.json(evento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//-------------------------------------------------------------------------------
// Rutas para Entradas

app.post('/entradas', async (req, res) => {
    try {
        const nuevaEntrada = new Entrada(req.body);
        await nuevaEntrada.save();
        res.status(201).json(nuevaEntrada);
        console.log('Entrada guardado:');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/entradas', async (req, res) => {
    try {
        const entradas = await Entrada.find();
        res.json(entradas);
        console.log('Mostrando Entrada');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ver todas las entradas de un usuario especifico, por UsuarioID
// ----- " Mis Boletos " -----
app.get('/eventos/entradas/usuario/:idUsuario', async (req, res) => {
    try {
        // Primero, encuentra el usuario por UsuarioID
        const usuario = await User.findOne({ UsuarioID: req.params.idUsuario });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // busca todos las entradas de este usuario
        const entradas = await Entrada.find({ UsuarioID: usuario.UsuarioID });
        if (entradas.length === 0) {
            res.status(200).json({
                message: " No tienes boletos, anímate y échale un vistazo a la cartelera de eventos disponibles, quizás haya algo para ti. "
            });
            // return res.status(404).json({ message: "No se encontraron ENTRADAS de este usuario" });
        }

        // Extrae los IDs de los eventos de las entradas
        const eventoIds = entradas.map(entrada => entrada.EventoID);//corregido

        // const eventoIds = parseInt(entradas.map(entrada => entrada.EventoID));
        // console.log(eventoIds)
        const eventos = await Evento.find({ EventoID: { $in: eventoIds } });//corregido

        // const eventos = await Evento.find({ EventoID: eventoIds });

        if (eventos.length === 0) {
            // return res.status(404).json({ message: eventoIds });
            return res.status(200).json({ message: "No se encontraron eventos para este ENTRADA" });
        }

        // Prepara la respuesta con los datos del usuario y sus eventos
        const respuesta = {
            Usuario: {
                UsuarioID: usuario.UsuarioID,
                Nombre: usuario.Nombre
            },
            Entrada: entradas.map(entrada => ({
                EntradaID: entrada.EntradaID,
                UsuarioID: entrada.UsuarioID,
                EventoID: entrada.EventoID,
                Cantidad: entrada.Cantidad,
                Precio: entrada.Precio,
                FechaCompra: entrada.FechaCompra,
                //Titulo: entrada.Titulo,
                //Descripcion: entrada.Descripcion,
                //Ubicacion: entrada.Ubicacion
            })),
            Eventos: eventos.map(evento => ({
                // UsuarioID: evento.UsuarioID,
                EventoID: evento.EventoID,
                Titulo: evento.Titulo,
                Descripcion: evento.Descripcion,
                FechaEvento: evento.FechaEvento,
                Ubicacion: evento.Ubicacion,
                Precio: evento.Precio
            }))
        };

        console.log('Mostrando Entrada', respuesta);
        return res.json(respuesta);
        // res.json(respuesta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para actualizar datos de entrada
// para actualizar UsuarioID cuando se efctua la reventa
app.put('/entradas/:entradaId', async (req, res) => {
    try {
        console.log("inicio proceso de cambio")
        const { entradaId } = req.params;
        const nuevosDatos = req.body;

        const entradaActualizada = await Entrada.findOneAndUpdate(
            { EntradaID: entradaId },
            nuevosDatos,
            { new: true, runValidators: true }
        );

        if (entradaActualizada) {
            res.json({
                mensaje: 'Entrada actualizada correctamente',
                entrada: entradaActualizada
            });
        } else {
            res.status(404).json({ mensaje: 'Entrada no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la entrada:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la entrada', error: error.message });
    }
});
//-----------------------------------------------------------------------------

//ruta para ver eventos creado por usuario especifico
// ----- " Mis Eventos " -----
app.get('/eventos/usuario/:idUsuario', async (req, res) => {
    try {
        // Primero, encuentra el usuario por su nombre
        const usuario = await User.findOne({ UsuarioID: req.params.idUsuario });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Luego, busca todos los eventos de este usuario
        const eventos = await Evento.find({ UsuarioID: usuario.UsuarioID });

        if (eventos.length === 0) {
            return res.status(404).json({ message: "No se encontraron eventos para este usuario" });
        }

        // Prepara la respuesta con los datos del usuario y sus eventos
        const respuesta = {
            Usuario: {
                UsuarioID: usuario.UsuarioID,
                Nombre: usuario.Nombre
            },
            Eventos: eventos.map(evento => ({
                UsuarioID: evento.UsuarioID,
                EventoID: evento.EventoID,
                Titulo: evento.Titulo,
                Descripcion: evento.Descripcion,
                FechaEvento: evento.FechaEvento,
                Ubicacion: evento.Ubicacion,
                Precio: evento.Precio
            }))
        };

        res.json(respuesta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//-----------------------------------------------------------------------------
// Rutas para Reventas

app.post('/reventas', async (req, res) => {
    try {
        const nuevaReventas = new Reventa(req.body);
        await nuevaReventas.save();
        res.status(201).json(nuevaReventas);
        console.log('Reventa guardado:');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ----- ver todos las reventas 
// ----- " reventa " -----
app.get('/reventas', async (req, res) => {
    try {
        const reventas = await Reventa.find();
        res.json(reventas);
        console.log('Mostrando Reventa');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
console.log("falta actualizar boletos revendidos");

// Iniciar el servidor
// app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));