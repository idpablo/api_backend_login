const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticate(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    
    // console.log('decoded: ', decoded._id)
    
    req.userId = decoded._id
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = authenticate;