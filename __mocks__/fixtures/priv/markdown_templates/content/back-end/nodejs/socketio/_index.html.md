## O que vamos aprender?

O tópico de hoje será sobre uma ferramenta: uma extensão de _sockets_, uma forma nova e prática de desenvolver funcionalidades do mundo real sem muita dor de cabeça. Apresentamos-lhes o **socket.io**! 🎉

O `socket.io` é um pacote _JavaScript_ que funciona tanto no front-end quanto no back-end, ou seja, você pode importá-lo tanto no Node.js quanto no seu projeto React, Angular, Vuejs ou até mesmo em um projeto sem nenhuma framework. Esse pacote nos permite implementar ações _real time_ em nossa aplicação, como um sistema de notificação!

---

### Você será capaz de:

- Conseguir desenvolver um server socket usando o **socket.io**;

- Emitir eventos personalizados usando o **socket.io**;

---

## Por que isso é importante?

Sockets são um padrão de comunicação muito usado em aplicações _real time_. Contudo, usar o pacote _NET_ do `Node.js` é muito custoso quando precisamos fazer uma aplicação de grande porte, e é nesses momentos que temos outras bibliotecas para nos ajudar.

Diferentemente da aplicação que fizemos na aula anterior, o `socket.io` nos permite implementar mecanismos mais complexos do que o que fizemos e de um forma até mais simples do que a que vimos. Alguns exemplos dos mecanismos mais complexos que podemos implementar são: controle de salas, limite do número de users conectados no servidor, trabalhar com eventos de uma maneira mais customizável etc. Vamos ver mais sobre isso hoje!

---

## Conteúdo

###### Tempo sugerido para realização: 80 minutos

### O que é o Socket.IO?

