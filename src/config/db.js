const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/potifolio');
    console.log('Conectado ao banco de dados MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
};

module.exports = { connectDB };