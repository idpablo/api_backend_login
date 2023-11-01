const bcrypt = require('bcryptjs');
const User = require('../models/User');

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

    res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exclusão de usuário nao funcional
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  console.log('Id: ', userId)

  try {
    await User.findOneAndDelete(userId);
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
