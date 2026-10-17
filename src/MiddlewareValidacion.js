const express = require('express');
const app = express();

// Habilitar el parsing de JSON
app.use(express.json());

function validarEmail(req, res, next) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            error: 'El campo email es obligatorio'
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'El formato del email no es válido'
        });
    }
    next();
}

app.post('/registro', validarEmail, (req, res) => {
    // En este punto sabemos que el email es válido
    res.json({
        mensaje: 'Usuario registrado correctamente',
        email: req.body.email
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});