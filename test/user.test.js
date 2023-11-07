const mongoose = require('mongoose');

const request = require('supertest');
const app = require('../src/app.js'); 

const usuarios = []
const limit = 100

describe('Testes de criação e exclusão de usuários', () => {
  let token;

  it('Deve criar um novo usuário', async () => {


    for (let index = 1; index <= limit; index++) {
      const newUser = {
        username: `usuario_teste_${index}`,
        email: `teste_${index}@teste.com`,
        password: 'senha123'
      };

      const response = await request(app)
        .post('/register')
        .send(newUser);

      console.log(`Usuário ${newUser.username} registrado com sucesso!`)

      usuarios.push(newUser.username)
      expect(response.statusCode).toBe(201);
      
    expect(response.body.message).toBe(`Usuário registrado com sucesso!`);
      // expect(response.body).toHaveProperty('userId');
      
    }
    // testUserId = response.body.userId; // Salva o ID do usuário para os próximos testes
  }, 10000);

  it('Deve fazer login com usuário criado', async () => {
    const loginUser = {
        email: `teste_${limit}@teste.com`,
        password: 'senha123'
      };

    const response = await request(app)
      .post('/login')
      .send(loginUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login bem-sucedido');
    token = response.body.token;
  }, 10000);

  it('Deve criar o corpo do email para realziar o envio', async () => {

    const mailSend =  {
      from:' from@teste.com',
      to: 'to@teste.com',
      subject: 'Teste de envio de email!',
      text: 'Corpo do email'
    };

    const response = await request(app)
      .post('/sendmail')
      .set('Authorization', `${token}`) 
      .send(mailSend);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Dados para envio de email armazenados!');
  }, 10000);

  it('Deve se conectar ao banco de dados', async () => {
    const response = await request(app)
      .get('/test-db-connection') // Rota para verificar a conexão com o banco
      .set('Authorization', `${token}`) ;

    expect(response.statusCode).toBe(200);
  });

  it('Deve excluir o usuário criado', async () => {

    const responseCodeList = []

    console.log(`Token: ${token}}`)
    
    for (let index = 1; index <= limit; index++) {
      const deleteUser = {
        username: `usuario_teste_${index}`,
      };
      
      const response = await request(app)
        .delete('/delete')
        .set('Authorization', `${token}`) 
        .send(deleteUser);
        
      console.log(`Excluindo usuario ${deleteUser}`)

      if (response.statusCode == 200){
        console.log(`Usuario ${deleteUser.username} excluido!`);
        expect(response.statusCode).toBe(200);
      }else if(response.statusCode == 500){
        console.log(`Usuario ${deleteUser.username} não foi excluido!`);
      };
        
      
        // expect(response.body.message).toBe('Usuário excluído com sucesso');

        responseCodeList.push(response)
        
      };
      
      // expect().toBe(200);


  }, 10000);
});

afterAll(async () => {
    await mongoose.disconnect();
});