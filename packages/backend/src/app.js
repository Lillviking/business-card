// Konfigurerar och initierar Express
// Exporterar appen

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
