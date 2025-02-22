const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(session({
    secret: 'segredo_seguro',
    resave: false,
    saveUninitialized: false,  // Importante para não criar sessão vazia
    cookie: { secure: false }   // Garante que o cookie seja enviado mesmo sem HTTPS
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
