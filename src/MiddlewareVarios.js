const express = require('express');
const app = express();

// Middleware 1: Logger
app.use((req, res, next) => {
    console.log(`📝 ${req.method} ${req.url}`);
    next();
});

// Middleware 2: Verificar hora de acceso
app.use((req, res, next) => {
    const hour = new Date().getHours();
    if (hour < 8 || hour > 20) {
        return res.status(403).send('⏰ Servicio no disponible fuera de horario');
    }
    next();
});

// Middleware 3: Agregar información al objeto request
app.use((req, res, next) => {
    req.timestamp = new Date().toISOString();
    next();
});

// Ruta final
app.get('/', (req, res) => {
    res.json({
        message: 'Hola mundo',
        processedAt: req.timestamp
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});