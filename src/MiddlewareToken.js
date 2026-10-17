const express = require('express');
const app = express();

function verificarToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            error: 'Token de autorización requerido'
        });
    }

    // Simular verificación de token
    if (token !== 'Bearer token-secreto') {
        return res.status(403).json({
            error: 'Token inválido'
        });
    }
    
    // Añadir información del usuario al objeto request
    req.usuario = {
        id: 1,
        nombre: 'Juan Pérez',
        rol: 'admin'
    };
    next();
}

// Aplicar middleware solo a rutas protegidas
app.get('/admin', verificarToken, (req, res) => {
    res.json({
        mensaje: `Bienvenido ${req.usuario.nombre}`,
        panel: 'Administración'
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});