const express = require('express');
const path = require('path');
const { users, travelPackages } = require('./data');
const router = express.Router();

// Middleware de autenticação
function isAuthenticated(req, res, next) {
    if (!req.session || !req.session.username) {
        return res.redirect('/login'); // Redireciona para login se não autenticado
    }
    next();
}

// Rota protegida para página inicial
router.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Rota de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Autenticação de login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.username = username;
        req.session.save(() => {
            return res.redirect('/');
        });
    } else {
        res.send('Usuário ou senha inválidos. <a href="/login">Tente novamente</a>');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// API protegida de pacotes de viagem
router.get('/api/packages', isAuthenticated, (req, res) => {
    res.json(travelPackages);
});

// Página de detalhes do pacote protegida
router.get('/package/:id', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/package.html'));
});

module.exports = router;
