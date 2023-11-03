const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

const db = require('../config/db.js');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.delete('/delete', userController.deleteUser);

router.get('/test-db-connection', (req, res) => {
    db.connectDB()
      .then(() => {
        res.sendStatus(200); // Conexão bem-sucedida
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500); // Erro na conexão
      });
  });

module.exports = router;