Antigamente, aplicações _real time_ eram feitas através de outros padrões. Uma das formas mais comuns de se fazer isso era fazendo o que chamamos de [pooling](https://sites.google.com/site/rmaalmeida/extra/tecnicasdepooling) {: .external-link target="_blank" rel="noreferrer noopener" }. _Pooling_ é, basicamente, ter requisições dentro de um loop infinito verificando algo. Socket.IO é uma implementação para comunicação via sockets, mas mais importante que isso é ele oferecer a possibilidade de se ter um `fallBack`: uma _feature_ de contingência para quando seu _client/server_ não estiver disponível.

O Socket.io funciona por meio de eventos do `Node.js`. Podemos ouvir um evento da nossa conexão e fazer com que, por exemplo, uma função seja acionada quando um novo usuário se conectar ao servidor, ou quando uma mensagem for emitida. O Socket.io é usado por inúmeras empresas e pessoas desenvolvedoras. Ele tem muito uso em aplicativos de mensagens instantâneas, análise e monitoramento em tempo real e também _streaming_ e colaboração em documentos. Um detalhe importante: o Socket.io não é uma implementação do [WebSocket](https://developer.mozilla.org/pt-BR/docs/WebSockets) {: .external-link target="_blank" rel="noreferrer noopener" }. Os autores afirmam que "o Socket.io realmente usa o WebSocket como transporte quando possível. Contudo um cliente WebSocket não poderá se conectar a um servidor Socket.io, e um cliente Socket.IO não poderá se conectar a um servidor WebSocket". Apesar disso, a estrutura do Socket.io se comporta exatamente como o WebSockets, e aqui reside o seu poder.

Com isso em mente, e com um entendimento básico do protocolo Websocket, é hora de pegar no código!

### Show me the code!

Além da facilidade de sintaxe no uso do Socket.io, ele também cria um servidor para nós, assim como o Express. Porém, ao invés de rotas, nós temos uma lógica baseada em eventos! É através desses eventos que fazemos a comunicação do cliente com o servidor e do servidor com o cliente! Nesta seção iremos trabalhar a criação de um web chat com interface gráfica e algumas outra funcionalidades!

Para começar, vamos iniciar um projeto `Node.js` com o comando abaixo:

```language-bash
$ npm init -y
```

Feito isso, vamos instalar o `Express` com:

```language-bash
$ npm install express
```

Dentro da pasta do nosso projeto, vamos criar o arquivo `index.js` com o seguinte conteúdo:

> index.js

```language-javascript
const app = require('express')();
const http = require('http').createServer(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
```

Note que, na rota raiz, estamos devolvendo um arquivo chamado `/index.html`. Ele, porém, ainda não existe, então vamos criá-lo!

Dentro do mesmo diretório, vamos criar o arquivo `index.html` com o seguinte conteúdo:

> index.html

```language-html
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.IO - trybe</title>
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
        cursor: pointer;
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
    </style>
  </head>
  <body>
    <ul id="mensagens"></ul>
    <form action="">
      <input id="mensagemInput" autocomplete="off" /><button>Send</button>
    </form>
  </body>
</html>
```

Leia um o código e você notará que ainda não estamos fazendo nada, apenas criamos um input e um botão legais para nosso chat. Rode a aplicaçao com `node index.js` e abra seu browser no endereço `localhost:3000`. Terá de ver uma tela de um chat!

Passando dessa etapa, vamos instalar o `socket.io` e o `cors` no projeto:

```language-bash
$ npm install socket.io cors
```

Após isso, vamos adicioná-lo no nosso servidor:

> index.js

```language-javascript
// const app = require('express')();
// const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  }
});

app.use(cors()) // Permite recursos restritos na página web serem pedidos a domínio externo

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
  console.log(
    'Usuário conectado, igual ao que fizemos na aula anterior, porém dessa vez em um servidor escalável'
  );
});

// http.listen(3000, () => {
//   console.log('Servidor ouvindo na porta 3000');
// });
```

Na terceira linha estamos importando o pacote `cors` ([CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Controle_Acesso_CORS)) para compartilhar recursos com origens diferentes, e na quarta o `socket.io`, o qual é uma função, e dessa função temos como retorno um servidor socket.
Para que o client possa se comunicar com o back-end, nós temos que implementar o script do socket.io dentro da página HTML. Usaremos um link provido pelo [CDNJS](cdnjs.com) {: .external-link target="_blank" rel="noreferrer noopener" }, que nos dá toda a biblioteca do `socket.io` para uso no front-end. O link da biblioteca é: `https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js`.

Se você prefere não usar a versão da biblioteca via CDN, você consegue encontrar um arquivo local assim que baixar o módulo do `socket.io`. Você terá acesso ao arquivo de que precisa no seguinte caminho: `/socket.io/socket.io.js`. Para usar, você utiliza a tag `script` dessa forma:

```language-html
<script src="/socket.io/socket.io.js"></script>
```

Mas vamos usar o CDN aqui:

> index.html

```language-html
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.IO - trybe</title>
    <style>
    <!-- ... -->
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js"></script>
    <script>
      const socket = io();
    </script>
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

Note que, até então, temos apenas o código `const socket = io();` no script. O pacote do `socket.io` expõe um objeto chamado `io`, que por sua vez é global e, assim que é chamado, executa uma conexão socket com alguém. Esse método por default recebe como parâmetro o mesmo _endpoint_ por onde ele está sendo acessado, ou seja, se estamos na rota `http://localhost:3000`, é por aí que ele vai tentar se conectar. Caso você queira se conectar a um servidor num socket específico, basta você informar isso via parâmetro, por exemplo: `const socket = io('http://localhost:5000')`.

Agora, se você iniciar novamente seu projeto, verá uma mensagem no `console.log` a cada vez que atualizar a página. Note, no entanto, que nunca há uma mensagem de "desconectado". Vamos implementá-la?

> index.js

```language-javascript
// ...

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
  console.log(
    'Usuário conectado, igual ao que fizemos na aula anterior, porém dessa vez em um servidor escalável'
  );
  socket.on('disconnect', () => {
    console.log(
      'Lembre-se de deixar tudo relacionado a "conexão socket" dentro do evento "connection"'
    );
  });
});

// ...
```

Agora, para cada _refresh_ em nossa página web, veremos no terminal que aparece uma mensagem para o evento _disconnect_. Para simplificar a nossa aplicação, vamos remover essas mensagens longas do terminal e deixar alguma coisa mais direta.

> index.js

```language-javascript
// ...

io.on('connection', (socket) => {
  console.log('Conectado');
  socket.on('disconnect', () => {
    console.log('Desconectado');
  });
});

// ...
```

Agora chega de terminal! Vamos implementar o chat de verdade. Para isso precisamos usar o famoso `Javascript Vanilla` para nos ajudar um pouco no front-end:

> index.html

```language-html
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.IO - trybe</title>
    <style>
      /* ... */
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js"></script>
  </head>
  <body>
    <!-- ... -->
    <script>
      const socket = io();
      const form = document.querySelector('form')
      const inputMessage = document.querySelector('#mensagemInput')
      form.addEventListener('submit', (e) =>{
        e.preventDefault();
        socket.emit('mensagem', inputMessage.value);
        inputMessage.value = ''
        return false;
      })
    </script>
  </body>
</html>
```

Assim que a tag `script` é iniciada, nós ficamos escutando nosso form para que, tão logo haja um `submit`, nós possamos executar nossa função de callback. Nessa função estamos utilizando o `querySelector`, já que obtemos o elemento `form` por meio da tag `form`. O _preventDefault_ previne que a página recarregue quando submetermos o _form_. Em seguida, emitimos um evento **personalizado** com o valor do elemento _mensagemInput_. Por fim, setamos o valor de _mensagemInput_ para vazio.

Agora que estamos emitindo esse evento personalizado, vamos lá no servidor criar o nosso evento customizado:

> index.js

```language-javascript
// ...

io.on('connection', (socket) => {
  console.log('Conectado');
  socket.on('disconnect', () => {
    console.log('Desconectado');
  });
  socket.on('mensagem', (msg) => {
    console.log(`Mensagem ${msg}`);
  });
});

// ...
```

Vale lembrar que criamos **sempre** os eventos dentro de `connection`. No código acima estamos criando o evento personalizado da maneira mais simples possível. Basta colocarmos o nome que queremos dentro do método `.on()` e pronto, já temos nosso evento personalizado!

Nosso trabalho ainda não acabou, no entanto. Por hora, só temos uma mensagem saindo do front-end, indo para o back-end e sendo impressa no terminal. Falando nisso, reinicie o servidor e veja por si só como está funcionando a aplicação até então 😉. O próximo passo será enviar essa mesma mensagem, que acabamos de receber no servidor, para todas as outras conexões.

Uma forma de enviarmos uma mensagem do server para o cliente é usando o método `emit()`:

```language-javascript
io.emit('Nome do seu evento', {
  propriedade: 'Do seu objeto',
  enviado: 'Para o cliente da conexão atual'});
```

Então, se quisermos mandar uma mensagem para o cliente assim que ele se conectar, basta fazermos:

> index.js

```language-javascript
io.on('connection', (socket) => {
  // ...
  socket.emit('ola', 'Bem vindo fulano, fica mais um cadin, vai ter bolo :)' );

  // ...
});
```

Note que usamos uma `string` para enviar uma mensagem, mas podemos usar outros tipos de dados, como um objeto, que usaremos logo em seguida.

O primeiro parâmetro da função é nome do evento e o segundo são os dados enviados para o cliente, que deve estar escutando pelo nome do evento que, nesse caso é `ola`.

> index.html

```language-html
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.IO - trybe</title>
    <style>
      /* ... */
    </style>
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
      // cria uma `li` e coloca dentro da `ul` com `id` mensagens
      const createMessage = (message) => {
        const messagesUl = document.querySelector('#mensagens');
        const li = document.createElement('li');
        li.innerText = message;
        messagesUl.appendChild(li);
      }
      // Quando nosso evento `ola` for emitido, vamos pegar a string mensagem enviada pelo nosso evento e passar para a função `createMessage`
      socket.on('ola', (mensagem) => createMessage(mensagem));
    </script>
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

Caso queiramos enviar uma mensagem para todos os outros clientes, exceto para o que enviou a mensagem, vamos precisar recorrer ao _broadcast_ do socket.io. Veremos o quão simples é fazer a implementação do envio de mensagem em massa, coisa bem diferente do que fizemos na aula anterior:

```language-javascript
io.on('connection', (socket) => {
  // ...
  /* Basta usarmos a propriedade 'broadcast' */
  socket.broadcast.emit('mensagemServer', { mensagem: ' Iiiiiirraaaa! Fulano acabou de se conectar :D'});
});
```

> index.html

```language-html
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.IO - trybe</title>
    <style>
      /* ... */
    </style>
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
      // cria uma `li` e coloca dentro da `ul` com `id` mensagens
      const createMessage = (message) => {
        const messagesUl = document.querySelector('#mensagens');
        const li = document.createElement('li');
        li.innerText = message;
        messagesUl.appendChild(li);
      }
      // Quando nosso evento `ola` for emitido, vamos pegar a string mensagem enviada pelo nosso evento e passar para a função `createMessage`
      socket.on('ola', (mensagem) => createMessage(mensagem));
      // Aqui o evento é recebido da mesma maneira do último, mas este não é recebido pelo cliente que enviou o mesmo
      socket.on('mensagemServer', (objeto) => createMessage(objeto.mensagem));
    </script>
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

E, mais uma vez estamos criando um evento personalizado usando a "escuta de evento" `.on()`. Quando o servidor emitir esse evento que criamos, nós iremos obter o elemento `#mensagens` e, dentro desse elemento, iremos adicionar uma tag `<li>` com um texto dentro, texto esse que está vindo do servidor!
Mais um ponto de atenção nesse último exemplo é que: o evento envia um objeto para o cliente e não uma `string` com o evento `ola`.
Portanto o receptor do evento `mensagemServer` poderia ser reescrito assim:

`socket.on('mensagemServer', ({ mensagem }) => createMessage(mensagem));`

Se quiser testa o `broadcast` abra duas instancias de `http://localhost:3000/` e note que apenas a primeira tem a mensagem ` Iiiiiirraaaa! Fulano acabou de se conectar :D` na tela.

Por fim, vamos fazer uma última alteração no arquivo do servidor, para que possamos emitir as mensagens para o cliente:

> index.js

```language-javascript
// ...

io.on("connection", (socket) => {
  console.log('Conectado');

  socket.emit('ola', 'Bem vindo fulano, fica mais um cadin, vai ter bolo :)' );

  socket.broadcast.emit('mensagemServer', { mensagem: ' Iiiiiirraaaa! Fulano acabou de se conectar :D'});

  socket.on('disconnect', () => {
    console.log('Desconectado');
  });

  socket.on('mensagem', (msg) => {
    io.emit('mensagemServer', { mensagem: msg });
  });
});

// http.listen(3000, () => {
//   console.log('Servidor ouvindo na porta 3000');
// });
```

Ao executar nosso servidor com `node index.js`, teremos o seguinte resultado:

<%= figure(%{src: "/back-end/nodejs/socketio/images/exemplo.png", class: "rounded mx-auto d-block", width: "800px", height: "auto"}) %>

Além disso, podemos ter também quantas janelas quisermos da nossa sala!

<%= figure(%{src: "/back-end/nodejs/socketio/images/exemplo_multi.png", class: "rounded mx-auto d-block", width: "800px", height: "auto"}) %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais básicos, está na hora de arregaçarmos as mangas e colocarmos a mão na massa com a nossa aula ao vivo!

Bora pro Slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 120 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Agora é sua vez!

1. Envie a mensagem recebida no servidor para todos os outros clientes, exceto para quem a enviou.

2. Adicione um nickname para cada pessoa usuária. Os nomes não precisam vir da pessoa usuária/front-end.

Por que você não adiciona mais features ao chat agora? Quem sabe você não incrementa sua interface web ou, melhor ainda, coloca no ar o front-end e o back-end para ver como tudo funciona! Fica a sugestão de desafio para o seu portfólio.

## Recursos Adicionais (opcional)

- [Documentação do Socket.io](https://socket.io/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
