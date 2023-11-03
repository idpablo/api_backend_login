const mongoose = require('mongoose');

const request = require('supertest');
const app = require('../src/app.js'); 

describe('Testes de criação e exclusão de usuário', () => {
  let token;

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
    expect(response.body.message).toBe('Usuário registrado com sucesso!');
    // expect(response.body).toHaveProperty('userId');
    // testUserId = response.body.userId; // Salva o ID do usuário para os próximos testes
  }, 10000);

  it('Deve fazer login com usuário criado', async () => {
    const loginUser = {
        email: 'teste@teste.com',
        password: 'senha123'
      };

    const response = await request(app)
      .post('/login')
      .send(loginUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login bem-sucedido');
    token = response.body.token;
  }, 10000);

  it('Deve se conectar ao banco de dados', async () => {
    const response = await request(app)
      .get('/test-db-connection') // Rota para verificar a conexão com o banco
      .set('Authorization', `${token}`) ;

    expect(response.statusCode).toBe(200);
  });

  it('Deve excluir o usuário criado', async () => {

    console.log(token)

    const deleteUser = {
        username: 'usuario_teste',
      };

    const response = await request(app)
      .delete('/delete')
      .set('Authorization', `${token}`) 
      .send(deleteUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Usuário excluído com sucesso');
  }, 10000);
});

afterAll(async () => {
    await mongoose.disconnect();
});