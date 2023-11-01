# portifolio
 Material para portifolio e estudos

 ## Sobre

    Projeto de api beck-end para portifolio,:
        1 - Cadastro e controle de usuarios 
        2 - Sistema para envio de email e opção de chat para comunicação direta com a pessoa desenvolvedora Pablo Soares
        3 - Integração com chat bots de Whatsapp e Discord

 ## Tecnologias usadas

<div style="display: inline_block"><br>
  <img align="center" alt="Discord" height="30" width="40" src="https://www.svgrepo.com/show/452188/discord.svg">
  <img align="center" alt="NodeJS" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg">
</div>

### Dependências globais

NodeJS


### Dependências locais

```bash
npm install
```

### Iniciar Banco MongoDB

```bash
docker build -t mongodb .
docker run -d -p 27017:27017 --name mongodb_container mongodb
```

### Iniciar aplicação

```bash
npm start
```

### Documentação

[Mongoose](https://mongoosejs.com/docs/) | [NodeJS](https://nodejs.org/en/docs)
