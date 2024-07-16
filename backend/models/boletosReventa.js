import mongoose from "mongoose";

const boletosReventaSchema = new mongoose.Schema({
    evento: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    UserID: {
        type: Number,
        ref: 'User',
        required: true
    }
});


const BoletosReventa = mongoose.model('boletosReventa', boletosReventaSchema);
export default BoletosReventa;