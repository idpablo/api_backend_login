const request = require('supertest');
const app = require('../src/app.js'); 

describe('Testes de conexão com banco de dados', () => {
  it('Deve se conectar ao banco de dados', async () => {
    const response = await request(app)
      .get('/test-db-connection'); // Rota para verificar a conexão com o banco

    expect(response.statusCode).toBe(200);
  });
});

// describe('Testes de criação e exclusão de usuários', () => {
//   let testUserId;

//   it('Deve criar um novo usuário', async () => {
//     const newUser = {
//       username: 'usuario_teste',
//       email: 'teste@teste.com',
//       password: 'senha123'
//     };

//     const response = await request(app)
//       .post('/register')
//       .send(newUser);

//     expect(response.statusCode).toBe(201);
//     // expect(response.body.message).toBe('Usuário registrado com sucesso!');
//     // expect(response.body).toHaveProperty('userId');
//     testUserId = response.body.userId; // Salva o ID do usuário para os próximos testes
//   }, 10000);

//   it('Deve fazer login com usuario criado', async () => {
//     const loginUser = {
//         email: 'teste@teste.com',
//         password: 'senha123'
//       };

//     const response = await request(app)
//       .post('/login')
//       .send(loginUser);

//     expect(response.statusCode).toBe(200);
//     expect(response.body.message).toBe('Login bem-sucedido');
//   }, 10000);

//   it('Deve excluir o usuário criado', async () => {

//     const response = await request(app)
//       .delete('/delete') // Rota para excluir usuário
//       .send(testUserId);

//     expect(response.statusCode).toBe(200);
//     expect(response.body.message).toBe('Usuário excluído com sucesso');
//   }, 10000);
// });


describe('Testes de exclusão de usuário', () => {
    it('Deve excluir um usuário existente', async () => {
      // Cria um novo usuário para testar a exclusão
      const user = await createUserForTesting(); // Crie uma função para criar usuários para teste
  
      // Faz a requisição para excluir o usuário recém-criado
      const response = await request(app).delete(`/delete/${user._id}`);
  
      // Verifica se o status da resposta é 200 (OK)
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Usuário excluído com sucesso');
    });
  
    it('Deve retornar status 404 para usuário não encontrado', async () => {
      // Cria um ID inválido para um usuário
      const invalidUserId = '6542a1e337a9d3eeddb7a659'; // Coloque um ID que não exista no banco
  
      // Faz a requisição para excluir o usuário com o ID inválido
      const response = await request(app).delete(`/delete/${invalidUserId}`);
  
      // Verifica se o status da resposta é 404 (Not Found)
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Usuário não encontrado');
    });
  });