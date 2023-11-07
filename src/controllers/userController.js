const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Logger = require('../config/logger.js')
require('dotenv').config();

// Registro de usuário
exports.register = async (req, res) => {

  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    Logger.info(`username: ${user.username}, email: ${user.email}, novo usuario registrado!`)
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

// Sistema de Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    console.log('User ID: ', user._id)

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido', token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exclusão de usuário nao funcional
exports.deleteUser = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    const userRequestData = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    Logger.info(`Usuario excluido: ${user.username} , autor: ${userRequestData.username}`)

    await User.findOneAndDelete({ username });

    return res.status(200).json({ message: `Usuário excluído com sucesso, autor da exclusão: ${userRequestData.username}` });

  } catch (err) {

    Logger.error(` error: ${err.message} `)
    return res.status(500).json({ error: err.message });

  }
};
