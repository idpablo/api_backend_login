const mongoose = require('mongoose');

const request = require('supertest');
const app = require('../src/app.js'); 

describe('Testes de conexão com banco de dados', () => {
  it('Deve se conectar ao banco de dados', async () => {
    const response = await request(app)
      .get('/test-db-connection'); // Rota para verificar a conexão com o banco

    expect(response.statusCode).toBe(200);
  });
});

describe('Testes de criação e exclusão de usuários', () => {
  let testUserId;

  it('Deve criar um novo usuário', async () => {
    const newUser = {
      username: 'usuario_teste',
      email: 'teste@teste.com',
      password: 'senha123'
    };

    const response = await request(app)
      .post('/register')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    // expect(response.body.message).toBe('Usuário registrado com sucesso!');
    // expect(response.body).toHaveProperty('userId');
    // testUserId = response.body.userId; // Salva o ID do usuário para os próximos testes
  }, 10000);

  it('Deve fazer login com usuario criado', async () => {
    const loginUser = {
        email: 'teste@teste.com',
        password: 'senha123'
      };

    const response = await request(app)
      .post('/login')
      .send(loginUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login bem-sucedido');
  }, 10000);

  it('Deve excluir o usuário criado', async () => {

    const deleteUser = {
        username: 'usuario_teste',
      };

    const response = await request(app)
      .delete('/delete') // Rota para excluir usuário
      .send(deleteUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Usuário excluído com sucesso');
    // expect(response.body.message).toBe('Usuário excluído com sucesso');
  }, 10000);
});

afterAll(async () => {
    await mongoose.disconnect();
});