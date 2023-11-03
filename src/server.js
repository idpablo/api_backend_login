const app = require('./app.js'); 

const PORT = 3001;

const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

module.exports = server;