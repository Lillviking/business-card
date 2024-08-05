// Konfigurerar och initierar Express
// Exporterar appen

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/users', userRoutes);

module.exports = app;
