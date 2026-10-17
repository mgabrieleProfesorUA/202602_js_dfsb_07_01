const express = require('express');
const app = express();

// Habilitar el parsing de JSON
app.use(express.json());

app.post('/usuarios', (req, res) => {
    // Sin express.json(), req.body sería undefined
    console.log(req.body); // { nombre: "Juan", edad: 25 }
    res.json({
        mensaje: 'Usuario recibido',
        datos: req.body
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});