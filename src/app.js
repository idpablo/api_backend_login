const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.js');
const mailRoutes = require('./routes/mailRoutes.js')

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(userRoutes);
app.use(mailRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

app.on('error', (err) => {
  console.error('Erro ao iniciar o servidor:', err);
});

module.exports = app;