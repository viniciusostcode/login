# API Node com Express

# Funcionalidades

- Cadastro de usuários

```
POST http://localhost:3000/users

{
  "username": "john",
  "passsword": "123456"
}
```

- Cadastro de mensagens para os usuários

```
POST http://localhost:3000/users/:userId/messages

{
  "message": "Hi, John."
}
```

- Listagem de todas as mensagens dos usuários

```
GET http://localhost:3000/users/:userId/messages
```

- Listagem de mensagem específica de um usuário

```
GET http://localhost:3000/users/:userId/messages/:messageId
```

- Exclusão de mensagem específica de um usuário

```
DELETE http://localhost:3000/users/:userId/messages/:messageId
```

## Instruções para rodar o projeto

#### Primeiramente clone este repositório

`git clone https://github.com/viniciusostcode/login`

#### Utilizando Yarn

```
yarn
yarn start
```

#### Utilizando NPM

```
npm install
npm run start
```
