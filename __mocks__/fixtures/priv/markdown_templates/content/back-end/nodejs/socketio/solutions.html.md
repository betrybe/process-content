## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

### Exercício 1

Envie a mensagem recebida no servidor para todos os outros clientes, exceto para quem a enviou.

> index.js

```language-javascript
const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  }
});
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('mensagem', (msg) => {
    io.broadcast('mensagemServer', msg);
  });

});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
```

> index.html

```language-html
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font: 13px Helvetica, Arial;
      }
      form {
        background: #000;
        padding: 3px;
        position: fixed;
        bottom: 0;
        width: 100%;
      }
      form input {
        border: 0;
        padding: 10px;
        width: 90%;
        margin-right: 0.5%;
      }
      form button {
        width: 9%;
        background: rgb(130, 224, 255);
        border: none;
        padding: 10px;
      }
      #mensagens {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      #mensagens li {
        padding: 5px 10px;
      }
      #mensagens li:nth-child(odd) {
        background: #eee;
      }
      #mensagens {
        margin-bottom: 40px;
      }
    </style>
  </head>
  <body>
    <ul id="mensagens"></ul>
    <form action="">
      <input id="mensagemInput" autocomplete="off" /><button>Send</button>
    </form>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js"></script>
    <script>
      const socket = io();
      const form = document.querySelector('form')
      const inputMessage = document.querySelector('#mensagemInput')
      form.addEventListener('submit', (e) =>{
        e.preventDefault();
        socket.emit('mensagem', inputMessage.value);
        inputMessage.value = ''
        return false;
      });
        const createMessage = (message) => {
        const messagesUl = document.querySelector('#mensagens');
        const li = document.createElement('li');
        li.innerText = message;
        messagesUl.appendChild(li);
      }
      socket.on('mensagemServer', (mensagem) => createMessage(mensagem));
    </script>
  </body>
</html>
```

### Exercício 2

Adicione um nickname para cada pessoa usuária. Os nomes não precisam vir da pessoa usuária/front-end.

> index.js

```language-javascript
const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const users = [];

io.on('connection', (socket) => {
  const nickname = 'Usuario - ' + users.length;
  socket.nickname = nickname;
  users.push(socket.nickname);

  socket.on('mensagem', (msg) => {
    console.log(socket.nickname);
    io.emit('mensagemServer', `${socket.nickname}: ${msg}`);
  });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
```

> index.html

```language-html
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font: 13px Helvetica, Arial;
      }
      form {
        background: #000;
        padding: 3px;
        position: fixed;
        bottom: 0;
        width: 100%;
      }
      form input {
        border: 0;
        padding: 10px;
        width: 90%;
        margin-right: 0.5%;
      }
      form button {
        width: 9%;
        background: rgb(130, 224, 255);
        border: none;
        padding: 10px;
      }
      #mensagens {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      #mensagens li {
        padding: 5px 10px;
      }
      #mensagens li:nth-child(odd) {
        background: #eee;
      }
      #mensagens {
        margin-bottom: 40px;
      }
    </style>
  </head>
  <body>
    <ul id="mensagens"></ul>
    <form action="">
      <input id="mensagemInput" autocomplete="off" /><button>Send</button>
    </form>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js"></script>
    <script>
      const socket = io();
      const form = document.querySelector('form')
      const inputMessage = document.querySelector('#mensagemInput')
      form.addEventListener('submit', (e) =>{
        e.preventDefault();
        socket.emit('mensagem', inputMessage.value);
        inputMessage.value = ''
        return false;
      });
        const createMessage = (message) => {
        const messagesUl = document.querySelector('#mensagens');
        const li = document.createElement('li');
        li.innerText = message;
        messagesUl.appendChild(li);
      }
      socket.on('mensagemServer', (mensagem) => createMessage(mensagem));
    </script>
  </body>
</html>
```
