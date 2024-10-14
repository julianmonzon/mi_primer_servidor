import http from 'http';
import fs from 'fs';

const httpServer = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hola Mundo\n');
    } else if (req.url === "/sync") {
        try {
            const data = fs.readFileSync('archivo.txt', 'utf8');
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
        } catch (error) {
            console.error('Error leyendo archivo de forma síncrona:', error);
            res.writeHead(500);
            res.end('Error al leer el archivo');
        }
    } else if (req.url === "/async") {
        fs.readFile('archivo.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error leyendo archivo de forma asíncrona:', err);
                res.writeHead(500);
                res.end('Error al leer el archivo');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

httpServer.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
