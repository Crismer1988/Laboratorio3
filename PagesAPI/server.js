const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Ruta GET
app.get('/request-page', (req, res) => {
    const pageName = req.query.name;
    sendHtmlFile(pageName, res);
});

// Ruta POST
app.post('/request-page', (req, res) => {
    const pageName = req.body.name;
    sendHtmlFile(pageName, res);
});

// Función para enviar el archivo HTML
function sendHtmlFile(pageName, res) {
    const filePath = path.join(__dirname, pageName);

    // Valida que solo se puedan enviar `pag1.html` o `pag2.html`
    if (pageName === 'pag1.html' || pageName === 'pag2.html') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.status(404).send('Archivo no encontrado');
            } else {
                res.send(data);
            }
        });
    } else {
        res.status(400).send('Nombre de archivo no permitido');
    }
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

